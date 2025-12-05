
import MediaVideo from '../../assets/media.mp4'

export default function Media() {
  return (
     <section className="relative w-full h-screen overflow-hidden bg-black">
      <video className="absolute opacity-80 top-0 left-0 w-full h-full object-cover"
        src={MediaVideo}
        autoPlay
        muted
        loop
        playsInline>
      </video>
    </section>
  )
}
