
import heroVideo from '../../assets/hero.mp4'
import heroVideo2 from '../../assets/hero2.mp4'

export default function Hero() {
  return (
     <section className="relative w-full h-screen overflow-hidden bg-black">
      <video className="absolute opacity-80 top-0 left-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline>
      </video>
    </section>
  )
}
