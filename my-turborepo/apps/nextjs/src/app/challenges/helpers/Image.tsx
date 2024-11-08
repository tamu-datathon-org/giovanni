import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

interface CustomImageProps {
    src: string;
    alt: string;
    fallbackSrc?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, fallbackSrc, width, height, className }) => {
    const [imageSrc, setImageSrc] = useState(src);
    const [imageError, setImageError] = useState(false);

    const handleError = () => {
        if (!imageError && fallbackSrc) {
            setImageSrc(fallbackSrc);
            setImageError(true);
        }
    };
    return (
        <Image
            src={imageSrc}
            alt={alt}
            width={typeof width === 'number' ? width : undefined}
            height={typeof height === 'number' ? height : undefined}
            className={className}
            onError={handleError}
            style={{ objectFit: 'cover' }}
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
    fallbackSrc: '',
    width: 'auto',
    height: 'auto',
    className: '',
};

export default CustomImage;
