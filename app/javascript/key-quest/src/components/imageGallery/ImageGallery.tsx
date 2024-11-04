import React from "react";

import "./imageGallery.sass";

interface ImageGalleryProps {
  srcs: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ srcs }) => {
  return (
    <div className="image-gallery-container">
      {srcs.map((src, index) => (
        <img
          key={index}
          src={`/assets${src}`}
          className={`image-gallery-image image-${index}`}
          alt={`Dynamic level decoration ${index}`}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
