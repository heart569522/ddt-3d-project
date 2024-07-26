import TurtleStuff from "@/components/models/turttle-stuff";
import CardInfo from "@/components/ui/dashboard/card-info";
import EnvironmentChart from "@/components/ui/dashboard/environment-chart";
import Navigation from "@/components/ui/navigation";

export default function Home() {
  return (
    <Navigation
      dashboard={
        <>
          <CardInfo
            title="General"
            detail="asd';asl 654q qweqwe adc 1asdasdasd"
          />
          <EnvironmentChart />
        </>
      }
    >
      <div className="w-full">
        
      </div>
    </Navigation>
  );
}
