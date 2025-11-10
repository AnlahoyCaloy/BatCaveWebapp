import React from "react";
import Image from "next/image";

// temporarily get images using this
const imageFilenames = ["coffee1.png", "coffee2.png", "coffee3.png" , "coffee4.png" , "coffee5.png"];

const getImagePath = (filename : string) => `/images/${filename}`;

export const  ImageGallery : React.FC = () => {
  return (
    <div>
      {imageFilenames.map((filename, index) => (
        <Image key={index} src={getImagePath(filename)} alt={filename} />
      ))}
    </div>
  );
}
