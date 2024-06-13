import { Suspense } from "react";
import Modal from "./modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface category {
    category: string;
    detail: boolean;
    plus: boolean;
    data: SaleType[] | PostType[] | NoticeType[];
}

interface SaleType {
    Uuid: string;
    CustomerName: string;
    Product: string;
    PostNum: string;
    Addr: string;
    Phone: string;
    Price: string;
    Amount: string;
    Status: string;
    Date: string;
}

interface PostType {
    Uuid: string;
    Title: string;
    Price: string;
    Sale: number;
    Description: string;
    Category: string;
    Size: string[];
    Color: string[];
    MainImage: string;
    DetailImages: string[];
}

interface NoticeType {
    Uuid: string;
    Title: string;
    Description: string;
    Date: string;
    Images: string[];
}

const isSaleType = (arg: any): arg is SaleType => {
    return "CustomerName" in arg;
};

const isPostType = (arg: any): arg is PostType => {
    return "Price" in arg && "Sale" in arg;
};

const isNoticeType = (arg: any): arg is NoticeType => {
    return "Images" in arg && !("Sale" in arg);
};

const getData = async () => {
    const urls = [
        "http://3.39.237.151:8080/sale",
        "http://3.39.237.151:8080/post",
        "http://3.39.237.151:8080/notice",
    ];

    const promises = urls.map((url, i) => fetch(url).then((r) => r.json()));

    const results = await Promise.all(promises);

    return [
        { category: "주문목록", detail: true, plus: false, data: results[0] },
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
};

export default async function Home() {
    const categoryList: category[] = await getData();

    return (
        <>
            <Modal />
            <main className="h-screen w-screen px-[59px] pt-9">
                <nav className="w-full justify-between items-center flex">
                    <div className="gap-4 items-center flex">
                        <img className="w-9 h-9" src="/images/logo.png" />
                        <div className="text-black text-4xl font-semibold">
                            SUMROV
                        </div>
                    </div>
                    <div className="text-center text-black text-3xl font-semibold">
                        회원정보
                    </div>
                </nav>

                <Suspense fallback={<div>Loading...</div>}>
                    <div className="flex justify-between items-start mt-24">
                        {categoryList.map((args, i) => (
                            <div
                                className="flex-col justify-start items-start flex gap-4"
                                key={i}
                            >
                                <div className="text-black text-4xl font-bold">
                                    {args.category}
                                </div>
                                <ScrollArea className="h-[500px] px-4 py-[30px] bg-zinc-300 flex-col justify-start items-start flex">
                                    {Array.isArray(args.data) &&
                                        args.data.map((arg, j) => (
                                            <div
                                                className={cn(
                                                    "w-[470px] h-[71px] bg-white flex items-center justify-between gap-1 mb-5",
                                                    j == args.data.length - 1 &&
                                                        "mb-0",
                                                )}
                                                key={j}
                                            >
                                                <div className="text-black text-[27px] font-semibold ml-3 text-nowrap text-ellipsis overflow-hidden flex-1">
                                                    {isSaleType(arg)
                                                        ? "주문자: " +
                                                          arg.CustomerName
                                                        : isPostType(arg)
                                                        ? "상품 제목: " +
                                                          arg.Title
                                                        : isNoticeType(arg)
                                                        ? "공지 제목: " +
                                                          arg.Title
                                                        : null}
                                                </div>
                                                <div className="flex justify-between items-center mr-4 gap-4">
                                                    <div className="text-center text-black text-2xl font-semibold bg-zinc-300 p-1">
                                                        삭제
                                                    </div>
                                                    <div className="text-center text-black text-2xl font-semibold bg-zinc-300 p-1">
                                                        수정
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </ScrollArea>
                            </div>
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
