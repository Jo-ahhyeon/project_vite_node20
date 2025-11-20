import Hero from "../components/sections/Hero";
import Partnership from "../components/sections/Partnership";
import About from "../components/sections/about/About";
import Reservation from "../components/sections/Reservation";
import Facility from "../components/sections/Facility";
import Media from "../components/sections/Media";
import Review from "../components/sections/Review";
import Service from "../components/sections/Service";
import Solution from "../components/sections/Solution";

function Home() {
  return (
    <>
      <section id="hero" data-bg="dark"><Hero /></section>
      <section id="partnership" data-bg="light"><Partnership /></section>
      <section id="about" data-bg="dark"><About /></section>
      <section id="reservation" data-bg="light"><Reservation /></section>
      <section id="facility" data-bg="light"><Facility /></section>
      <section id="media" data-bg="dark"><Media /></section>
      <section id="service" data-theme="dark"><Service /></section>
      <section id="review" data-bg="light"><Review /></section>
      <section id="solution" data-bg="dark"><Solution /></section>
    </>
  );
}

export default Home;
