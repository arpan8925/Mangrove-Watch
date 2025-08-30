import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "destructive";
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon, 
  variant = "default",
  className 
}: MetricCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-success-light";
      case "warning":
        return "border-warning/20 bg-warning-light";
      case "destructive":
        return "border-destructive/20 bg-red-50";
      default:
        return "";
    }
  };

  const getIconClasses = () => {
    switch (variant) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      case "destructive":
        return "text-destructive";
      default:
        return "text-primary";
    }
  };

  const getChangeClasses = () => {
    switch (changeType) {
      case "positive":
        return "text-success bg-success-light";
      case "negative":
        return "text-destructive bg-red-50";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <Card className={cn("hover-lift transition-smooth", getVariantClasses(), className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-4 w-4", getIconClasses())} />
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold font-poppins">{value}</div>
            {change && (
              <Badge 
                variant="secondary" 
                className={cn("mt-1 text-xs", getChangeClasses())}
              >
                {change}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}