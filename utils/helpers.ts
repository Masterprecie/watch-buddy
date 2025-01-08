import { formatDistanceToNow } from "date-fns";

export function formatRelativeTime(dateString: string): string {
  if (!dateString) {
    return "fetching date";
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "fetching date";
  }

  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatCategory(category: string): string {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
