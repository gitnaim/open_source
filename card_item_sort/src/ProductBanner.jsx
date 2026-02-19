// import { useEffect, useState } from "react";

// function ProductBanner(props) {
//   let [number, setNumber] = useState(0);
//   let [data, setData] = useState(props.propsValue);

//   useEffect(() => {
//     let portfolio = document.getElementById("portfolio");
//     let content = portfolio.querySelector(".content");
//     let tabMenu = content.firstElementChild;
//     let tabMenuList = tabMenu.firstElementChild.children;

//     let tabN;
//     let bannerList = [];

//     for (let i = 0; i < tabMenuList.length; i++) {
//       tabMenuList[i].addEventListener("click", (e) => {
//         e.preventDefault();

//         if (i === tabN) return;
//         tabN = i;

//         if (e.currentTarget.id === "title") {
//           bannerList = data.sort((a, b) => {
//             if (a.title > b.title) return 1;
//             if (a.title < b.title) return -1;
//             return 0;
//           });
//         } else if (e.currentTarget.id === "date") {
//           bannerList = data.sort((a, b) => {
//             if (a.date > b.date) return 1;
//             if (a.date < b.date) return -1;
//             return 0;
//           });
//         }

//         for (let j = 0; j < tabMenuList.length; j++) {
//           if (j === tabN) {
//             tabMenuList[j].classList.add("active");
//           } else {
//             tabMenuList[j].classList.remove("active");
//           }
//         }

//         setNumber(number + 1);
//         setData(bannerList);
//       });
//     }
//   });

//   return (
//     <section id="portfolio">
//       <div className="inner">
//         <div className="title">
//           <h3>OUR PORTFOLIO</h3>
//         </div>
//         <div className="content clearfix">
//           <div className="tab_menu">
//             <ul>
//               <li id="title">
//                 <a href="">제목으로 정렬</a>
//               </li>
//               <li id="date">
//                 <a href="">날짜로 정렬</a>
//               </li>
//             </ul>
//           </div>
//           <div className="banner">
//             <ul>
//               {data.map((d, i) => (
//                 <li key={i + 1}>
//                   <a href="">
//                     <div className="photo">
//                       <img
//                         src={
//                           process.env.PUBLIC_URL + "/assets/images/" + d.image
//                         }
//                         alt={"Port" + (i + 1)}
//                       />
//                     </div>
//                     <div className="desc">
//                       <dl>
//                         <dt>{d.title}</dt>
//                         <dd>{d.sub}</dd>
//                       </dl>
//                     </div>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ProductBanner;

import { useState, useEffect } from "react";

function ProductBanner({ propsValue }) {
  // props로 받은 초기 데이터를 상태로 관리합니다.
  const [data, setData] = useState(propsValue);
  const [sortType, setSortType] = useState(""); // 현재 어떤 정렬인지 저장

  // propsValue가 바뀌면(데이터 로딩 완료 시) data 상태를 업데이트
  useEffect(() => {
    setData(propsValue);
  }, [propsValue]);

  const handleSort = (e, type) => {
    e.preventDefault();
    setSortType(type);

    // 데이터를 복사해서 정렬 (원본 보존)
    const sortedData = [...data].sort((a, b) => {
      if (type === "title") {
        return a.title.localeCompare(b.title); // 문자열 비교
      } else if (type === "date") {
        return new Date(a.date) - new Date(b.date); // 날짜 비교
      }
      return 0;
    });

    setData(sortedData);
  };

  return (
    <section id="portfolio">
      <div className="inner">
        <div className="title">
          <h3>CARD ITEM SORT</h3>
        </div>
        <div className="content clearfix">
          <div className="tab_menu">
            <ul>
              <li className={sortType === "title" ? "active" : ""}>
                <a href="#" onClick={(e) => handleSort(e, "title")}>
                  제목으로 정렬
                </a>
              </li>
              <li className={sortType === "date" ? "active" : ""}>
                <a href="#" onClick={(e) => handleSort(e, "date")}>
                  날짜로 정렬
                </a>
              </li>
            </ul>
          </div>
          <div className="banner">
            <ul>
              {data.map((d, i) => (
                <li key={i}>
                  <a href="">
                    <div className="photo">
                      {/* Vite에서는 경로를 /로 시작하면 public 폴더를 가리킵니다 */}
                      <img src={`/assets/images/${d.image}`} alt={d.title} />
                    </div>
                    <div className="desc">
                      <dl>
                        <dt>{d.title}</dt>
                        <dd>{d.sub}</dd>
                      </dl>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductBanner;
