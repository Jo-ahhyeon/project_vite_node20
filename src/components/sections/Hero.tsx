
import heroVideo from '../../assets/hero.mp4'

export default function Hero() {
  return (
     <section className="relative w-full h-screen overflow-hidden">
      <video className="absolute top-0 left-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline>
      </video>
    </section>
  )
}
