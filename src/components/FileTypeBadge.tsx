import { FileType, getFileTypeIcon } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface FileTypeBadgeProps {
  type: FileType;
  showIcon?: boolean;
  className?: string;
}

export function FileTypeBadge({ type, showIcon = true, className }: FileTypeBadgeProps) {
  const labels: Record<FileType, string> = {
    document: "Document",
    image: "Image",
    spreadsheet: "Spreadsheet",
    presentation: "Presentation",
    archive: "Archive",
    code: "Code",
    other: "Other",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground",
        className
      )}
    >
      {showIcon && <span>{getFileTypeIcon(type)}</span>}
      {labels[type]}
    </span>
  );
}
