import { useEffect, useState } from "react";
import ProductBanner from "./ProductBanner";
import "./css/style.css";

function App() {
  const [state, setState] = useState({
    error: null,
    isLoaded: false,
    data: [],
  });

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => {
        if (!response.ok) throw new Error("데이터를 불러오지 못했습니다.");
        return response.json();
      })
      .then(
        (result) => {
          setState({ error: null, isLoaded: true, data: result.data });
        },
        (error) => {
          setState({ error: error, isLoaded: true, data: [] });
        },
      );
  }, []);

  if (state.error) return <div>Error: {state.error.message}</div>;
  if (!state.isLoaded) return <div>Loading...</div>;

  return (
    <div className="wrapper">
      <ProductBanner propsValue={state.data} />
    </div>
  );
}

export default App;
