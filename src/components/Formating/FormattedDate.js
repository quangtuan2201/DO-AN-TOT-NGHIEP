import React, { Component } from "react";
import moment from "moment";

/** For valid format please see <a href="https://momentjs.com/docs/#/displaying/">Moment format options</a> */
const dateFormat = "DD/MM/YYYY";
function FormattedDate({ format, value, ...otherProps }) {
  var dFormat = format ? format : dateFormat;
  const formattedValue = value ? moment.utc(value).format(dFormat) : null;
  return <span {...otherProps}>{formattedValue}</span>;
}
export default FormattedDate;
