"use client";

import { FetchData2 } from "@/lib/tryApi";
import { useEffect, useState } from "react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { UserType } from "../page";

const DetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [orderData, setOrderData] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const data: { results: UserType } = await FetchData2(params.id);
        console.log(data.results);

        setOrderData(data.results);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, []);
  let list1 = [
    ["이름:", "이메일:"],
    ["우편번호:", "주소:"],
    ["상세주소:", "전화번호:"],
    ["생년월일:", "성별:"],
    ["ci:", ""],
  ];

  let list2 = [
    orderData?.name,
    orderData?.email,
    orderData?.zonecode,
    orderData?.address,
    orderData?.addrDetail,
    orderData?.tel,
    [orderData?.year, orderData?.month, orderData?.day].join(". "),
    orderData?.gender,
    orderData?.ci,
    "",
  ];

  return (
    <>
      <main className="h-screen px-[20px] pt-9">
        <nav className="w-full justify-start items-center flex">
          <div className="gap-4 items-center flex">
            <img className="w-9 h-9" src="/images/logo.png" />
            <div className="text-black text-4xl font-semibold">SUMROV</div>
          </div>
        </nav>

        <div className="w-full bg-zinc-300 px-[22px] py-[44px] mt-9">
          <div className="flex w-full justify-center items-center flex-col mt-[77px]">
            <div className="w-full">
              {list1.map((arg, i) => (
                <div className="flex flex-row h-[71px] text-3xl" key={i}>
                  <div className="flex h-full w-[50%]">
                    {arg[0]} {list2[i * 2]}
                  </div>
                  <div className="flex h-full">
                    {arg[1]} {list2[i * 2 + 1]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DetailPage;
