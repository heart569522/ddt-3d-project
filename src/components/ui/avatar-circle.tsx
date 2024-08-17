import { cn } from "@/lib/utils";
import { IAvatar } from "@/types/model";
import Image from "next/image";

interface AvatarCirclesProps {
  className?: string;
  avatar: IAvatar[];
}

export default function AvatarCircles({
  className,
  avatar,
}: AvatarCirclesProps) {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatar.map((item, index) => (
        <Image
          key={index}
          className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
          src={item.image}
          width={40}
          height={40}
          alt={`Avatar ${item.name}`}
        />
      ))}
    </div>
  );
}
