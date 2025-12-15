export default function Media() {
  const id = "2mZu702tIew";

  return (
    <section className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-black">
      {/* 배경 영상 */}
      <div className="absolute inset-0 opacity-80 pointer-events-none">
        <iframe
          className="
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[177.78vh] h-[100vh]
            min-w-[100vw] min-h-[56.25vw]
          "
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0&playsinline=1`}
          title="Media background video"
          allow="autoplay; encrypted-media"
        />
      </div>

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
    </section>
  );
}
