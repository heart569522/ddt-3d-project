import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/shadcn-ui/card";

type Props = {
  title: string;
  detail: string;
};

export default function CardInfo({ title, detail }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base text-card-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}
