import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({currentPage, totalPages, onPageChange}: PaginationProps) => {
    const maxVisiblePages = 2; // Number of pages to show around current page

    const getPageNumbers = () => {
        const pages = [];
        const left = Math.max(2, currentPage - maxVisiblePages);
        const right = Math.min(totalPages - 1, currentPage + maxVisiblePages);

        // Always show the first page
        pages.push(1);

        // Add "..." if there's a gap between 1 and left
        if (left > 2) {
            pages.push("...");
        }

        // Add pages between left and right
        for (let i = left; i <= right; i++) {
            pages.push(i);
        }

        // Add "..." if there's a gap between right and last page
        if (right < totalPages - 1) {
            pages.push("...");
        }

        // Always show the last page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-end space-x-2 my-10 ">

            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-primary text-white rounded-full disabled:opacity-50"
            >
                ❮
            </button>

            {getPageNumbers().map((page, index) =>
                typeof page === "number" ? (
                    <button
                        key={index}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded-full ${currentPage === page ? "bg-primary text-white" : ""}`}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className="px-2">...</span>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-primary text-white rounded-full disabled:opacity-50"
            >
                ❯
            </button>
        </div>
    );
};

export default Pagination;
