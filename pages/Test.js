import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Test = () => {
  const { query, isReady } = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  //   console.log(query);

  useEffect(() => {
    if (!isReady) return;
    console.log(query.product);
    fetch(`https://jsonplaceholder.typicode.com/todos/${query.product}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(null);
      });
  }, [isReady, query.product]);

  if (loading) return <p>loading...</p>;
  if (!loading && data) return <p>This is data: {data.title}</p>;

  return <h1>What is this </h1>;
};

export default Test;
