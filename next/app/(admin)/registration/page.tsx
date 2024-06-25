"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Menu, Minus, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";

const initialTagsState = {
  size: [],
  color: [],
  mainImage: [],
  detailImage: [],
};

const initialInputsState = {
  title: "",
  price: "",
  sale: "",
  description: "",
  category: "top",
};

const yes = true;

const RegistrationPage = () => {
  const router = useRouter();

  const [tags, setTags] = useState<{
    size: string[];
    color: string[];
    mainImage: File[];
    detailImage: File[];
  }>(initialTagsState);

  const [inputs, setInputs] = useState(initialInputsState);

  const [isLoading, setIsLoading] = useState(false);
  const [createObjectURL, setCreateObjectURL] = useState<{
    [key: string]: string;
  } | null>(null);

  const postFetch = async () => {
    setIsLoading(() => true);

    const uploadPromises = ["", "", "", ""].map(async (element, i) => {
      const formData = new FormData();
      if (i == 3) {
        formData.append("file", tags.mainImage[0]);
      } else {
        formData.append("file", tags.detailImage[i]);
      }

      const res = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      }).then((r) => r.json());
      // console.log(res);
      const fileName = encodeURIComponent(res.fileName);
      return `https://sumrovbucket.s3.ap-northeast-2.amazonaws.com/${fileName}`;
    });

    try {
      const uploadedFiles = await Promise.all(uploadPromises);

      // console.log(uploadedFiles);

      const body = {
        title: inputs.title,
        price: inputs.price,
        sale: parseInt(inputs.sale),
        description: inputs.description,
        category: inputs.category,
        size: tags.size,
        color: tags.color,
        main_image: uploadedFiles[3],
        detail_images: uploadedFiles.slice(0, 3),
      };

      // console.log(body);

      const res = await fetch("/api/post/new", {
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

  const handleTagOperation = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    operation: "add" | "remove"
  ) => {
    const inputElement = e.currentTarget
      .previousElementSibling as HTMLInputElement;

    const id = e.currentTarget.id as keyof typeof tags;
    const value = inputElement.value;

    if (operation === "add") {
      setTags((prevTags) => ({ ...prevTags, [id]: [value, ...prevTags[id]] }));
      inputElement.value = "";
    } else if (operation === "remove") {
      setTags((prevTags) => ({
        ...prevTags,
        [id]: (prevTags[id] as Array<string | File>).filter(
          (tag: string | File) =>
            (tag instanceof File ? tag.name : tag) !== inputElement.innerText
        ),
      }));

      if (createObjectURL && inputElement.innerText) {
        const fileArray = tags[id] as File[];
        const foundFile = fileArray
          ? fileArray.find((file: File) => file.name === inputElement.innerText)
          : undefined;
        if (foundFile) {
          console.log(foundFile.name);
          URL.revokeObjectURL(createObjectURL[foundFile.name]);
        }
      }
    }
  };

  const addTag: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    handleTagOperation(e, "add");
  };

  const removeTag: React.MouseEventHandler<HTMLDivElement> = (e) => {
    handleTagOperation(e, "remove");
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [id]: value }));
  };

  const uploadToClient: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const id = e.target.id as keyof typeof tags;

    // if (createObjectURL) {
    //   URL.revokeObjectURL(createObjectURL);
    // }

    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];

      setTags((prevTags) => ({
        ...prevTags,
        [id]: [i, ...prevTags[id]],
      }));

      setCreateObjectURL((pre) => ({
        ...pre,
        [i.name]: URL.createObjectURL(i),
      }));
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
              상품 등록
            </div>
          </div>
        </div>
        <div className="flex-col justify-start items-center gap-[74px] flex">
          <div className="border border-stone-300 border-t-0 flex-col justify-center items-center flex">
            <div className="flex-col justify-center items-center gap-[100px] flex mt-[48px]">
              <div className="w-[700px] flex-col justify-center items-center gap-[50px] flex">
                <div className="w-[700px] flex-col justify-between items-center flex">
                  <div className="w-[700px] justify-between items-center inline-flex">
                    <div className="text-black text-sm font-normal font-pre">
                      카테고리
                    </div>
                    <RadioGroup
                      defaultValue="top"
                      className="h-[35px] justify-center items-center gap-6 flex"
                      onValueChange={(value) => {
                        console.log(value);
                        setInputs((preInputs) => ({
                          ...preInputs,
                          category: value,
                        }));
                      }}
                    >
                      <div className="h-[35px] pt-[5px] pb-1.5 justify-center items-center flex">
                        <div className="grow shrink basis-0 self-stretch px-3 justify-start items-center gap-3 inline-flex">
                          <RadioGroupItem
                            id="top"
                            value="top"
                            className="w-6 h-6"
                          />
                          <Label
                            htmlFor="top"
                            className="text-black text-sm font-normal font-pre cursor-pointer"
                          >
                            TOP
                          </Label>
                        </div>
                      </div>
                      <div className="p-[0.50px] justify-center items-center flex">
                        <div className="self-stretch px-3 justify-start items-center gap-3 inline-flex">
                          <RadioGroupItem
                            id="bottom"
                            value="bottom"
                            className="w-6 h-6"
                          />
                          <Label
                            htmlFor="bottom"
                            className="text-black text-sm font-normal font-pre cursor-pointer"
                          >
                            BOTTOM
                          </Label>
                        </div>
                      </div>
                      <div className="pr-3 pt-[5px] pb-1.5 justify-start items-center flex">
                        <div className="self-stretch px-3 justify-start items-center gap-3 inline-flex">
                          <RadioGroupItem
                            id="acc"
                            value="acc"
                            className="w-6 h-6"
                          />
                          <Label
                            htmlFor="acc"
                            className="text-black text-sm font-normal font-pre cursor-pointer"
                          >
                            ACC
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="h-[438px] flex-col justify-start items-start gap-6 mt-6 flex">
                    <StandardForm
                      value={inputs.title}
                      id="title"
                      onChange={onChange}
                      title="상품명"
                      className="w-[550px] h-[30px]"
                    />

                    <StandardForm
                      value={inputs.price}
                      id="price"
                      onChange={onChange}
                      title="가격"
                      className="w-[550px] h-[30px]"
                    />
                    <StandardForm
                      value={inputs.sale}
                      id="sale"
                      onChange={onChange}
                      title="할인 정보"
                      className="w-[550px] h-[30px]"
                      placeholder="(상품)"
                    />

                    <div className="w-[700px] justify-between items-center flex">
                      <div
                        className={"w-[109.47px] text-sm font-normal font-pre"}
                      >
                        상세 정보
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
                  </div>
                </div>
                <div className="w-[700px] h-[0px] border-2 border-gray-200"></div>
                <div className="h-[145px] flex-col justify-center items-start gap-[23px] flex">
                  <ActiveForm
                    id="size"
                    title="사이즈 옵션"
                    className="w-[500px] h-[30px]"
                    onClick={addTag}
                  />
                  <div className="w-[700px] h-[0px] border-2 border-gray-200"></div>
                  <div className="justify-start items-center flex">
                    <div className="justify-start items-center gap-6 flex">
                      {tags.size.map((sizes, i) => (
                        <Tag
                          onClick={removeTag}
                          title={sizes}
                          key={i}
                          id="size"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="w-[700px] h-[0px] border-2 border-gray-200"></div>
                </div>
                <div className="h-[145px] flex-col justify-center items-start gap-[23px] flex">
                  <ActiveForm
                    id="color"
                    title="색상 옵션"
                    className="w-[500px] h-[30px]"
                    onClick={addTag}
                  />
                  <div className="w-[700px] h-[0px] border-2 border-gray-200"></div>
                  <div className="justify-start items-center flex">
                    <div className="justify-start items-center gap-6 flex">
                      {tags.color.map((colors, i) => (
                        <Tag
                          onClick={removeTag}
                          title={colors}
                          key={i}
                          id="color"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="w-[700px] h-[0px] border-2 border-gray-200"></div>
                </div>
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
                      {tags.mainImage.map((mainImages, i) => (
                        <Tag
                          onClick={removeTag}
                          title={mainImages.name}
                          key={i}
                          id="mainImage"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="w-[700px] h-[0px] border-2 border-gray-200"></div>
                </div>
                <div className="h-[145px] flex-col justify-center items-start gap-[23px] flex">
                  <div className="w-[700px] justify-between items-center flex">
                    <div
                      className={"w-[109.47px] text-sm font-normal font-pre"}
                    >
                      상세 이미지
                    </div>

                    <div className="">
                      <label htmlFor="detailImage">
                        <div
                          className={cn(
                            "bg-white dark:text-white rounded-sm dark:bg-zinc-800 border placeholder:text-neutral-300 text-black text-[14px] font-medium font-pre pl-2 border-neutral-300",
                            "w-[550px] h-[30px] cursor-pointer"
                          )}
                        />
                      </label>
                      <input
                        type="file"
                        id="detailImage"
                        className="hidden"
                        onChange={uploadToClient}
                      />
                    </div>
                  </div>
                  <div className="w-[700px] h-[0px] border-2 border-gray-200"></div>
                  <div className="justify-start items-center flex">
                    <div className="justify-start items-center gap-6 flex">
                      {tags.detailImage.map((imaegs, i) => (
                        <Tag
                          onClick={removeTag}
                          title={imaegs.name}
                          key={i}
                          id={"detailImage"}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="w-[700px] h-[0px] border-2 border-gray-200"></div>
                </div>
              </div>
              <div className="flex-col justify-center items-center gap-[74px] flex pb-10">
                <div className="text-center text-black text-[22px] font-medium font-pre">
                  미리보기
                </div>
                <div className="flex-col justify-start items-center gap-[15px] flex">
                  <div className="justify-center items-center gap-[25px] inline-flex">
                    {createObjectURL && tags.mainImage[0] ? (
                      <img
                        className="w-[550px] h-[733.33px]"
                        src={createObjectURL[tags.mainImage[0].name]}
                      />
                    ) : (
                      <img
                        className="w-[550px] h-[733.33px]"
                        src={"https://via.placeholder.com/550x733"}
                      />
                    )}
                    <div className="w-[550px] h-[733px] flex-col justify-center items-center gap-[50px] inline-flex">
                      <div className="flex-col justify-start items-start gap-5 flex">
                        <div className="flex-col justify-start items-start gap-2.5 flex">
                          <div className="text-black dark:text-neutral-50 text-xl font-medium font-pre">
                            {inputs.title}
                          </div>
                        </div>
                        <div className="flex-col justify-start items-start gap-[50px] flex">
                          <div className="text-black dark:text-neutral-50 text-sm font-normal font-pre">
                            {!isNaN(parseInt(inputs.price))
                              ? new Intl.NumberFormat("ko-KR", {
                                  style: "currency",
                                  currency: "KRW",
                                }).format(parseInt(inputs.price))
                              : ""}
                          </div>
                          <div className="flex-col justify-start items-start gap-[30px] flex">
                            <div className="w-[421px] text-neutral-600 dark:text-zinc-100 text-xs font-light font-pre whitespace-pre-wrap">
                              {inputs.description}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={cn(
                          "flex-col justify-center items-center gap-[75px] flex",
                          yes && "gap-[30px]"
                        )}
                      >
                        <div className="flex-col justify-center items-end gap-[15px] flex">
                          <div className="w-[318px] justify-between items-center inline-flex">
                            <div className="text-neutral-400 dark:text-zinc-100 text-[11px] font-normal font-pre">
                              색상
                            </div>
                            <Select>
                              <SelectTrigger className="dark:bg-neutral-900 dark:text-stone-300 rounded-sm w-60 h-[26px] text-neutral-600 text-[11px] font-normal font-pre">
                                <SelectValue placeholder="-[필수] 옵션을 선택해 주세요-" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {tags.color.map((colors, i) => (
                                    <SelectItem value={colors} key={i}>
                                      {colors}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="justify-center items-center gap-[50px] inline-flex">
                            <div className="text-neutral-400 dark:text-zinc-100 text-[11px] font-normal font-pre">
                              사이즈
                            </div>
                            <Select>
                              <SelectTrigger className="dark:bg-neutral-900 dark:text-stone-300 rounded-sm w-60 h-[26px] text-neutral-600 text-[11px] font-normal font-pre">
                                <SelectValue placeholder="-[필수] 옵션을 선택해 주세요-" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {tags.size.map((sizes, i) => (
                                    <SelectItem value={sizes} key={i}>
                                      {sizes}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        {yes && (
                          <>
                            <div className="w-[299px] flex mt-3 flex-col">
                              <div className="flex flex-col">
                                <div className="text-neutral-600 dark:text-neutral-50 text-[10px] font-normal font-pre">
                                  {inputs.title}
                                </div>
                                <div className="text-neutral-600 dark:text-neutral-50 text-[10px] font-normal font-pre">
                                  -색/사이즈
                                </div>
                              </div>
                              <div className="text-black dark:text-white text-[11px] font-semibold font-pre flex justify-end w-full">
                                {new Intl.NumberFormat("ko-KR", {
                                  style: "currency",
                                  currency: "KRW",
                                }).format(parseInt(inputs.price))}
                              </div>
                              <div className="flex gap-1">
                                <input
                                  placeholder="1"
                                  className="text-[10px] font-normal font-pre w-[37px] h-[18px] pl-2 rounded-sm border border-neutral-300 dark:bg-neutral-900"
                                />

                                <div className="w-[18px] h-[18px]">
                                  <Plus className="w-[18px] h-[18px] dark:text-black bg-neutral-300 rounded-sm" />
                                </div>
                                <div className="w-[18px] h-[18px]">
                                  <Minus className="w-[18px] h-[18px] dark:text-black bg-neutral-300 rounded-sm" />
                                </div>
                              </div>
                            </div>
                            <div className="w-[299px] h-3.5 justify-center items-start gap-[167px] inline-flex">
                              <div className="dark:text-white text-[11px] font-semibold font-pre">
                                총상품금액
                              </div>
                              <div className="w-[84px] flex justify-center items-center">
                                <div className="text-blue-500 text-[11px] font-semibold font-pre">
                                  {new Intl.NumberFormat("ko-KR", {
                                    style: "currency",
                                    currency: "KRW",
                                  }).format(1 * parseInt(inputs.price))}
                                </div>
                                <div className="text-blue-500 text-[10px] font-normal font-pre">
                                  ({1}개)
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        <div className="flex-col justify-start items-start gap-2.5 flex">
                          <Button className="rounded-none hover:bg-neutral-900 w-[315px] h-[41px] py-3.5 bg-neutral-900 dark:bg-zinc-600 justify-center items-center inline-flex">
                            <div className="text-neutral-50 text-[11px] font-medium font-body">
                              Buy it Now
                            </div>
                          </Button>
                          <div className="w-[315px] h-[41px] py-3.5 border border-neutral-900 dark:border-zinc-600 justify-center items-center inline-flex">
                            <div className="text-black dark:text-neutral-50 text-[11px] font-medium font-body">
                              Add to Cart
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-col justify-start items-start gap-10 flex">
                    {createObjectURL &&
                    tags.detailImage[0] &&
                    tags.detailImage[1] &&
                    tags.detailImage[2] ? (
                      <>
                        <img
                          className="w-[550px] h-[733.33px]"
                          src={createObjectURL[tags.detailImage[0].name]}
                        />
                        <img
                          className="w-[550px] h-[733.33px]"
                          src={createObjectURL[tags.detailImage[1].name]}
                        />
                        <img
                          className="w-[550px] h-[733.33px]"
                          src={createObjectURL[tags.detailImage[2].name]}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          className="w-[550px] h-[733.33px]"
                          src="https://via.placeholder.com/550x733"
                        />
                        <img
                          className="w-[550px] h-[733.33px]"
                          src="https://via.placeholder.com/550x733"
                        />
                        <img
                          className="w-[550px] h-[733.33px]"
                          src="https://via.placeholder.com/550x733"
                        />
                      </>
                    )}
                  </div>
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
      <div className={"w-[109.47px] text-sm font-normal font-pre "}>
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

const ActiveForm = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button">
>(({ title, className, value, children, ...props }, ref) => {
  return (
    <div className="w-[700px] justify-between items-center flex">
      <div className={"w-[109.47px] text-sm font-normal font-pre "}>
        {title}
      </div>
      <input
        className={cn(
          "bg-white dark:text-white rounded-sm dark:bg-zinc-800 border placeholder:text-neutral-300 text-black text-[14px] font-medium font-pre pl-2 border-neutral-300",
          className
        )}
      />
      <Button
        variant={"ghost"}
        className="h-[26px] font-pre  hover:bg-inherit active:hover:bg-inherit"
        {...props}
      >
        추가
      </Button>
    </div>
  );
});
ActiveForm.displayName = "ActiveForm";

const Tag = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ title, className, ...props }, ref) => {
  return (
    <div className="justify-center items-center gap-[19px] flex h-[26px] px-2 border-[1px] rounded-md border-neutral-400">
      <Menu className="h-4 w-4" />
      <div className="text-neutral-600 text-[13px] font-bold font-pre">
        {title}
      </div>
      <div className={cn("cursor-pointer", className)} {...props}>
        <X className="h-4 w-4" />
      </div>
    </div>
  );
});
Tag.displayName = "Tag";

export default RegistrationPage;
