import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="w-full bg-[url('/3106051.jpg')] bg-cover bg-center">
      <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 py-12">
        <div className="text-center">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="font-semibold uppercase tracking-widest text-gray-200">
                Lorem ipsum dolor
              </span>
              <h2 className="mb-6 mt-8 text-4xl font-bold text-gray-100 lg:text-5xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h2>
              <p className="mx-auto mb-10 max-w-3xl text-lg text-gray-300">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Laborum sit cum iure qui, nostrum at sapiente ducimus.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button variant="secondary">Read more</Button>
                <Button variant="outline">Contact</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
