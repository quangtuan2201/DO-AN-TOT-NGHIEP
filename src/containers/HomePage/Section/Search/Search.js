import { memo, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import userService from "../../../../services/userService";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Search.scss";
// import { constant } from "../../../../";

const Search = () => {
  const intl = useIntl();
  const [dataSpecialty, setDataSpecialty] = useState([]);
  const [dataClinic, setDataClinic] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [keyword, setKeyword] = useState("");
  const handleBlur = () => {
    console.log("Chuột rời khỏi trường input");
    // Thêm logic xử lý khi chuột rời khỏi trường input ở đây
  };
  const handleGetResultSearch = async () => {
    console.log("Submit keyword current: ", keyword);
    try {
      const results = await userService.fetchGetResultSearch(keyword);
      console.log("kết quả tìm kiếm: ", results);
      if (results) {
        setDataSearch(results);
        setDataClinic(null); // Reset clinic data
        setDataSpecialty(null); // Reset specialty data

        results.forEach((item) => {
          if (item.type === "clinic") {
            console.log("isClinic", item);
            setDataClinic(item);
          } else if (item.type === "specialty") {
            setDataSpecialty(item);
          }
        });
      } else {
        console.log("===>>>> fail: ", results);
        console.error("get result search fail:");
        setDataSearch([]);
        setDataClinic(null); // Reset clinic data on failure
        setDataSpecialty(null); // Reset specialty data on failure
      }
    } catch (error) {
      console.error("Fetch result search " + error.message);
    }
  };
  const handlOnChangeInputSearch = (keyword) => {
    console.log("keyword: ", keyword);
    setKeyword(keyword);
    if (keyword === "") {
      setDataSpecialty([]);
      setDataClinic([]);
    }
  };
  useEffect(() => {
    if (!keyword) {
      return;
    }

    handleGetResultSearch();
  }, [keyword]);
  console.log("dataSearch: ", dataSearch);
  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder={intl.formatMessage({ id: "banner.searchInput" })}
          onChange={(e) => {
            handlOnChangeInputSearch(e.target.value);
          }}
          onBlur={handleBlur}
        />
        <i className="fas fa-search"></i>
      </div>
      <div className="result-search">
        <div className="result-search-specialty">
          {dataSpecialty && dataSpecialty?.result?.length > 0 && (
            <table className="table table-sm  table-hover ">
              <thead>
                <tr>
                  <th>Chuyên khoa</th>
                </tr>
              </thead>
              <tbody>
                {dataSpecialty?.result.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>
                          <Link to={`/detail-specialty/${item.id}`}>
                            {item.name}
                          </Link>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="result-search-clinic">
          {dataClinic && dataClinic?.result?.length > 0 && (
            <table className="table table-sm  table-hover">
              <thead>
                <tr>
                  <th>Phòng khám</th>
                </tr>
              </thead>
              <tbody>
                {dataClinic?.result.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>
                          {" "}
                          <Link to={`/detail-clinic/${item.id}`}>
                            {item.name}
                          </Link>{" "}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
export default memo(Search);
