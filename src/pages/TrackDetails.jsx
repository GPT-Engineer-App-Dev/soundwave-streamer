import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const tracks = [
  { id: 1, title: "Track 1", artist: "Artist 1", album: "Album 1" },
  { id: 2, title: "Track 2", artist: "Artist 2", album: "Album 2" },
  { id: 3, title: "Track 3", artist: "Artist 3", album: "Album 3" },
];

const TrackDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const track = tracks.find((track) => track.id === parseInt(id));

  if (!track) {
    return <div>Track not found</div>;
  }

  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={() => navigate(-1)}>
        Back
      </Button>
      <div className="p-4 border rounded-lg">
        <div className="text-lg font-semibold">{track.title}</div>
        <div className="text-sm text-muted-foreground">{track.artist}</div>
        <div className="text-sm text-muted-foreground">{track.album}</div>
        <Button variant="outline" size="sm" className="mt-4">
          Play
        </Button>
      </div>
    </div>
  );
};

export default TrackDetails;