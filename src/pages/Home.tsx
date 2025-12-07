import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "../components/sections/Hero";
import Partnership from "../components/sections/Partnership";
import About from "../components/sections/about/About";
import Reservation from "../components/sections/Reservation";
import Facility from "../components/sections/Facility";
import Media from "../components/sections/Media";
import Review from "../components/sections/Review";
import Service from "../components/sections/Service";
import Solution from "../components/sections/Solution";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  useEffect(() => {
    const container = document.querySelector("#container") as HTMLElement;
    if (!container) return;

    const sections = gsap.utils.toArray(".panel");

    gsap.to(sections, {
      yPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + container.offsetHeight,
      }
    });
  }, []);

  return (
    <div id="container">
      <section id="hero" className="panel" data-bg="dark"><Hero /></section>
      <section id="partnership" className="panel" data-bg="light"><Partnership /></section>
      <section id="about" className="panel" data-bg="dark"><About /></section>
      <section id="reservation" className="panel" data-bg="light"><Reservation /></section>
      <section id="facility" className="panel" data-bg="light"><Facility /></section>
      <section id="media" className="panel" data-bg="dark"><Media /></section>
      <section id="review" className="panel" data-bg="light"><Review /></section>
      <section id="service" className="panel" data-bg="dark"><Service /></section>
      <section id="solution" className="panel" data-bg="dark"><Solution /></section>
    </div>
  );
}

export default Home;
