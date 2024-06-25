import { Suspense } from "react";
import Modal from "./modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ListPage, { category } from "./listPage";

const getData = async () => {
  const urls = [
    "http://3.39.237.151:8080/sale",
    "http://3.39.237.151:8080/post",
    "http://3.39.237.151:8080/notice",
  ];

  const promises = urls.map((url, i) =>
    fetch(url, { cache: "no-store" }).then((r) => r.json())
  );

  try {
    const results = await Promise.all(promises);

    return [
      {
        category: "주문목록",
        detail: true,
        plus: false,
        data: results[0].results,
      },
      {
        category: "상품관리",
        detail: false,
        plus: true,
        data: results[1].results,
      },
      {
        category: "공지사항",
        detail: false,
        plus: true,
        data: results[2].results,
      },
    ];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function Home() {
  const categoryList: category[] = await getData();

  return (
    <>
      <Modal />
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
            {categoryList.map((args, i) => (
              <ListPage args={args} i={i} key={i} />
            ))}
          </div>
        </Suspense>
         

        <div className="mt-52 text-center text-black text-5xl font-bold">
          Design By 정현서
        </div>
      </main>
    </>
  );
}
