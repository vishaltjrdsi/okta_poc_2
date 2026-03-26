import axios from "axios";

export const fetchConfigs = async () => {
  const res = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const transformedData = res.data.map((item) => ({
    id: item.id,
    title: item.title,
    body: item.body,
    status: true,
  }));

  return { data: transformedData };
};