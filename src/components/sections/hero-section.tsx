import { Hero } from "@/lib/zod/section";
import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";
import FormattedText from "../formatted-text";
import { Button } from "../ui/button";

export default function HeroSection({ content }: { content: Hero }) {
  const bgImage = urlForImage(content.image);

  const bgImageSrc = `url('${bgImage}')`;

  return (
    <section className={`w-full bg-[${bgImageSrc}] bg-cover bg-center`}>
      <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 py-12">
        <div className="text-center">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="font-semibold uppercase tracking-widest text-gray-200">
                {content.subtitle}
              </span>
              <h2 className="mb-6 mt-8 text-4xl font-bold text-gray-100 lg:text-5xl">
                {content.title}
              </h2>

              <FormattedText
                className="mx-auto mb-10 max-w-3xl text-lg text-gray-300"
                content={content.body}
              />

              <div className="flex items-center justify-center space-x-4">
                <Link href={content.cta[0].internal?._ref!}>
                  <Button variant="secondary">{content.cta[0].label}</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
