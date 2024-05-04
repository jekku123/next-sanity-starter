import { ArticleTeaser } from "@/components/documents/article-teasers";
import { PaginationController } from "@/components/pagination-controller";
import { TypographyH1 } from "@/components/typography";
import { getSettings } from "@/lib/sanity/client";
import { getArticlesResultSet } from "@/lib/sanity/utils/get-articles-resultset";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: `Articles | ${settings?.title.text}`,
    description: "This page contains a paginated list of all articles.",
  };
}

export default async function ArticlesPage({
  params,
}: {
  params?: { page: string[] };
}) {
  const page = params?.page;
  const currentPage = parseInt(Array.isArray(page) ? page[0] : page || "1");

  const PAGE_SIZE = 6;

  const { totalPages, items } = await getArticlesResultSet({
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
  });

  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;

  const pageRoot = "/all-articles";
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const prevPageHref =
    currentPage === 2
      ? pageRoot
      : prevEnabled && [pageRoot, prevPage].join("/");
  const nextPageHref = nextEnabled && [pageRoot, nextPage].join("/");

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginationProps = {
    prevPageHref,
    nextPageHref,
    pageRoot,
    currentPage,
    pageNumbers,
    prevEnabled,
    nextEnabled,
  };

  return (
    <div className="mx-auto w-full max-w-7xl grow px-6 py-4">
      <TypographyH1 className="text-center md:text-start">
        Articles
      </TypographyH1>
      <ul className="mx-auto mb-12 mt-9 grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3">
        {items.map((article) => (
          <li key={article._id}>
            <ArticleTeaser article={article} />
          </li>
        ))}
      </ul>
      <PaginationController {...paginationProps} />
    </div>
  );
}
