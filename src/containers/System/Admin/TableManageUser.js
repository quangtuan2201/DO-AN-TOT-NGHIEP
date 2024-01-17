import React, { useState, useEffect, memo, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import _, { divide } from "lodash";
import { LANGUAGES } from "../../../utils";
import "./TableManageUser.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "reactstrap";

function TableManageUser({ allUser, onDeleteUser, onUpdateUser, language }) {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const handlePageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  console.log("all user: ", allUser);
  const handlEditLanguage = (data, language) => {
    let checkLang = language === LANGUAGES.VI ? data?.valueVn : data?.valueEn;
    console.log("data: ", data);
    console.log("language: ", language);
    console.log("check type: ", typeof checkLang);
    return language === LANGUAGES.VI ? data?.valueVn : data?.valueEn;
  };
  const indexColumnBody = (rowData, props) => {
    return <>{props.rowIndex + 1}</>;
  };

  const actionBody = (user) => {
    return (
      <div>
        <Button
          className="px-2 mr-2 btn-primary"
          onClick={() => {
            console.log("user updatte: ", user);
            onUpdateUser(user);
          }}
        >
          <i className="fas fa-pencil-alt"></i>
        </Button>
        <Button className="px-2 btn-danger" onClick={() => onDeleteUser(user)}>
          <i className="fas fa-trash"></i>
        </Button>
      </div>
    );
  };
  return (
    <>
      <DataTable
        value={allUser}
        style={{ margin: 40 }}
        first={first}
        rows={rows}
        paginator // Bật chế độ phân trang
        paginatorPosition="bottom" // Hiển thị thanh phân trang ở cuối bảng
        onPage={handlePageChange}
      >
        <Column body={indexColumnBody} header="STT" />

        <Column
          sortable
          field="email"
          header={<FormattedMessage id="user-manage.email" />}
          filter
        />
        <Column
          sortable
          body={(rowData) => {
            return (
              <span>
                {rowData.firstName} {rowData.lastName}
              </span>
            );
          }}
          header={<FormattedMessage id="user-manage.fullName" />}
          filter
        />
        <Column
          sortable
          filter
          field="address"
          header={<FormattedMessage id="user-manage.address" />}
        />
        <Column
          sortable
          filter
          field="phoneNumber"
          header={<FormattedMessage id="user-manage.phoneNumber" />}
        />
        <Column
          sortable
          filter
          field={(rowData) =>
            language === LANGUAGES.VI
              ? rowData?.genderData && rowData.genderData.valueVn
              : rowData?.genderData && rowData.genderData.valueEn
          }
          header={<FormattedMessage id="user-manage.gender" />}
        />
        <Column
          sortable
          filter
          field={(rowData) =>
            language === LANGUAGES.VI
              ? rowData?.positionData && rowData.positionData.valueVn
              : rowData?.positionData && rowData.positionData.valueEn
          }
          header={<FormattedMessage id="user-manage.position" />}
        />
        <Column
          sortable
          filter
          field={(rowData) =>
            language === LANGUAGES.VI
              ? rowData?.roleData && rowData.roleData.valueVn
              : rowData?.roleData && rowData.roleData.valueEn
          }
          header={<FormattedMessage id="user-manage.role" />}
        />
        <Column
          header={<FormattedMessage id="user-manage.action" />}
          body={actionBody}
        />
      </DataTable>
    </>
  );
}
export default memo(TableManageUser);
