import Image from "next/image";

import { ImageComponentProps } from "@/lib/interface";

function ImageComponent({
  src,
  alt,
  width = 100,
  height = 100,
}: ImageComponentProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="w-full h-48 object-cover rounded-md mb-4"
    />
  );
}

export default ImageComponent;
