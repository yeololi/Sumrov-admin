import clientPromise from "@/util/database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const db = (await clientPromise).db("sumrov");
    let result = await db.collection("users").find().toArray();

    if (result) {
      return NextResponse.json(
        {
          results: result,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "서버 오류가 발생했습니다." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
  }
}
