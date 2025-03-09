export function createPageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible = 1,
) {
  if (totalPages <= 0) return { prev: 1, pages: [], next: 1 };

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, currentPage + half);

  if (currentPage <= half) {
    end = Math.min(totalPages, maxVisible);
  } else if (currentPage + half >= totalPages) {
    start = Math.max(1, totalPages - maxVisible + 1);
  }

  const pages = [];
  if (start > 1) pages.push(1);
  if (start > 2) pages.push(-1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) pages.push(-1);
  if (end < totalPages) pages.push(totalPages);

  return {
    prev: currentPage > 1 ? currentPage - 1 : 1,
    pages,
    next: currentPage < totalPages ? currentPage + 1 : totalPages,
  };
}
