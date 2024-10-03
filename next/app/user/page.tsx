import { Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Modal from "../modal";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import ListPage from "./_components/listPage";

export interface UserType {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  zonecode: number;
  address: string;
  addrDetail: string;
  tel: string;
  year: string;
  month: string;
  day: string;
  ci: string;
  gender: string;
}

const admin = false;

const getData = async (host: string): Promise<UserType[] | undefined> => {
  try {
    const results: { results: UserType[] } = await fetch(
      `http://${host}/api/get/users/`,
      {
        cache: "no-store",
      }
    ).then((r) => r.json());

    return results.results;
  } catch (error) {
    console.error(error);
    return;
  }
};

export default async function Home() {
  const host = headers().get("host");
  const data = await getData(host!);

  return (
    <>
      {admin && <Modal />}

      <main className="h-screen px-[20px] pt-9">
        <nav className="w-full justify-between items-center flex">
          <div className="gap-4 items-center flex">
            <img className="w-9 h-9" src="/images/logo.png" />
            <div className="text-black text-4xl font-semibold">SUMROV</div>
          </div>
          <div className="text-center text-black text-3xl font-semibold">
            회원정보
          </div>
        </nav>

        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex justify-between items-start mt-24">
            <ListPage data={data} />
          </div>
        </Suspense>
      </main>
    </>
  );
}
