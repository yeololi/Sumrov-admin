interface res {
  title: string;
  price: string;
  sale: number;
  description: string;
  category: string;
  size: string[];
  color: string[];
  mainImage: string;
  detailImage: string[];
}

export async function POST(request: Request) {
  const res = (await request.json()) as res;

  console.log(res);

  try {
    const result = await fetch(`http://3.39.237.151:8080/post`, {
      method: "POST",
      body: JSON.stringify(res),
    });
    // const user = await result.json();

    console.log(result);

    if (result) {
    } else {
      return new Response("failed read body", { status: 404 });
    }
    return new Response("User has registered", { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
