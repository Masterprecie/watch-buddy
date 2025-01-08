import { formatDistanceToNow } from "date-fns";

export function formatRelativeTime(dateString: string): string {
  if (!dateString) {
    return "Invalid date";
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return formatDistanceToNow(date, { addSuffix: true });
}
