import TurtleStuff from "@/components/models/turttle-stuff";
import CardInfo from "@/components/ui/dashboard/card-info";
import {
  AverageElectronicUsage,
  ElectricChart,
} from "@/components/ui/dashboard/electric-chart";
import {
  EnvironmentChart,
  EnvironmentPMChart,
} from "@/components/ui/dashboard/environment-chart";
import HumidityChart from "@/components/ui/dashboard/humidity-chart";
import TemperatureChart from "@/components/ui/dashboard/temperature-chart";
import Navigation from "@/components/ui/navigation";

export default function Overview() {
  return (
    <Navigation
      leftDashbaord={
        <>
          <CardInfo
            title="General"
            detail="asd';asl 654q qweqwe adc 1asdasdasd"
          />
          <EnvironmentChart />
          <EnvironmentPMChart />
          <TemperatureChart />
          <HumidityChart />
        </>
      }
      rightDashbaord={
        <div className="flex flex-col gap-2">
          <ElectricChart />
          <AverageElectronicUsage />
        </div>
      }
    >
      <div className="w-full h-screen bg-cyan-700"
      >
        
      </div>
    </Navigation>
  );
}
