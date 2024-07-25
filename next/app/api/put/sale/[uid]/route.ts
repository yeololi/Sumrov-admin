import { NextResponse } from "next/server";

interface res {
  PostNum: string;
  status: string;
}

export async function PUT(
  request: Request,
  { params }: { params: { uid: string } }
) {
  const res = (await request.json()) as res;
  const uid = params.uid;

  console.log(res);

  try {
    const result = await fetch("http://3.39.237.151:8080/sale/" + uid, {
      method: "PUT",
      body: JSON.stringify({ PostNum: res.PostNum, status: res.status }),
    }).then((r) => r.json());

    if (result) {
      return NextResponse.json({
        message: "상태가 성공적으로 변경 되었습니다.",
      });
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
