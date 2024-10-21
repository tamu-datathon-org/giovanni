import React from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Button } from "@vanni/ui/button";

interface ScheduleIconListProps {
  className?: string;
}

const ScheduleIconList: React.FC<ScheduleIconListProps> = ({ className }) => {
  const router = useRouter();

  return (
    <div className={className}>
      <div className="flex flex-row">
        <Button
          className="shadow-none"
          onClick={() => router.push("tamudatathon.com")}
        >
          <div className="flex w-[75px] flex-col items-center justify-center border-white text-center duration-200 hover:bg-blue-400 hover:shadow-[inset_0_0_0_2px_rgba(14,116,144,1)] focus:border-4 lg:w-[100px]">
            <Image
              src="/Pixel_WorldIcon.png"
              alt="Home"
              width={100}
              height={100}
              className=""
            />
            <div className="text-wrap">Home</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ScheduleIconList;