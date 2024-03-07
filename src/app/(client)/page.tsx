import Hero from "@/components/hero";
import ImageGallery from "@/components/image-gallery";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid gap-9">
      <Hero />
      <section className="mx-auto w-full max-w-7xl px-6 py-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid gap-4">
            <h2 className="text-4xl font-bold">Lorem ipsum dolor sit amet.</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              sit cum iure qui, nostrum at sapiente ducimus.
            </p>
            <div className="flex items-center space-x-4">
              <Button>Read more</Button>
            </div>
          </div>
          <div className="grid gap-4">
            <h2 className="text-4xl font-bold">Lorem ipsum dolor sit amet.</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              sit cum iure qui, nostrum at sapiente ducimus.
            </p>
            <div className="flex items-center space-x-4">
              <Button>Read more</Button>
            </div>
          </div>
        </div>
      </section>
      <ImageGallery />
    </div>
  );
}
