import { Progress } from "@/components/shadcn-ui/progress";
import { Html, useProgress } from "@react-three/drei";
import { LoaderCircle } from "lucide-react";

export default function ModelLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col justify-center items-center gap-2 bg-background/50 rounded-lg p-2">
        <div className="flex justify-center items-center gap-2">
          <p className="font-semibold">3D&nbsp;Loading</p>
          <LoaderCircle className="animate-spin" />
        </div>
        <Progress indicatorColor="bg-primary" value={progress} />
      </div>
    </Html>
  );
}
