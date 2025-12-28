import React from "react";

interface TitleProps {
  text: string;
  oddClassName?: string;
  evenClassName?: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({
  text,
  oddClassName = "text-teal-400",
  evenClassName = "text-cyan-700",
  className = "",
}) => {
  return (
    <h1 className={`pt-4 text-center text-3xl font-bold ${className}`}>
      <div className="m-2 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={index % 2 === 0 ? oddClassName : evenClassName}
        >
          {char}
          {char === " " && <span>&nbsp;</span>}
        </span>
      ))}
    </h1>
  );
};

export default Title;
