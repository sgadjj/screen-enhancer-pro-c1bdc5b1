import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Move, Square } from "lucide-react";

interface ObjectControlsProps {
  movingBrightness: number;
  movingColorIntensity: number;
  stationaryBrightness: number;
  stationaryColorIntensity: number;
  onMovingBrightnessChange: (value: number) => void;
  onMovingColorChange: (value: number) => void;
  onStationaryBrightnessChange: (value: number) => void;
  onStationaryColorChange: (value: number) => void;
}

export const ObjectControls = ({
  movingBrightness,
  movingColorIntensity,
  stationaryBrightness,
  stationaryColorIntensity,
  onMovingBrightnessChange,
  onMovingColorChange,
  onStationaryBrightnessChange,
  onStationaryColorChange,
}: ObjectControlsProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Object-Specific Adjustments</h3>
      <Tabs defaultValue="moving" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="moving">
            <Move className="h-4 w-4 mr-2" />
            Moving Objects
          </TabsTrigger>
          <TabsTrigger value="stationary">
            <Square className="h-4 w-4 mr-2" />
            Stationary Objects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="moving" className="space-y-6 mt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-foreground">Brightness</Label>
              <span className="text-sm text-muted-foreground">{movingBrightness}%</span>
            </div>
            <Slider
              value={[movingBrightness]}
              onValueChange={(values) => onMovingBrightnessChange(values[0])}
              min={50}
              max={200}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-foreground">Color Intensity</Label>
              <span className="text-sm text-muted-foreground">{movingColorIntensity}%</span>
            </div>
            <Slider
              value={[movingColorIntensity]}
              onValueChange={(values) => onMovingColorChange(values[0])}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </TabsContent>

        <TabsContent value="stationary" className="space-y-6 mt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-foreground">Brightness</Label>
              <span className="text-sm text-muted-foreground">{stationaryBrightness}%</span>
            </div>
            <Slider
              value={[stationaryBrightness]}
              onValueChange={(values) => onStationaryBrightnessChange(values[0])}
              min={50}
              max={200}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-foreground">Color Intensity</Label>
              <span className="text-sm text-muted-foreground">{stationaryColorIntensity}%</span>
            </div>
            <Slider
              value={[stationaryColorIntensity]}
              onValueChange={(values) => onStationaryColorChange(values[0])}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
