import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface FloatingToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export const FloatingToggle = ({ enabled, onToggle }: FloatingToggleProps) => {
  return (
    <Button
      onClick={onToggle}
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
    >
      {enabled ? <Eye className="h-6 w-6" /> : <EyeOff className="h-6 w-6" />}
    </Button>
  );
};
