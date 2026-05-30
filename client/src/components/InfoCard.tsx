import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function InfoCard({ title, icon, children, className = "" }: InfoCardProps) {
  return (
    <Card className={`border-border/50 shadow-sm ${className}`}>
      <CardHeader className="border-b border-border/30">
        <CardTitle className="flex items-center gap-2 text-primary">
          {icon && <span className="text-accent">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {children}
      </CardContent>
    </Card>
  );
}
