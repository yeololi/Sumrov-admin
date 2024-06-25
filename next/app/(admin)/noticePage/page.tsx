"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Menu, Minus, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const initialInputsState = {
  title: "",
  description: "",
};

const RegistrationPage = () => {
  const router = useRouter();

  const [inputs, setInputs] = useState(initialInputsState);

  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);

  const postFetch = async () => {
    setIsLoading(() => true);

    try {
      let imageRes = null;
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        imageRes = await fetch("/api/s3-upload", {
          method: "POST",
          body: formData,
        }).then((r) => r.json());
        console.log(imageRes);
        const fileName = encodeURIComponent(imageRes.fileName);
        imageRes = `https://sumrovbucket.s3.ap-northeast-2.amazonaws.com/${fileName}`;
      }

      const body = {
        title: inputs.title,
        description: inputs.description,
        images: [imageRes],
      };

      const res = await fetch("/api/post/newNotice", {
        method: "POST",
        body: JSON.stringify(body),
      }).then((r) => {
        console.log(r);
      });
      setIsLoading(() => false);
      router.push("/");
    } catch (error) {
      console.error(error);
      setIsLoading(() => false);
    }
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [id]: value }));
  };

  const uploadToClient: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (createObjectURL) {
      URL.revokeObjectURL(createObjectURL);
    }

    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];
      setImage(i);

      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  return (
    <>
      <div className="w-full flex flex-col bg-neutral-50 pb-20">
        <div className="flex-col justify-center items-center inline-flex">
          <div className="pl-[505px] pr-[15px] py-[15px] bg-white justify-end items-center inline-flex">
            <div className="justify-start items-start gap-[465px] flex">
              <Link
                href="/"
                className="justify-center items-center gap-2.5 flex"
              >
                <img className="w-[22px] h-[22px]" src="images/logo.png" />
                <div className="text-neutral-900 text-xl font-semibold font-nav">
                  SUMROV
                </div>
              </Link>
              <X />
            </div>
          </div>
          <div className="w-[1125px] px-[350px] py-[15px] bg-zinc-600 border border-black justify-center items-center gap-2.5 inline-flex">
            <div className="text-neutral-50 text-lg font-semibold font-pre">
              NOTICE
            </div>
          </div>
        </div>
        <div className="flex-col justify-start items-center gap-[74px] flex">
          <div className="border border-stone-300 border-t-0 flex-col w-[1125px] justify-center items-center flex">
            <div className="flex-col justify-center items-center gap-[10px] flex mt-[48px]">
              <div className="w-[700px] flex-col justify-center items-center gap-[10px] flex">
                <div className="w-[700px] flex-col  items-center flex">
                  <div className="text-black text-xl w-full font-semibold font-noto">
                    공지사항
                  </div>
                </div>
                <div className="w-[700px] h-[0px] border-2 border-gray-200" />
              </div>
              <div className="flex-col justify-center items-center gap-[74px] flex pb-10">
                <div className="h-[438px] flex-col justify-start items-start gap-6 mt-6 flex">
                  <StandardForm
                    value={inputs.title}
                    id="title"
                    onChange={onChange}
                    title="제목"
                    className="w-[550px] h-[30px]"
                  />

                  <div className="w-[700px] justify-between items-center flex">
                    <div
                      className={"w-[109.47px] text-sm font-normal font-noto"}
                    >
                      내용 입력
                    </div>

                    <textarea
                      className={
                        "bg-white w-[550px] h-[252px] dark:text-white rounded-sm dark:bg-zinc-800 border placeholder:text-neutral-300 text-black text-[14px] font-normal font-pre pl-2 border-neutral-300"
                      }
                      onChange={(e) => {
                        const { id, value } = e.target;
                        setInputs((prevInputs) => ({
                          ...prevInputs,
                          [id]: value,
                        }));
                      }}
                      value={inputs.description}
                      id="description"
                    />
                  </div>
                  <div className="w-[700px] h-[0px] border-2 border-gray-200" />
                  <div className="h-[145px] flex-col justify-center items-start gap-[23px] flex">
                    <div className="w-[700px] justify-between items-center flex">
                      <div
                        className={"w-[109.47px] text-sm font-normal font-pre"}
                      >
                        메인 이미지
                      </div>

                      <label htmlFor="mainImage">
                        <div
                          className={cn(
                            "bg-white dark:text-white rounded-sm dark:bg-zinc-800 border placeholder:text-neutral-300 text-black text-[14px] font-medium font-pre pl-2 border-neutral-300",
                            "w-[550px] h-[30px] cursor-pointer"
                          )}
                        />
                      </label>
                      <input
                        type="file"
                        id="mainImage"
                        className="hidden"
                        onChange={uploadToClient}
                      />
                    </div>
                    <div className="w-[700px] h-[0px] border-2 border-gray-200"></div>
                    <div className="justify-start items-center flex">
                      <div className="justify-start items-center gap-6 flex">
                        {image && <Tag title={image.name} />}
                      </div>
                    </div>
                    <div className="w-[700px] h-[0px] border-2 border-gray-200"></div>
                  </div>
                </div>

                <div className="text-center text-black text-[22px] mt-16 font-medium font-noto">
                  미리보기
                </div>
                <div className=" border border-gray-200 flex-col justify-center items-center gap-10 inline-flex ">
                  <div className="flex-col justify-center items-center gap-[20px] flex">
                    <div className="w-[940px] h-[46px] pr-[795px] pt-[15px] pb-4 border-b border-gray-200 justify-start items-center inline-flex">
                      <div className="self-stretch pl-[25px] justify-center items-center inline-flex">
                        <div className="text-black text-xs font-light font-noto uppercase">
                          2022-04-05 21:36:16
                        </div>
                      </div>
                    </div>
                    <div className="flex-col justify-center items-center flex">
                      <div className="w-[890px] text-black text-sm font-light font-pre uppercase tracking-wide whitespace-pre-wrap">
                        {inputs.description}
                      </div>
                    </div>
                  </div>
                  <img
                    className="w-[680px] h-[680px]"
                    src={
                      createObjectURL ?? "https://via.placeholder.com/680x680"
                    }
                  />

                  <div className="flex-col justify-center items-center flex border-0">
                    <div className="justify-start border-[0.5px] border-t-[1px] items-start inline-flex w-full">
                      <div
                        className="h-[46px] pr-[110px] pt-3.5 pb-[15px] bg-zinc-100 border-gray-200 justify-start items-center flex border-r
                      "
                      >
                        <div className="self-stretch pl-[25px] justify-center items-center inline-flex">
                          <div className="text-black text-sm font-light font-pre tracking-wider text-nowrap">
                            제목
                          </div>
                        </div>
                      </div>
                      <div className="w-[841px] h-[46px] pr-[664px] pt-[14.50px] pb-[15.50px] justify-start items-center flex">
                        <div className="self-stretch pl-[15px] justify-center items-center inline-flex ">
                          <div className="text-black text-[13px] font-normal font-noto uppercase ">
                            {inputs.title}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="  justify-start border-[0.5px] items-start inline-flex w-full">
                      <div className="pr-[95px] pt-3.5 pb-[15px] bg-zinc-100  justify-start items-center flex border-r">
                        <div className="self-stretch pl-[25px] justify-center items-center inline-flex ">
                          <div className="text-black text-sm font-light font-pre tracking-wider text-nowrap">
                            작성자
                          </div>
                        </div>
                      </div>
                      <div className="w-[841px] h-[46px] pr-[769px] pt-[14.50px] pb-[15.50px] justify-start items-center flex">
                        <div className="w-[841px] h-[46px] pr-[769px] pt-[14.50px] pb-[15.50px] justify-start items-center inline-flex">
                          <div className="self-stretch pl-[15px] justify-center items-center inline-flex">
                            <div className="text-black text-[13px] font-normal font-noto uppercase">
                              sumrov
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-col justify-start items-center gap-[15px] flex">
                  <div className="justify-center items-center gap-[25px] inline-flex"></div>
                </div>
              </div>
            </div>
          </div>
          {isLoading ? (
            <Button
              disabled
              className="w-[700px] h-[50px] px-[234px] py-[9px] bg-black justify-center items-center gap-2.5 inline-flex"
              onClick={postFetch}
            >
              <div className="text-center text-white text-base font-semibold font-pre">
                업로드
              </div>
            </Button>
          ) : (
            <Button
              className="w-[700px] h-[50px] px-[234px] py-[9px] bg-black justify-center items-center gap-2.5 inline-flex"
              onClick={postFetch}
            >
              <div className="text-center text-white text-base font-semibold font-pre">
                업로드
              </div>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

const StandardForm = React.forwardRef<
  React.ElementRef<"input">,
  React.ComponentPropsWithoutRef<"input">
>(({ title, className, ...props }, ref) => {
  return (
    <div className="w-[700px] justify-between items-center flex">
      <div className={"w-[109.47px] text-sm font-normal font-noto"}>
        {title}
      </div>

      <input
        className={cn(
          "bg-white dark:text-white rounded-sm dark:bg-zinc-800 border placeholder:text-neutral-300 text-black text-[11px] font-normal font-pre pl-2 border-neutral-300",
          className
        )}
        {...props}
      />
    </div>
  );
});
StandardForm.displayName = "StandardForm";

const Tag = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ title, ...props }, ref) => {
  return (
    <div className="justify-center items-center gap-[19px] flex h-[26px] px-2 border-[1px] rounded-md border-neutral-400">
      <Menu className="h-4 w-4" />
      <div className="text-neutral-600 text-[13px] font-bold font-pre">
        {title}
      </div>
      <div className="cursor-pointer" {...props}></div>
    </div>
  );
});
Tag.displayName = "Tag";

export default RegistrationPage;
