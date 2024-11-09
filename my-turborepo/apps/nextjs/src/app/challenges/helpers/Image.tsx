"use client";

import React, { useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

interface CustomImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  fallbackSrc,
  width,
  height,
  className,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={typeof width === "number" ? width : undefined}
      height={typeof height === "number" ? height : undefined}
      className={className}
      onError={(e) => {
        throw e;
      }}
      style={{ objectFit: "cover" }}
    />
  );
};

CustomImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  fallbackSrc: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

CustomImage.defaultProps = {
  fallbackSrc: "",
  width: "auto",
  height: "auto",
  className: "",
};

export default CustomImage;
