import { PaginationController } from "@/components/pagination-controller";
import { getSettings } from "@/lib/sanity/client";
import { getArticlesResultSet } from "@/lib/sanity/utils/get-articles-resultset";
import { Metadata } from "next";
import Listing from "./_components/listing";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: `Articles | ${settings?.title.text}`,
    description: "This page contains a paginated list of all articles.",
  };
}

export const revalidate = 60;

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
    <div className="mx-auto w-full">
      <Listing items={items} />
      <PaginationController {...paginationProps} />
    </div>
  );
}
