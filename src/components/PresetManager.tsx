import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export interface FilterPreset {
  name: string;
  contrast: number;
  brightness: number;
  saturation: number;
  sharpness: number;
  colorHue: number;
  colorIntensity: number;
  backgroundFlat: boolean;
}

interface PresetManagerProps {
  currentSettings: FilterPreset;
  onLoadPreset: (preset: FilterPreset) => void;
}

export const PresetManager = ({ currentSettings, onLoadPreset }: PresetManagerProps) => {
  const [presetName, setPresetName] = useState("");
  const [presets, setPresets] = useState<FilterPreset[]>(() => {
    const saved = localStorage.getItem("visualPresets");
    return saved ? JSON.parse(saved) : [];
  });

  const savePreset = () => {
    if (!presetName.trim()) {
      toast.error("Please enter a preset name");
      return;
    }

    const newPreset = { ...currentSettings, name: presetName };
    const updated = [...presets, newPreset];
    setPresets(updated);
    localStorage.setItem("visualPresets", JSON.stringify(updated));
    setPresetName("");
    toast.success(`Preset "${presetName}" saved!`);
  };

  const deletePreset = (index: number) => {
    const updated = presets.filter((_, i) => i !== index);
    setPresets(updated);
    localStorage.setItem("visualPresets", JSON.stringify(updated));
    toast.success("Preset deleted");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Preset name"
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
          className="flex-1"
        />
        <Button onClick={savePreset} size="icon" variant="secondary">
          <Save className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {presets.map((preset, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <button
              onClick={() => {
                onLoadPreset(preset);
                toast.success(`Loaded "${preset.name}"`);
              }}
              className="flex-1 text-left text-sm font-medium text-foreground"
            >
              {preset.name}
            </button>
            <Button
              onClick={() => deletePreset(index)}
              size="icon"
              variant="ghost"
              className="h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
