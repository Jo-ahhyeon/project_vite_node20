import AboutCard from "./AboutCard";

const About = () => {
  const cards = [
    {
      titleEn: "Brand story",
      titleKo: "브랜드 스토리",
      img: "/img/brandstoryimg.jpg",
      link: "/brandstory",
    },
    {
      titleEn: "About Animora",
      titleKo: "애니모라 소개",
      img: "/img/companyInfo.jpg",
      link: "/companyinfo",
    },
    {
      titleEn: "Corporate Social Responsibility",
      titleKo: "사회적 책임",
      img: "/img/csr.jpg",
      link: "/csr",
    },
  ];

  return (
    <section id="about" className="w-full h-full">
      <div className="container1650 mx-auto grid grid-cols-1 md:grid-cols-3">
        {cards.map((card, index) => (
          <AboutCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
};

export default About;
