import React from 'react';
import Image from 'next/image';

type RoundedImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

const RoundedImage: React.FC<RoundedImageProps> = ({ src, alt, width = 300, height = 300 }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <Image src={src} alt={alt} width={width} height={height} className="object-cover" />
    </div>
  );
};

export default RoundedImage;
