import { urlForImage } from "@/lib/sanity/utils/image";
import { cn } from "@/lib/utils";
import { Image as ImageType } from "@/lib/zod/image";
import { getImageDimensions } from "@sanity/asset-utils";
import Image, { ImageProps } from "next/image";

export interface SanityImageProps
  extends Omit<ImageProps, "src" | "alt" | "priority"> {
  image: ImageType;
}

export function SanityImage({
  image,
  className,
  fill = false,
  ...props
}: SanityImageProps) {
  const { width, height } = getImageDimensions(image);

  return (
    <Image
      width={!fill ? width || 800 : undefined}
      height={!fill ? height || 600 : undefined}
      src={urlForImage(image)}
      alt={image?.alt || ""}
      className={cn("h-auto w-full object-cover", className)}
      fill={fill}
      priority
      {...props}
    />
  );
}
