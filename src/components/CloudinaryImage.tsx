import Image from "next/image";
import { cloudinaryUrl } from "@/lib/cloudinary";

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean | string;
}

export default function CloudinaryImage({
  src,
  alt,
  width = 800,
  height = 450,
  className = "",
  priority = false,
}: CloudinaryImageProps) {
  const url = cloudinaryUrl(src, { width: Number(width), quality: 75 });
  const isPriority = priority === true || priority === "true";

  return (
    <figure className="my-6">
      <Image
        src={url}
        alt={alt}
        width={Number(width)}
        height={Number(height)}
        className={`rounded-xl border border-gray-200 shadow-sm w-full h-auto ${className}`}
        priority={isPriority}
      />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
