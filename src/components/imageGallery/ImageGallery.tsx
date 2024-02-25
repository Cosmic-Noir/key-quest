import React from "react";

import "./imageGallery.sass";

interface ImageGalleryProps {
  srcs: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ srcs }) => {
  return (
    <div>
      {srcs.map((src, index) => (
        <img
          key={index}
          src={src}
          className={`image-gallery-image image-${index}`}
          alt={`Dynamic image ${index}`}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
