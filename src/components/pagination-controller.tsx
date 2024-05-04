import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type PaginationControllerProps = {
  prevPageHref?: string | boolean;
  nextPageHref?: string | boolean;
  pageRoot: string;
  currentPage: number;
  pageNumbers: number[];
  prevEnabled: boolean;
  nextEnabled: boolean;
};

export function PaginationController({
  prevPageHref,
  nextPageHref,
  pageRoot,
  currentPage,
  pageNumbers,
  prevEnabled,
  nextEnabled,
}: PaginationControllerProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={(prevPageHref as string) || ""}
            className={
              prevEnabled
                ? "cursor-pointer"
                : "pointer-events-none cursor-not-allowed"
            }
          />
        </PaginationItem>
        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href={`${pageRoot}/${pageNumber}`}
              isActive={pageNumber === currentPage}
              className={
                pageNumber === currentPage ? "border-primary" : "border-border"
              }
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={(nextPageHref as string) || ""}
            className={cn(
              !nextEnabled && "pointer-events-none cursor-not-allowed",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
