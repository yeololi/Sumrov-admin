"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FetchData from "@/lib/tryApi";
import { useEffect, useState } from "react";
import * as React from "react";
import { useRouter } from "next/navigation";

interface AmountType {
  amount: number;
  color: string;
  size: string;
}

const DetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [orderData, setOrderData] = useState<any>(null);
  const [input, setInput] = useState("");

  const [selectValue, setSelectValue] = useState("");
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const data = await FetchData(params.id);
        console.log(data.results);

        setOrderData({
          ...data.results,
          amount: JSON.parse(data.results.Amount).map(
            (value: AmountType) => value.amount
          ),
          size: JSON.parse(data.results.Amount).map(
            (value: AmountType) => value.size
          ),
          color: JSON.parse(data.results.Amount).map(
            (value: AmountType) => value.color
          ),
          price: JSON.parse(data.results.Price),
          product: JSON.parse(data.results.Product).map(
            (value: string[]) => value
          ),
        });
        setInput(data?.results.PostNum);
        setSelectValue(data?.results.Status);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, []);
  let list1 = [
    ["주문자 이름:", "제품이름:"],
    ["주소:", "총 금액:"],
    ["수량:", "주문자 번호:"],
    ["사이즈:", "색상:"],
  ];
  let list2 = [
    "입금 대기",
    "입금 완료",
    "배송 대기",
    "배송 출발",
    "배송 완료",
    "취소",
    "환불",
  ];
  let list3 = [
    orderData?.CustomerName,
    orderData?.product,
    orderData?.Addr.split(";").join(" "),
    orderData?.price,
    orderData?.amount,
    orderData?.Phone,
    orderData?.size,
    orderData?.color,
  ];

  const saveForm = async () => {
    try {
      const res = await fetch(
        "http://3.39.237.151:8080/sale/" + orderData.Uuid,
        {
          method: "PUT",
          body: JSON.stringify({ PostNum: input, status: selectValue }),
        }
      ).then((r) => r.json());

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

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
          <div className="flex flex-col">
            <div className="text-5xl h-[71px]">
              {"주문 UUID: " + orderData?.Uuid}
            </div>
            <div className="text-5xl h-[71px]">
              주문 일시: {orderData?.Date}
            </div>
          </div>
          <div className="flex w-full justify-center items-center flex-col mt-[77px]">
            <div className="w-full">
              {list1.map((arg, i) => (
                <div className="flex flex-row h-[71px] text-3xl" key={i}>
                  <div className="flex h-full w-[50%]">
                    {arg[0]} {list3[i * 2]}
                  </div>
                  <div className="flex h-full">
                    {arg[1]} {list3[i * 2 + 1]}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row h-[71px] w-full items-center mt-[122px]">
            <div className="flex w-[50%]">
              <div className="text-5xl mr-[18px]">송장번호:</div>
              <input
                className="border-none min-w-[440px] p-3"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></input>
            </div>
            <div className="flex w-[50%] items-center">
              <div className="text-5xl mr-[18px]">상태</div>
              <div className="border-none text-5xl w-[440px] h-[71px] flex items-center">
                <Select
                  value={selectValue}
                  onValueChange={(v) => {
                    setSelectValue(v);
                  }}
                >
                  <SelectTrigger className="w-full h-full">
                    <SelectValue placeholder="상태를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {list2.map((arg, i) => (
                      <SelectItem key={i} value={arg}>
                        {arg}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-[50px] flex justify-end">
          <div
            onClick={saveForm}
            className="text-black text-4xl w-[198px] h-[74px] bg-zinc-300 flex items-center justify-center cursor-pointer"
          >
            저장하기
          </div>
        </div>
      </main>
    </>
  );
};

export default DetailPage;
