import { useState, useEffect } from "react";

function ProductBanner({ propsValue }) {
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("title");

  useEffect(() => {
    if (propsValue && propsValue.length > 0) {
      const initialSortedData = [...propsValue].sort((a, b) =>
        a.title.localeCompare(b.title),
      );
      setData(initialSortedData);
    }
  }, [propsValue]);

  const handleSort = (e, type) => {
    e.preventDefault();
    setSortType(type);

    const sortedData = [...data].sort((a, b) => {
      if (type === "title") {
        return a.title.localeCompare(b.title);
      } else if (type === "date") {
        return new Date(a.date) - new Date(b.date);
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
