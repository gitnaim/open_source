// import { useEffect, useState } from "react";
// import ProductBanner from "./ProductBanner";
// import "./css/style.css";

// function App() {
//   let [state, setState] = useState({ error: null, isLoaded: false, data: [] });

//   useEffect(() => {
//     fetch(process.env.PUBLIC_URL + "/data/data.json")
//       .then((response) => response.json())
//       .then(
//         (result) => {
//           setState({
//             error: null,
//             isLoaded: true,
//             data: result.data,
//           });
//         },
//         (error) => {
//           setState({
//             error: null,
//             isLoaded: true,
//             error: error,
//           });
//         },
//       );
//   }, []);

//   let { error, isLoaded, data } = state;

//   if (error) {
//     return <div>Error : {error.message}</div>;
//   }

//   if (!isLoaded) {
//     return <div>Loading ...</div>;
//   } else {
//     return (
//       <div className="wrapper">
//         <ProductBanner propsValue={data} />
//       </div>
//     );
//   }
// }

// export default App;

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
    // Vite에서는 public 폴더의 데이터는 '/' 경로로 접근합니다.
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
