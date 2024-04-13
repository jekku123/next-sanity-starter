import { getArticles } from "@/lib/sanity/client";
import { validateAndCleanupArticleTeaser } from "@/lib/zod/article-teaser";

export default async function ArticlesPage() {
  const articles = await getArticles();

  if (!articles) {
    return null;
  }

  const validatedArticles = articles.map((article) =>
    validateAndCleanupArticleTeaser(article),
  );
  console.log(validatedArticles);

  return <div>ArticlesPage</div>;
}
