import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const playlistSchema = z.object({
  name: z.string().min(1, "Playlist name is required"),
  description: z.string().optional(),
});

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [editingPlaylist, setEditingPlaylist] = useState(null);

  const form = useForm({
    resolver: zodResolver(playlistSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    if (editingPlaylist !== null) {
      setPlaylists((prev) =>
        prev.map((playlist, index) =>
          index === editingPlaylist ? { ...playlist, ...data } : playlist
        )
      );
      setEditingPlaylist(null);
    } else {
      setPlaylists((prev) => [...prev, data]);
    }
    form.reset();
  };

  const handleEdit = (index) => {
    setEditingPlaylist(index);
    form.setValue("name", playlists[index].name);
    form.setValue("description", playlists[index].description);
  };

  const handleDelete = (index) => {
    setPlaylists((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create Playlist</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPlaylist !== null ? "Edit Playlist" : "Create Playlist"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name">Playlist Name</label>
              <Input id="name" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Textarea id="description" {...form.register("description")} />
            </div>
            <Button type="submit">{editingPlaylist !== null ? "Save Changes" : "Create Playlist"}</Button>
          </form>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {playlists.map((playlist, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{playlist.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{playlist.description}</p>
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" onClick={() => handleEdit(index)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Playlists;