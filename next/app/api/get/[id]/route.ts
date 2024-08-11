import clientPromise from "@/util/database";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const uid = params.id;

  try {
    const db = (await clientPromise).db("sumrov");
    let result = await db
      .collection("users")
      .findOne({ _id: new ObjectId(uid) });

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
