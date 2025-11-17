import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface ColorHighlightProps {
  onColorChange: (hue: number, intensity: number) => void;
}

export const ColorHighlight = ({ onColorChange }: ColorHighlightProps) => {
  const [hue, setHue] = useState(0);
  const [intensity, setIntensity] = useState(0);

  const handleHueChange = (value: number) => {
    setHue(value);
    onColorChange(value, intensity);
  };

  const handleIntensityChange = (value: number) => {
    setIntensity(value);
    onColorChange(hue, value);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-foreground">Color Select</Label>
          <div 
            className="w-6 h-6 rounded border border-border"
            style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
          />
        </div>
        <Slider
          value={[hue]}
          onValueChange={(values) => handleHueChange(values[0])}
          min={0}
          max={360}
          step={1}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-foreground">Brightness Boost</Label>
          <span className="text-sm text-muted-foreground">{intensity}%</span>
        </div>
        <Slider
          value={[intensity]}
          onValueChange={(values) => handleIntensityChange(values[0])}
          min={0}
          max={100}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
};
