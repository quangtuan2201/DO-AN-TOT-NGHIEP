import { memo, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import userService from "../../../../services/userService";
import { Link } from "react-router-dom";
import "./Search.scss";
import HomeHeader from "../../HomeHeader";
import { LANGUAGES } from "../../../../utils";
import { useSelector } from "react-redux";
import _ from "lodash";

const Search = () => {
  const intl = useIntl();
  const [dataSpecialty, setDataSpecialty] = useState([]);
  const [dataClinic, setDataClinic] = useState([]);
  const [dataDoctor, setDataDoctor] = useState([]);
  const [notResult, setNotResult] = useState("");
  const [keyword, setKeyword] = useState("");
  const { language } = useSelector((state) => {
    return {
      language: state.app.language,
    };
  });

  const handleGetResultSearch = async () => {
    try {
      const results = await userService.fetchGetResultSearch(keyword);
      if (results) {
        setDataClinic(null); // Reset clinic data
        setDataSpecialty(null); // Reset specialty data
        setDataDoctor(null);

        results.forEach((item) => {
          if (item.type === "clinic") {
            setDataClinic(item);
          } else if (item.type === "specialty") {
            setDataSpecialty(item);
          } else if (item.type === "doctor") {
            setDataDoctor(item);
          }
        });
      } else {
        console.error("get result search fail:");
        setDataClinic(null); // Reset clinic data on failure
        setDataSpecialty(null); // Reset specialty data on failure
        setDataDoctor(null); // Reset specialty data on failure
        setNotResult(<FormattedMessage id="banner.search.no-result" />);
      }
    } catch (error) {
      setNotResult(<FormattedMessage id="banner.search.no-result" />);
      console.error("Fetch result search fail " + error.message);
    }
  };
  const handlOnChangeInputSearch = (keyword) => {
    setKeyword(keyword);
    if (keyword === "") {
      setDataSpecialty(null);
      setDataClinic(null);
      setDataDoctor(null);
    }
  };
  useEffect(() => {
    if (!keyword) {
      return;
    }
    handleGetResultSearch();
  }, [keyword, language]);
  const getFullNameDoctor = (item) => {
    let checkLang = language === LANGUAGES.VI;
    return checkLang
      ? `${item.positionData.valueVn} ${item.lastName} ${item.firstName}`
      : `${item.positionData.valueEn} ${item.firstName} ${item.lastName} `;
  };
  return (
    <>
      <div className="header-search">
        <HomeHeader />
      </div>
      <div className="search">
        <input
          type="text"
          placeholder={intl.formatMessage({ id: "banner.searchInput" })}
          onChange={(e) => {
            handlOnChangeInputSearch(e.target.value);
          }}
        />
        <i className="fas fa-search"></i>
      </div>
      <div className="result-search">
        <div className="result-search-specialty">
          {!_.isEmpty(dataSpecialty) && (
            <table className="table table-sm  table-hover ">
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="banner.search.speciality" />
                  </th>
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
          {!_.isEmpty(dataClinic) && (
            <table className="table table-sm  table-hover">
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="banner.search.clinic" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataClinic?.result.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>
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
        <div className="result-search-doctor">
          {!_.isEmpty(dataDoctor) && (
            <table className="table table-sm  table-hover">
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="banner.search.doctor" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataDoctor?.result.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>
                          <Link to={`/detail-doctors/${item.id}`}>
                            {getFullNameDoctor(item)}
                          </Link>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          )}

          {!dataDoctor && !dataSpecialty && !dataClinic ? (
            <div className="text-danger">{notResult}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
export default memo(Search);
