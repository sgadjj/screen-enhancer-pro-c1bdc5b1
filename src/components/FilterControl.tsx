import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface FilterControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
}

export const FilterControl = ({ label, value, onChange, min, max, step, unit = "" }: FilterControlProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-foreground">{label}</Label>
        <span className="text-sm text-muted-foreground">
          {value}{unit}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  );
};
