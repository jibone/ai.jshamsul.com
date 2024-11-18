export function YoutubePlayer({ playerId }: { playerId: string }) {
  console.log(playerId);
  return (
    <>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/jfKfPfyJRdk?si=laBWju0F30Q1r3g9"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </>
  );
}
