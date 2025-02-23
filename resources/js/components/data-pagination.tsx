import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useCallback } from 'react';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedData<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface DataPaginationProps<T> {
  /** The paginated data object from Laravel */
  paginated: PaginatedData<T>;
  /** Optional callback to handle loading state */
  onPageChange?: (isLoading: boolean) => void;
  /** Preserve scroll position when navigating, defaults to false */
  preserveScroll?: boolean;
  /** Preserve state when navigating, defaults to true */
  preserveState?: boolean;
  /** Show total items count, defaults to true */
  showCount?: boolean;
  /** Custom count text */
  countText?: (from: number, to: number, total: number) => string;
}

export function DataPagination<T>({
  paginated,
  onPageChange,
  preserveScroll = false,
  preserveState = true,
  showCount = true,
  countText = (from, to, total) => `Showing ${from} to ${to} of ${total} entries`,
}: DataPaginationProps<T>) {
  const visit = useCallback(
    (url: string | null) => {
      if (!url) return;

      onPageChange?.(true);
      router.visit(url, {
        preserveScroll,
        preserveState,
        onFinish: () => onPageChange?.(false),
      });
    },
    [onPageChange, preserveScroll, preserveState],
  );

  // Early return if paginated data is not properly structured
  if (!paginated?.from) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {showCount && (
        <p className="text-sm text-muted-foreground">
          {countText(paginated.from, paginated.to, paginated.total)}
        </p>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              disabled={!paginated.prev_page_url}
              onClick={() => visit(paginated.prev_page_url)}
              className="cursor-pointer"
              title="Previous Page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </PaginationItem>

          {paginated.links.slice(1, -1).map((link, i) => {
            // Always show first and last page numbers
            if (paginated.last_page > 7) {
              const showLink =
                i === 0 || // First page
                i === paginated.links.length - 3 || // Last page
                (paginated.current_page - 2 <= parseInt(link.label) && // Pages around current
                  parseInt(link.label) <= paginated.current_page + 2);

              if (!showLink) {
                // Show ellipsis for skipped ranges
                if (i === 1 || i === paginated.links.length - 4) {
                  return (
                    <PaginationItem key={i}>
                      <PaginationEllipsis>
                        <MoreHorizontal className="h-4 w-4" />
                      </PaginationEllipsis>
                    </PaginationItem>
                  );
                }
                return null;
              }
            }

            return (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    visit(link.url);
                  }}
                  isActive={link.active}
                  className="cursor-pointer"
                >
                  {link.label}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              disabled={!paginated.next_page_url}
              onClick={() => visit(paginated.next_page_url)}
              className="cursor-pointer"
              title="Next Page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
