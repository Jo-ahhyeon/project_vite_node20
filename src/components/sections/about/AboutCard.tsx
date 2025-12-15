import ArrowLink from "@/components/ui/ArrowLink";

interface AboutCardProps {
  titleEn: string;
  titleKo: string;
  img: string;
  link: string;
}

const AboutCard: React.FC<AboutCardProps> = ({
  titleEn,
  titleKo,
  img,
  link,
}) => {
  return (
    <div
      className="
        relative overflow-hidden bg-black group about-card w-full
        h-[33.333vh]
        lg:h-screen
      "
    >
      <img
        src={`${import.meta.env.BASE_URL}${img}`}
        alt={titleKo}
        className="
          w-full h-full object-cover
          opacity-80 group-hover:opacity-30 transition-opacity duration-500
        "
      />

      <div
        className="
          absolute inset-0 bg-black/40 
          group-hover:bg-black/50 transition-all duration-300
        "
      />

      <div
        className="
          absolute inset-0 flex flex-col justify-center items-center 
          text-center text-white gap-4 lg:gap-lg
        "
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm font-light opacity-80">{titleEn}</p>
          <h3 className="text-xl font-bold mt-2">{titleKo}</h3>
        </div>

        <ArrowLink
          to={link}
          className="
            w-10 mt-5
            border-b border-transparent
            hover:border-white
          "
          ariaLabel={`${titleKo} 바로가기`}
        />
      </div>
    </div>
  );
};

export default AboutCard;
