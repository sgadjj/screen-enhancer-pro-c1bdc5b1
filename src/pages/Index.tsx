import { useState } from "react";
import { FilterControl } from "@/components/FilterControl";
import { ColorHighlight } from "@/components/ColorHighlight";
import { PresetManager, FilterPreset } from "@/components/PresetManager";
import { FloatingToggle } from "@/components/FloatingToggle";
import { OverlayPermission } from "@/components/OverlayPermission";
import { ShizukuManager } from "@/components/ShizukuManager";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Palette, Save } from "lucide-react";

const Index = () => {
  const [enabled, setEnabled] = useState(true);
  const [overlayGranted, setOverlayGranted] = useState(false);
  const [shizukuReady, setShizukuReady] = useState(false);
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [sharpness, setSharpness] = useState(0);
  const [colorHue, setColorHue] = useState(0);
  const [colorIntensity, setColorIntensity] = useState(0);
  const [backgroundFlat, setBackgroundFlat] = useState(false);

  const handleColorChange = (hue: number, intensity: number) => {
    setColorHue(hue);
    setColorIntensity(intensity);
  };

  const currentSettings: FilterPreset = {
    name: "",
    contrast,
    brightness,
    saturation: backgroundFlat ? Math.max(20, saturation - 40) : saturation,
    sharpness,
    colorHue,
    colorIntensity,
    backgroundFlat,
  };

  const loadPreset = (preset: FilterPreset) => {
    setContrast(preset.contrast);
    setBrightness(preset.brightness);
    setSaturation(preset.saturation);
    setSharpness(preset.sharpness);
    setColorHue(preset.colorHue);
    setColorIntensity(preset.colorIntensity);
    setBackgroundFlat(preset.backgroundFlat);
  };

  const getFilterStyle = () => {
    if (!enabled) return {};

    const filters = [
      `contrast(${backgroundFlat ? Math.max(80, contrast - 20) : contrast}%)`,
      `brightness(${brightness}%)`,
      `saturate(${backgroundFlat ? Math.max(20, saturation - 40) : saturation}%)`,
    ];

    if (sharpness > 0) {
      filters.push(`contrast(${100 + sharpness * 0.5}%)`);
    }

    return {
      filter: filters.join(" "),
      backdropFilter: filters.join(" "),
    };
  };

  const getColorHighlightStyle = () => {
    if (!enabled || colorIntensity === 0) return {};
    
    return {
      background: `linear-gradient(to bottom, 
        hsla(${colorHue}, 100%, 50%, ${colorIntensity / 200}), 
        transparent)`,
      mixBlendMode: "screen" as const,
    };
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Filter Overlay */}
      {enabled && (
        <>
          <div
            className="fixed inset-0 pointer-events-none z-40"
            style={getFilterStyle()}
          />
          <div
            className="fixed inset-0 pointer-events-none z-41"
            style={getColorHighlightStyle()}
          />
        </>
      )}

      {/* Control Panel */}
      <div className="relative z-50 container max-w-2xl mx-auto p-6 space-y-6">
        <ShizukuManager onShizukuReady={setShizukuReady} />
        
        {shizukuReady && (
          <OverlayPermission onPermissionGranted={() => setOverlayGranted(true)} />
        )}
        
        <div className="text-center space-y-2 pt-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-glow bg-clip-text text-transparent">
            Visual Enhancer
          </h1>
          <p className="text-muted-foreground">
            Advanced screen filter controls for enhanced visibility
          </p>
        </div>

        <Card className="p-6">
          <Tabs defaultValue="filters" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="filters">
                <Settings className="h-4 w-4 mr-2" />
                Filters
              </TabsTrigger>
              <TabsTrigger value="color">
                <Palette className="h-4 w-4 mr-2" />
                Color
              </TabsTrigger>
              <TabsTrigger value="presets">
                <Save className="h-4 w-4 mr-2" />
                Presets
              </TabsTrigger>
            </TabsList>

            <TabsContent value="filters" className="space-y-6 mt-6">
              <FilterControl
                label="Contrast"
                value={contrast}
                onChange={setContrast}
                min={50}
                max={200}
                step={1}
                unit="%"
              />

              <FilterControl
                label="Brightness"
                value={brightness}
                onChange={setBrightness}
                min={50}
                max={200}
                step={1}
                unit="%"
              />

              <FilterControl
                label="Saturation"
                value={saturation}
                onChange={setSaturation}
                min={0}
                max={200}
                step={1}
                unit="%"
              />

              <FilterControl
                label="Sharpness"
                value={sharpness}
                onChange={setSharpness}
                min={0}
                max={100}
                step={1}
                unit="%"
              />

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Label className="text-sm font-medium">Background Flattening</Label>
                <Switch checked={backgroundFlat} onCheckedChange={setBackgroundFlat} />
              </div>
            </TabsContent>

            <TabsContent value="color" className="space-y-6 mt-6">
              <ColorHighlight onColorChange={handleColorChange} />
            </TabsContent>

            <TabsContent value="presets" className="mt-6">
              <PresetManager currentSettings={currentSettings} onLoadPreset={loadPreset} />
            </TabsContent>
          </Tabs>
        </Card>

        {/* Demo Content */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Demo Content</h2>
          <p className="text-muted-foreground">
            Adjust the filters above to see the effects in real-time. This demo area shows how
            the filters affect text, colors, and contrast.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="h-24 bg-red-500 rounded-lg" />
            <div className="h-24 bg-green-500 rounded-lg" />
            <div className="h-24 bg-blue-500 rounded-lg" />
          </div>
        </Card>
      </div>

      <FloatingToggle enabled={enabled} onToggle={() => setEnabled(!enabled)} />
    </div>
  );
};

export default Index;
