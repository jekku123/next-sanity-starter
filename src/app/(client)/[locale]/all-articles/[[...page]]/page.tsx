import { PaginationController } from "@/components/pagination-controller";
import { getArticlesResultSet } from "@/lib/sanity/utils/get-articles-resultset";
import { Metadata, ResolvingMetadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import Listing from "./_components/listing";

type PageParams = {
  params: { page?: string[]; locale: string };
};

export async function generateMetadata(
  { params }: PageParams,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentTitle = (await parent).title?.absolute;
  const page = params.page;
  const currentPage = parseInt(Array.isArray(page) ? page[0] : page || "1");

  return {
    title: `Articles | Page ${currentPage} | ${parentTitle}`,
    description: "This page contains a paginated list of all articles.",
  };
}

export const revalidate = 60;

export default async function ArticlesPage({ params }: PageParams) {
  const locale = params.locale;
  unstable_setRequestLocale(locale);

  const page = params.page;
  const currentPage = parseInt(Array.isArray(page) ? page[0] : page || "1");

  const PAGE_SIZE = 3;

  const { totalPages, items } = await getArticlesResultSet({
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
    language: locale,
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
    <div className="mx-auto w-full">
      <Listing items={items} />
      <PaginationController {...paginationProps} />
    </div>
  );
}
