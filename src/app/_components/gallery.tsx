import ImageGrid from "./image-grid";
import { getImages } from "~/server/queries";
import AnimateText from "./animate-text";

export default async function Gallery() {
  const images = await getImages();
  if (images.length === 0)
    return (
      <div className="flex h-1/2 items-center justify-center">
        <AnimateText y={0}>
          <p className="bg-gradient-to-r from-blue-500 via-purple-400 to-pink-400 bg-clip-text text-center text-3xl font-semibold text-transparent">
            Upload your first image!
          </p>
        </AnimateText>
      </div>
    );
  return <ImageGrid images={images} />;
}
