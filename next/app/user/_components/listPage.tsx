"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserType } from "../page";

const ListPage = ({ data }: { data: UserType[] | undefined }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex-col justify-start items-start flex gap-4">
        <div className="flex justify-between items-center w-full">
          <div className="text-black text-4xl font-bold">회원 정보</div>
        </div>
        <ScrollArea className="h-[500px] px-4 py-[30px] bg-zinc-300 flex-col justify-start items-start flex">
          {Array.isArray(data) &&
            data.map((arg, j) => (
              <div
                className={cn(
                  "w-[800px] h-[71px] bg-white flex items-center justify-between gap-1 mb-5",
                  j == data.length - 1 && "mb-0"
                )}
                key={j}
              >
                <div className="text-black text-[27px] font-semibold ml-3 text-nowrap text-ellipsis overflow-hidden flex-1">
                  {arg.name} : {arg._id.toString()}
                </div>
                <div className="flex justify-between items-center mr-4 gap-2">
                  <>
                    <Link
                      href={"/user/" + arg._id.toString()}
                      className="text-center text-black text-2xl font-semibold bg-zinc-300 p-1"
                    >
                      상세
                    </Link>
                  </>
                </div>
              </div>
            ))}
        </ScrollArea>
      </div>
    </>
  );
};

export default ListPage;
