import ReactPlayer from "react-player";

export default function Youtube({ youtubeUrl }: { youtubeUrl: string }) {
  return <ReactPlayer url={youtubeUrl} />;
}
