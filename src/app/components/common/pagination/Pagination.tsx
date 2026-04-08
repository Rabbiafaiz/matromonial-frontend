'use client'
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "../allImages/AllImages";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  baseUrl?: string;
}

interface PageButtonProps {
  page: number;
  isActive: boolean;
  onClick: () => void;
  isMobile: boolean;
}

const PageButton: React.FC<PageButtonProps> = ({
  page,
  isActive,
  onClick,
  isMobile,
}) => (
  <button
    onClick={onClick}
    className={`min-w-[32px] h-8 px-3 mx-1 rounded-md transition-colors
      ${isActive ? "bg-orange-500 text-white" : "hover:bg-gray-100"}
      ${isMobile ? "text-sm" : "text-base"}`}
  >
    {page}
  </button>
);

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 68,
  onPageChange,
  baseUrl = "",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    router.push(`${baseUrl}?${params.toString()}`);

    if (onPageChange) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = (): React.ReactNode[] => {
    const pages: React.ReactNode[] = [];

    const showPages = (): (number | string)[] => {
      if (typeof window !== "undefined" && window.innerWidth < 640) {
        return [1, currentPage, totalPages];
      } else {
        const pageNumbers: (number | string)[] = [1];

        if (currentPage > 3) {
          pageNumbers.push("...");
        }

        for (
          let i = Math.max(2, currentPage - 1);
          i <= Math.min(currentPage + 1, totalPages - 1);
          i++
        ) {
          pageNumbers.push(i);
        }

        if (currentPage < totalPages - 2) {
          pageNumbers.push("...");
        }

        if (totalPages > 1) {
          pageNumbers.push(totalPages);
        }

        return pageNumbers;
      }
    };

    showPages().forEach((page, index) => {
      if (page === "...") {
        pages.push(
          <span key={`ellipsis-${index}`} className="px-2" aria-hidden="true">
            ...
          </span>
        );
      } else {
        const pageNum = typeof page === "number" ? page : parseInt(page);
        pages.push(
          <PageButton
            key={pageNum}
            page={pageNum}
            isActive={currentPage === pageNum}
            onClick={() => handlePageChange(pageNum)}
            isMobile={typeof window !== "undefined" && window.innerWidth < 640}
          />
        );
      }
    });

    return pages;
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-end gap-2 my-4"
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-3 h-8 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
        aria-label="Previous page"
      >
        <ArrowLeft />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex flex-wrap items-center justify-center">
        {renderPageNumbers()}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 h-8 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ArrowRight />
      </button>
    </nav>
  );
};

export default Pagination;
