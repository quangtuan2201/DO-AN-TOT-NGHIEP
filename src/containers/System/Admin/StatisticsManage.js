import { useState, useEffect } from "react";
import "./StatisticsManage.scss";
import Select from "react-select";
import moment from "moment";
import DatePicker from "../../../components/Input/DatePicker";
import userService from "../../../services/userService";
import { dispatch } from "../../../redux";
import * as actions from "../../../store/actions";
import { useSelector } from "react-redux";
import { Bar, Doughnut } from "react-chartjs-2";
import { FormattedMessage, useIntl } from "react-intl";

const StatisticsManage = () => {
  const intl = useIntl();
  const [formData, setFormData] = useState({
    startDateTime: new Date(),
    endDateTime: new Date(),
    doctorId: "ALL",
  });
  const [statisticsData, setStatisticsData] = useState(null);
  const [doughnutChartData, setDoughnutChartData] = useState(null);

  const handleDateChange = (date, checkDate) => {
    // Chuyển đổi thành đối tượng Moment
    const momentObject = moment(date);
    if (!momentObject.isValid()) {
      // console.error("Invalid moment object: ", momentObject);
      return;
    } else {
      setFormData((pre) => ({
        ...pre,
        [checkDate]: date,
      }));
    }
  };
  const createDoughnutChartData = (data) => {
    if (data) {
      const total = data.S1 + data.S2 + data.S3 + data.S4;

      const doughnutChartData = {
        labels: ["Lịch hẹn mới", "Đã xác nhận", "Đã khám xong", "Đã Hủy"],
        datasets: [
          {
            data: [
              (data.S1 / total) * 100,
              (data.S2 / total) * 100,
              (data.S3 / total) * 100,
              (data.S4 / total) * 100,
            ],
            backgroundColor: ["#36A2EB", "#FFCE56", "#4CAF50", "#FF6384"],
          },
        ],
      };

      const options = {
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const total = dataset.data.reduce(
                (previousValue, currentValue) => previousValue + currentValue
              );
              const currentValue = dataset.data[tooltipItem.index];
              const percentage = ((currentValue / total) * 100).toFixed(2);
              return `${data.labels[tooltipItem.index]}: ${percentage}%`;
            },
          },
        },
      };

      setDoughnutChartData({ data: doughnutChartData, options: options });
    } else {
      setDoughnutChartData(null);
    }
  };

  // const createDoughnutChartData = (data) => {
  //   if (data) {
  //     const total = data.S1 + data.S2 + data.S3 + data.S4;

  //     const doughnutChartData = {
  //       labels: ["Lịch hẹn mới", "Đã xác nhận", "Đã khám xong", "Đã Hủy"],

  //       datasets: [
  //         {
  //           data: [
  //             (data.S1 / total) * 100,
  //             (data.S2 / total) * 100,
  //             (data.S3 / total) * 100,
  //             (data.S4 / total) * 100,
  //           ],
  //           backgroundColor: ["#36A2EB", "#FFCE56", "#4CAF50", "#FF6384"],
  //         },
  //       ],
  //     };

  //     // Tạo một mảng chứa các nhãn có dạng "10.00%"
  //     const percentageLabels = doughnutChartData.datasets[0].data.map(
  //       (value) => value.toFixed(2) + "%"
  //     );

  //     // Gán mảng nhãn đã tạo vào biểu đồ
  //     doughnutChartData.labels = percentageLabels;

  //     setDoughnutChartData(doughnutChartData);
  //   } else {
  //     setDoughnutChartData(null);
  //   }
  // };

  const handleSubmit = async (formData) => {
    var momentStartDate = moment(formData.startDateTime);
    var momentEndDate = moment(formData.endDateTime);

    // Format the date as "YYYY-MM-DD HH:mm:ss"
    var formatedStart = new Date(momentStartDate).getTime();
    var formatedEnd = new Date(momentEndDate).getTime();
    try {
      formData.startDateTime = formatedStart;
      formData.endDateTime = formatedEnd;
      const response = await userService.fetchGetStatisticalByDate(formData);
      if (response) {
        const chartData = {
          labels: ["Lịch hẹn mới", "Đã xác nhận", "Đã khám xong", "Đã Hủy"],
          datasets: [
            {
              data: [response.S1, response.S2, response.S3, response.S4],
              backgroundColor: ["#36A2EB", "#FFCE56", "#4CAF50", "#FF6384"],
            },
          ],
        };
        setStatisticsData(chartData);
        createDoughnutChartData(response);
      } else {
        setStatisticsData(null);
        setDoughnutChartData(null);
      }
    } catch (error) {
      console.error("fetch get statistical error ", error);
    }
  };
  const { allDoctors } = useSelector((state) => {
    return {
      allDoctors: state.doctor.AllDoctors,
    };
  });

  useEffect(() => {
    dispatch(actions.fetchGetAllDoctors());
  }, [dispatch]);

  return (
    <div className="container p-3 statistics-container">
      <h2 className="text-center">
        <FormattedMessage id="manage-statistical.statistical-title" />
      </h2>
      <div className="row">
        <div className="col-2">
          <label>
            <strong>
              <FormattedMessage id="manage-statistical.choose-doctor" />
            </strong>
          </label>
          <select
            class="form-control"
            onChange={(e) => {
              setFormData((pre) => ({
                ...pre,
                doctorId: e.target.value,
              }));
            }}
          >
            <option value="ALL">
              {intl.formatMessage({
                id: "manage-statistical.all",
              })}
            </option>
            <FormattedMessage id="manage-statistical.all" />

            {allDoctors &&
              allDoctors.length > 0 &&
              allDoctors.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {`${item.firstName} ${item.lastName}`}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="col-2">
          <label>
            <strong>
              <FormattedMessage id="manage-statistical.choose-start-date" />
            </strong>
          </label>
          <DatePicker
            className="form-control"
            onChange={(e) => {
              handleDateChange(e[0], "startDateTime");
            }}
            value={formData?.startDateTime}
          />
        </div>
        <div className="col-2">
          <label>
            <strong>
              <FormattedMessage id="manage-statistical.choose-end-date" />
            </strong>
          </label>
          <DatePicker
            className="form-control"
            minDate={formData?.startDateTime}
            onChange={(e) => {
              handleDateChange(e[0], "endDateTime");
            }}
            value={formData?.endDateTime}
          />
        </div>
        <div className="col-2 ">
          <button
            className="btn btn-danger pl-2 pr-2 mt-3 "
            data-toggle="button"
            onClick={() => {
              handleSubmit(formData);
            }}
          >
            <FormattedMessage id="manage-statistical.submit" />
          </button>
        </div>
        <div className="col-12 mt-5">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Nguyễn</td>
                <td>Tuấn Anh</td>
                <td>Confirm</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-12 mt-5">
          <div className="row text-center">
            <div className="col-7">
              <h5>
                <FormattedMessage id="manage-statistical.column-chart" />
              </h5>
              {statisticsData ? (
                <Bar data={statisticsData} />
              ) : (
                <p className="text-danger">
                  <FormattedMessage id="manage-statistical.appointment" />
                </p>
              )}
            </div>
            <div className="col-4">
              <h5>
                <FormattedMessage id="manage-statistical.pie-chart" />
              </h5>
              {doughnutChartData ? (
                <Doughnut
                  data={doughnutChartData.data}
                  options={doughnutChartData.options}
                />
              ) : (
                <p className="text-danger">
                  <FormattedMessage id="manage-statistical.appointment" />
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsManage;
