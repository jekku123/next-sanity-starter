import ArticleTeasers from "@/components/article-teasers";
import { TypographyH1 } from "@/components/typography";
import { getArticles } from "@/lib/sanity/utils/get-articles";

export const metadata = {
  title: "Articles",
  description: "All articles on the site",
};

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-4">
      <div className="grid gap-6">
        <TypographyH1>Articles</TypographyH1>

        {articles ? (
          <ArticleTeasers articles={articles} />
        ) : (
          <p>No articles found</p>
        )}
      </div>
    </div>
  );
}
