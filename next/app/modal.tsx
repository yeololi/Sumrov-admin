"use client";
import { cn } from "@/lib/utils";
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react";

const password: string = "1213";

export default function Modal() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [value, setValue] = useState("");

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setValue(event.target.value);
    };

    const checkAdmin = () => {
        if (value == password) {
            setIsAdmin((value) => !value);
        } else {
            window.alert("비밀번호가 맞지 않습니다.");
        }
    };

    return (
        <div
            id="myPopup"
            className={cn(
                "flex justify-center items-center fixed z-10 left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)]",
                isAdmin && "hidden",
            )}
        >
            <div
                className={
                    "bg-[#fefefe] p-[30px] border-[1px] border-[#888] w-[300px] text-center rounded-[30px]"
                }
            >
                <h2 className="text-lg font-semibold">비밀번호 입력</h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        checkAdmin();
                    }}
                >
                    <input
                        className={
                            "border-2 rounded-[0.3rem] bg-white outline-none px-4 py-2 mt-2"
                        }
                        type="password"
                        id="passwordField"
                        value={value}
                        placeholder="비밀번호 입력"
                        onChange={onChange}
                    />

                    <button
                        type="submit"
                        className="m-2 border-none rounded-[5px] p-2.5 bg-[#9575de] text-white font-semibold text-[16px] transition-all duration-150 ease-linear hover:scale-[1.1]"
                    >
                        확인
                    </button>
                </form>
            </div>
        </div>
    );
}
