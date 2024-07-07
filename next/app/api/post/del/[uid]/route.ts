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

export async function DELETE(
  request: Request,
  { params }: { params: { uid: string } }
) {
  const uid = params.uid;

  try {
    const result = await fetch(`http://3.39.237.151:8080/post/${uid}`, {
      method: "DELETE",
    }).then((r) => r.json());
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
