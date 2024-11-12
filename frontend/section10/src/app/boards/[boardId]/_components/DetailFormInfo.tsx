"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdInsertLink } from "react-icons/md";

export default function DetailFormInfo({ writer, address }: IDetailInfoProps) {
  return (
    <div className="flex flex-col gap-3 justify-center">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Avatar className="size-6">
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-gray-700 prose-l_14_20">{writer}</div>
        </div>
        <div className="text-[#818181] prose-r_14_20">2024.11.11</div>
      </div>
      <hr />
      <div className="flex justify-end gap-2">
        <MdInsertLink />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <MdOutlineLocationOn />
            </TooltipTrigger>
            {
              <TooltipContent side="bottom" align="center" className="max-w-xs">
                {<p>{address ? address : "등록된 주소가 없습니다."}</p>}
              </TooltipContent>
            }
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
