import { ConfidenceLevel } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  showLabel?: boolean;
  className?: string;
}

export function ConfidenceBadge({ level, showLabel = true, className }: ConfidenceBadgeProps) {
  const labels: Record<ConfidenceLevel, string> = {
    high: "High",
    medium: "Medium",
    low: "Low",
  };

  const percentages: Record<ConfidenceLevel, string> = {
    high: "95%",
    medium: "75%",
    low: "50%",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium tabular-nums",
        level === "high" && "confidence-high",
        level === "medium" && "confidence-medium",
        level === "low" && "confidence-low",
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          level === "high" && "bg-confidence-high",
          level === "medium" && "bg-confidence-medium",
          level === "low" && "bg-confidence-low"
        )}
      />
      {showLabel ? labels[level] : percentages[level]}
    </span>
  );
}
