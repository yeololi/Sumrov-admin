interface res {
  title: string;
  description: string;
  image: string[];
}

export async function POST(request: Request) {
  const res = (await request.json()) as res;

  console.log(res);

  try {
    const result = await fetch(`http://3.39.237.151:8080/notice`, {
      method: "POST",
      body: JSON.stringify(res),
    });
    const user = await result.json();

    if (user) {
      return new Response("User has registered", { status: 200 });
    } else {
      return new Response("failed read body", { status: 404 });
    }
  } catch (error) {
    console.error(error);
  }
}
