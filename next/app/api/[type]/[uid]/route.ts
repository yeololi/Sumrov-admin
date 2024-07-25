export async function GET(
  request: Request,
  { params }: { params: { type: string; uid: string } }
) {
  try {
    const result = await fetch(
      params.type === "notice"
        ? `http://3.39.237.151:8080/${params.type}/${params.uid}`
        : `http://3.39.237.151:8080/${params.type}/uuid/${params.uid}`,
      {
        method: "GET",
        cache: "no-store",
      }
    ).then((r) => r.json());
    console.log(result);
    if (result) {
    } else {
      return new Response("failed read body", { status: 404 });
    }
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
