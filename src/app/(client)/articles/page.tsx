import ArticleTeasers from "@/components/article-teasers";
import { TypographyH1 } from "@/components/typography";
import { getArticles } from "@/lib/sanity/client";
import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await getArticles();

  const validatedArticleTeasers = articles.reduce(
    (articles: ArticleTeaser[], article: any) => {
      const validatedArticleTeaser = validateAndCleanupArticleTeaser(article);
      return validatedArticleTeaser
        ? [...articles, validatedArticleTeaser]
        : articles;
    },
    [],
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-4">
      <div className="flex flex-col gap-6">
        <TypographyH1>Articles</TypographyH1>

        {validatedArticleTeasers ? (
          <ArticleTeasers articles={validatedArticleTeasers} />
        ) : (
          <p>No articles found</p>
        )}
      </div>
    </div>
  );
}

// export function ArticleTeasers({
//   articles,
//   title,
// }: {
//   articles: ArticleTeaserType[];
//   title?: string;
// }) {
//   return (
//     <div className="flex flex-col gap-6">
//       {title && <TypographyH1>{title}</TypographyH1>}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//         {articles.map((article) => (
//           <ArticleTeaser key={article?._id} article={article} />
//         ))}
//       </div>
//       <div className="place-self-center">
//         <Button asChild>
//           <Link href="/articles">View all articles</Link>
//         </Button>
//       </div>
//     </div>
//   );
// }
