const FetchData = async (uid: string): Promise<any> => {
  try {
    const response = await fetch("/api/sale/" + uid, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

const FetchData2 = async (uid: string): Promise<any> => {
  try {
    const response = await fetch("/api/get/" + uid, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export { FetchData, FetchData2 };
