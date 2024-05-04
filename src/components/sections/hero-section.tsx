import { Hero } from "@/lib/zod/section";
import BlockContent from "../block-content";
import { SanityImage } from "../sanity-image";
import SanityLink from "../sanity-link";
import { TypographyH1 } from "../typography";
import { Button } from "../ui/button";
export default function HeroSection({ content }: { content: Hero }) {
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      <div className="mr-5 flex flex-col justify-center gap-4">
        <TypographyH1>{content.title}</TypographyH1>
        <BlockContent content={content.body} />
        <div className="flex items-center space-x-4">
          {content.primaryLink && (
            <SanityLink href={content.primaryLink}>
              <Button>{content.primaryLink.label}</Button>
            </SanityLink>
          )}
          {content.secondaryLink && (
            <SanityLink href={content.secondaryLink}>
              <Button variant="secondary">{content.secondaryLink.label}</Button>
            </SanityLink>
          )}
        </div>
      </div>
      <SanityImage image={content.image} className="rounded-xl" />
    </div>
  );
}

// export default function HeroSection({ content }: { content: Hero }) {
//   return (

//     <section className={cn(`relative h-[500px] w-full`)}>
//       <div className="z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 py-12">
//         <div className="text-center">
//           <div className="container mx-auto px-4">
//             <div className="mx-auto max-w-4xl text-center">
//               <span className="font-semibold uppercase tracking-widest text-gray-200">
//                 {content.subtitle}
//               </span>
//               <h2 className="mb-6 mt-8 text-4xl font-bold text-gray-100 lg:text-5xl">
//                 {content.title}
//               </h2>

//               <BlockContent
//                 className="mx-auto mb-10 max-w-3xl text-lg text-gray-300"
//                 content={content.body}
//               />

//               <div className="flex items-center justify-center space-x-4">
//                 {content.primaryLink && (
//                   <SanityLink link={content.primaryLink}>
//                     <Button>{content.primaryLink.label}</Button>
//                   </SanityLink>
//                 )}
//                 {content.secondaryLink && (
//                   <SanityLink link={content.secondaryLink}>
//                     <Button variant="secondary">
//                       {content.secondaryLink.label}
//                     </Button>
//                   </SanityLink>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <SanityImage image={content.image} style={{ zIndex: -1 }} fill />
//     </section>
//   );
// }
