const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dcngcvz9k";

export function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_${quality || 75},w_${width}/${src}`;
}

export function cloudinaryUrl(
  publicId: string,
  options?: { width?: number; height?: number; quality?: number }
) {
  const transforms = ["f_auto"];
  if (options?.width) transforms.push(`w_${options.width}`);
  if (options?.height) transforms.push(`h_${options.height}`);
  transforms.push(`q_${options?.quality || 75}`);
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(",")}/${publicId}`;
}
