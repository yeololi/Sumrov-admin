const FetchData = async (): Promise<any> => {
  try {
    const response = await fetch(
      "http://3.39.237.151:8080/sale/91279335-9e2e-46de-a336-0a35ec267b43",
      { method: "GET", cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export default FetchData;
