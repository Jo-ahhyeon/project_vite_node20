import { Link } from "react-router-dom";

interface AboutCardProps {
  titleEn: string;
  titleKo: string;
  img: string;
  link: string;
}

const AboutCard: React.FC<AboutCardProps> = ({ titleEn, titleKo, img, link }) => {
  return (
    <div className="relative group overflow-hidden">
      <img
        src={img}
        alt={titleKo}
        className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
        <p className="text-lg opacity-80">{titleEn}</p>
        <h3 className="text-2xl md:text-3xl font-bold mt-2">{titleKo}</h3>
        <Link
          to={link}
          className="mt-5 inline-flex items-center gap-2 text-lg font-medium border-b border-transparent hover:border-white transition"
        >
          →
        </Link>
      </div>
    </div>
  );
};

export default AboutCard;
