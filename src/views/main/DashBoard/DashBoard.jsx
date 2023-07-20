import { Translation } from "react-i18next";
import { CCard, CCardBody } from "@coreui/react";
import { useEffect, useRef, useState } from "react";
import { MenuItem, TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Doughnut, Line } from "react-chartjs-2";
import {
  isValid,
  addDays,
  getISOWeek,
  eachWeekOfInterval,
  startOfWeekYear,
} from "date-fns";
import { BsSearch } from "react-icons/bs";

import "./DashBoard.styles.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import i18next from "i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const componentID = "Dashboard",
  languageResource = {
    GroupBy: "Nhóm theo",
    Statistical: "Thống kê công việc",
    RemainingJob: "Công việc còn lại",
    NewJob: "Chưa bắt đầu",
    DoingJob: "Đang thực hiện",
    LateJob: "Muộn",
    CompleteJob: "Đã hoàn thành",
    SearchBy: "Tìm kiếm theo",
    WorkToday: "Công viêc ngày hôm nay",
    WorkByDayWeeekMonthQuarterYear:
      "Công việc theo ngày, tuần, tháng, quý, năm",
    Days: "Ngày",
    Weeks: "Tuần",
    Months: "Tháng",
    Precious: "Quý",
    Years: "Năm",
    GeneralConfiguration_StartDay: "Ngày bắt đầu",
    GeneralConfiguration_EndDay: "Ngày kết thúc",
    GeneralConfiguration_Search: "Tìm kiếm",
  },
  //dataDoughnut: dữ liệu biểu đồ hình tròn
  dataDoughnut = {
    labels: ["Chưa bắt đầu", "Đang thực hiện", "Đã hoàn thành"],
    datasets: [
      {
        data: [9, 22, 128],
        backgroundColor: ["#6279fc", "#1ee0ac", "#9455c4"],
      },
    ],
  },
  options = {
    responsive: true,
    plugins: {
      legend: {
        position: "none",
      },
    },
    centerText: {
      display: true,
      number: `20`,
      content: "Tổng số đơn nhập",
    },
  },
  plugins = [
    {
      afterDraw: function (chart) {
        const width = chart.width,
          height = chart.height,
          ctx = chart.ctx;

        ctx.restore();
        //toFixed(2): giữ lại 2 số thập phân sau dấu .
        const fontSize = (height / 150).toFixed(2);
        ctx.font = fontSize + "em sans-serif ";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "steelblue";

        const text = chart.config.options.centerText.number,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = (height - 10) / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();

        const ctx2 = chart.ctx;

        ctx2.restore();
        const fontSize2 = (height / 250).toFixed(2);
        ctx2.font = fontSize2 + "em sans-serif";
        ctx2.textBaseline = "middle";

        const text2 = chart.config.options.centerText.content,
          textX2 = Math.round((width - ctx2.measureText(text2).width) / 2);
        // textY2 = height / 2;
        ctx2.fillText(text2, textX2, textY * 1.18);
        ctx2.save();
      },
    },
  ],
  suggest = [
    {
      title: "Chưa bắt đầu",
      quantity: 9,
    },
    {
      title: "Đang thực hiện",
      quantity: 22,
    },

    {
      title: "Đã hoàn thành",
      quantity: 128,
    },
  ],
  //dataLine: dữ liệu biểu đồ đường
  dataLine = {
    //lable: tiêu đề của trục x
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Chưa bắt đầu",
        data: [200, 515, 55, 46],
        borderColor: "#C4C4C4",
        backgroundColor: "#C4C4C4",
      },
      {
        label: "Đang thực hiện",
        data: [645, 100, 900, 31],
        borderColor: "#3885BA",
        backgroundColor: "#3885BA",
      },
      {
        label: "Quá hạn",
        data: [45, 10, 93, 131],
        borderColor: "#E34866",
        backgroundColor: "#E34866",
      },
      {
        label: "Đã hoàn thành",
        data: [65, 330, 430, 131],
        borderColor: "#71B272",
        backgroundColor: "#71B272",
      },
    ],
  },
  optionLine = {
    responsive: true,
    //Hover vào để hiển thị dữ liệu theo tháng
    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: {
        //position: vị trí của chú thích
        position: "bottom",
      },
    },
  },
  searchBy = [
    {
      value: "day",
      name: languageResource.Days,
    },
    {
      value: "week",
      name: languageResource.Weeks,
    },
    {
      value: "month",
      name: languageResource.Months,
    },
    {
      value: "quarter",
      name: languageResource.Precious,
    },
    {
      value: "year",
      name: languageResource.Years,
    },
  ],
  arrMonth = [
    { value: "01" },
    { value: "02" },
    { value: "03" },
    { value: "04" },
    { value: "05" },
    { value: "06" },
    { value: "07" },
    { value: "08" },
    { value: "09" },
    { value: "10" },
    { value: "11" },
    { value: "12" },
  ],
  arrQuarter = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }],
  arrGroupBy = [{ value: "Tháng" }, { value: "Quý" }];

const DashBoard = () => {
  const _isMounted = useRef(false);
  const [searchKeyword, setSearchKeyword] = useState("day");
  const [dataTime, setDataTime] = useState({
    currentDay: null,
    displayDay: null,
    startDay: "",
    endDay: "",
    week: null,
    month: null,
    quarter: null,
    disableQuarterCurrent: null,
    year: null,
    groupBy: null,
  });

  const [arrWeekInYear, setArrWeekInYear] = useState([]);
  const [isValidDate, setIsValidDate] = useState({
    startDay: "",
    endDay: "",
    checkStartDay: false,
    checkEndDay: false,
    textCheck: "",
  });
  const arrYear = listCurrentYear();
  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    getCurrentDate();
  }, []);

  function getWeekOfYear(yearSelect = dataTime.year) {
    const result = startOfWeekYear(new Date(yearSelect, 6, 2), {
      weekStartsOn: 1,
    });
    const checkDay = addDays(result, 3);
    let startDay;
    if (checkDay.getFullYear() === yearSelect) {
      startDay = checkDay;
    } else {
      const day = startOfWeekYear(new Date(yearSelect, 6, 2), {
        weekStartsOn: 1,
        firstWeekContainsDate: 4,
      });
      startDay = day;
    }

    const listStartDayOfWeeksInYear = eachWeekOfInterval(
      {
        start: new Date(yearSelect, startDay.getMonth(), startDay.getDate()),
        end: new Date(yearSelect, 11, 28),
      },
      {
        locale: i18next.language,
        weekStartsOn: 1,
      }
    );
    const value = listStartDayOfWeeksInYear.map((x, i) => {
      const value = new Date(x);
      let end;
      const week = { start: "", end: "" };
      week.start = value.toLocaleDateString(i18next.language, {
        day: "numeric",
        month: "numeric",
      });
      end = addDays(value, 6);
      week.end = end.toLocaleDateString(i18next.language, {
        day: "numeric",
        month: "numeric",
      });
      const nameWeek = i + 1 + " (" + week.start + " - " + week.end + ")";

      return { name: nameWeek, value: i };
    });
    _isMounted.current && setArrWeekInYear(value);
  }
  //function lấy ra ngày hiện tại
  function getCurrentDate() {
    let today = new Date();
    let date = new Date();
    _isMounted.current &&
      setDataTime((prev) => ({
        ...prev,
        displayDay: today.toLocaleDateString(i18next.language, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        currentDay: today,
        endDay: today,
        startDay: addDays(date, -14),
        year: today.getFullYear(),
      }));
  }
  function getCurrentWeek() {
    let weekCurrent = getISOWeek(
      new Date(
        dataTime.currentDay.getFullYear(),
        dataTime.currentDay.getMonth(),
        dataTime.currentDay.getDate()
      )
    );
    return weekCurrent - 1;
  }
  function getCurrentMonth() {
    const currentMonth = String(dataTime.currentDay.getMonth() + 1).padStart(
      2,
      "0"
    );
    _isMounted.current &&
      setDataTime((prev) => ({
        ...prev,
        month: dataTime.month === null ? currentMonth : dataTime.month,
      }));
  }
  function getCurrentQuarter() {
    const quarter = Math.floor((dataTime?.currentDay?.getMonth() + 3) / 3 - 1);
    _isMounted.current &&
      setDataTime((prev) => ({
        ...prev,
        quarter: dataTime.quarter === null ? quarter : dataTime.quarter,
        disableQuarterCurrent: quarter + 1,
      }));
    return quarter;
  }
  function getCurrentYear() {
    const currentYear = dataTime.currentDay.getFullYear();
    _isMounted.current &&
      setDataTime((prev) => ({
        ...prev,
        year: dataTime.year === null ? currentYear : dataTime.year,
      }));

    return currentYear;
  }
  function listCurrentYear() {
    const currentdate = new Date();
    let startYear = currentdate.getFullYear() - 3;
    let endYear = currentdate.getFullYear() + 1;
    let listYear = Array(endYear - startYear + 5)
      .fill()
      .map((item, idx) => {
        return { value: startYear + idx };
      });
    return listYear;
  }
  function checkDate(itemStarDay, itemEndDay, isValid) {
    if (isValid === false) return;

    const endDay = new Date(itemEndDay === "" ? dataTime.endDay : itemEndDay);
    const startDay = new Date(
      itemStarDay === "" ? dataTime.startDay : itemStarDay
    );

    let day = new Date(startDay);

    day.setDate(startDay.getDate() + 15);

    if (endDay < day) {
      _isMounted.current &&
        setIsValidDate((prev) => ({
          ...prev,
          checkStartDay: false,
          checkEndDay: false,
          textCheck: "",
        }));
    }
    if (startDay > endDay) {
      _isMounted.current &&
        setIsValidDate((prev) => ({
          ...prev,
          checkStartDay: true,
          checkEndDay: true,
          textCheck: "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc",
        }));
    } else if (endDay >= day) {
      _isMounted.current &&
        setIsValidDate((prev) => ({
          ...prev,
          checkStartDay: true,
          checkEndDay: true,
          textCheck: "Chọn ngày không quá 14 ngày trong năm",
        }));
    } else if (endDay > dataTime.currentDay) {
      _isMounted.current &&
        setIsValidDate((prev) => ({
          ...prev,
          checkEndDay: true,
          textCheck: "Chọn ngày phải trước ngày hiện tại",
        }));
    }
  }
  const onChangeSearhKeyword = (searchValue) => {
    var checkValue;
    switch (searchValue) {
      case "day":
        checkValue = "day";
        break;
      case "week":
        checkValue = "week";
        getWeekOfYear(dataTime.year);
        listCurrentYear();
        getCurrentYear();
        break;
      case "month":
        checkValue = "month";
        getCurrentMonth();
        listCurrentYear();
        getCurrentYear();
        break;
      case "quarter":
        checkValue = "quarter";
        getCurrentQuarter();
        listCurrentYear();
        getCurrentYear();
        break;
      case "year":
        checkValue = "year";
        getCurrentYear();
        listCurrentYear();
        break;
      default:
        break;
    }
    _isMounted.current && setSearchKeyword(checkValue);
  };
  function onChangeDateTime(items, propName) {
    _isMounted.current &&
      setDataTime((prev) => ({
        ...prev,
        [propName]: items,
      }));
    let isValidate;
    switch (propName) {
      case "year":
        if (searchKeyword === "week" && dataTime.year !== items)
          getWeekOfYear(items);
        break;
      case "startDay":
        isValidate = isValid(items);
        _isMounted.current &&
          setIsValidDate((prev) => ({
            ...prev,
            startDay: isValidate,
          }));
        checkDate(items, dataTime.endDay, isValidate);
        break;
      case "endDay":
        isValidate = isValid(items);
        _isMounted.current &&
          setIsValidDate((prev) => ({
            ...prev,
            endDay: isValidate,
          }));
        checkDate(dataTime.startDay, items, isValidate);
        break;
      default:
        break;
    }
  }
  function handleOnClickSearch(searchBy) {
    switch (searchBy) {
      case "day":
        break;
      case "week":
      default:
        break;
    }
  }
  const textFieldSearch = (
    <TextField
      fullWidth
      select
      variant="outlined"
      size="small"
      label="Loại"
      InputLabelProps={{
        style:{color:"white"}
      }}
  
      onChange={(e) => onChangeSearhKeyword(e.target.value)}
      value={searchKeyword ?? ""}
    >
      {searchBy?.map(({ value, name }) => (
        <MenuItem  color="white" classes={{
          '&.MuiSelect-selectMenu ': {
            color: "white",
            fontWeight: 600
        }
        }} key={value} value={value}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  );

  const inputYear = (
    <TextField
      fullWidth
      select
      variant="outlined"
      size="small"
      label=""
      onChange={(e) => onChangeDateTime(e.target.value, "year")}
      value={dataTime.year ?? ""}
    >
      {arrYear?.map(({ value, index }) => (
        <MenuItem
          disabled={value > dataTime.currentDay?.getFullYear()}
          key={index}
          value={value}
        >
          {value}
        </MenuItem>
      ))}
    </TextField>
  );
  return (
    <div style={{ color: "white" }}>
      <CCard
        id={componentID}
      >
        <div style={{ color: "white", padding: "10px" }}>1w3e12</div>
        <CCardBody
          style={{ backgroundColor: "#2a2a2a", color: "white", border: "none",borderRadius:"10px", width:"100%" }}
        >
          <div className="row">
            <div className="col-md-4">
              <div className="chiba-title-chart"></div>
              <div className="row">
                <div className="col-md-12 pl-4 pr-4 pt-2 pb-4">
                  <Doughnut
                    data={dataDoughnut}
                    options={options}
                    plugins={plugins}
                  />
                </div>
                <div className="col-md-12 pb-3">
                  {suggest.map((item, index) => {
                    return (
                      <div
                        className="chiba-flex "
                        style={{ display: "flex" }}
                        key={index}
                      >
                        <div className="col-10">
                          <span>{item.title}</span>
                        </div>
                        <div className="chiba-bold">{item.quantity}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row chiba-input">
                {searchKeyword === "day" && (
                  <>
                    <div className="col-search p-1">{textFieldSearch}</div>
                    <div className="col-start p-1">
                      <KeyboardDatePicker
                        label="Ngay"
                        InputLabelProps={{ shrink: true }}
                        format="dd/MM/yyyy"
                        autoComplete="off"
                        autoOk
                        fullWidth
                        size="small"
                        helperText={
                          isValidDate.checkStartDay && isValidDate.textCheck
                        }
                        error={
                          isValidDate.checkStartDay ||
                          isValidDate.startDay === false
                        }
                        variant="inline"
                        inputVariant="outlined"
                        value={dataTime.startDay ?? ""}
                        onChange={(date) => {
                          onChangeDateTime(date, "startDay");
                        }}
                      />
                    </div>
                    <div className="col-end p-1">
                      <KeyboardDatePicker
                        label="Ngày"
                        InputLabelProps={{ shrink: true }}
                        format="dd/MM/yyyy"
                        autoComplete="off"
                        autoOk
                        fullWidth
                        size="small"
                        helperText={
                          isValidDate.checkEndDay &&
                          isValidDate.checkStartDay === false &&
                          isValidDate.textCheck
                        }
                        error={
                          isValidDate.checkEndDay ||
                          isValidDate.endDay === false
                        }
                        value={dataTime.endDay ?? ""}
                        variant="inline"
                        inputVariant="outlined"
                        onChange={(date) => {
                          onChangeDateTime(date, "endDay");
                        }}
                      />
                    </div>
                  </>
                )}
                {searchKeyword === "week" && (
                  <>
                    <div className="col-search p-1">{textFieldSearch}</div>
                    <div className="col-week p-1">
                      <TextField
                        fullWidth
                        select
                        variant="outlined"
                        size="small"
                        label="Tuần"
                        onChange={(e) =>
                          onChangeDateTime(e.target.value, "week")
                        }
                        value={dataTime.week ?? getCurrentWeek()}
                      >
                        {arrWeekInYear?.map(({ value, name }, index) => {
                          return (
                            <MenuItem
                              disabled={
                                value > getCurrentWeek() &&
                                dataTime.year >=
                                  dataTime.currentDay.getFullYear()
                              }
                              key={index}
                              value={value}
                            >
                              {name}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </div>
                    <div className="col-year p-1">{inputYear}</div>
                  </>
                )}
                {searchKeyword === "month" && (
                  <>
                    <div className="col-search-month-quater p-1">
                      {textFieldSearch}
                    </div>
                    <div className="col-month-year p-1">
                      <TextField
                        fullWidth
                        select
                        variant="outlined"
                        size="small"
                        label="Tháng"
                        onChange={(e) =>
                          onChangeDateTime(e.target.value, "month")
                        }
                        value={dataTime.month ?? ""}
                      >
                        {arrMonth?.map(({ value, index }) => (
                          <MenuItem
                            disabled={
                              value >= dataTime.currentDay.getMonth() + 1 &&
                              dataTime.year ===
                                dataTime.currentDay.getFullYear()
                            }
                            key={index}
                            value={value}
                          >
                            {value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="col-month-year p-1">{inputYear}</div>
                  </>
                )}
                {searchKeyword === "quarter" && (
                  <>
                    <div className="col-search-month-quater p-1">
                      {textFieldSearch}
                    </div>
                    <div className="col-month-year p-1">
                      <TextField
                        fullWidth
                        select
                        variant="outlined"
                        size="small"
                        label="Tổng"
                        onChange={(e) =>
                          onChangeDateTime(e.target.value, "quarter")
                        }
                        value={dataTime.quarter ?? ""}
                      >
                        {arrQuarter?.map(({ value, index }) => (
                          <MenuItem
                            disabled={
                              value >= dataTime.disableQuarterCurrent &&
                              dataTime.year >= dataTime.currentDay.getFullYear()
                            }
                            key={index}
                            value={value}
                          >
                            {value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="col-month-year p-1">{inputYear}</div>
                  </>
                )}
                {searchKeyword === "year" && (
                  <>
                    <div className="col-search-month-quater p-1">
                      {textFieldSearch}
                    </div>
                    <div className="col-month-year p-1">{inputYear}</div>
                    <div className="col-month-year p-1">
                      <TextField
                        fullWidth
                        select
                        variant="outlined"
                        size="small"
                        label="Nhóm"
                        onChange={(e) =>
                          onChangeDateTime(e.target.value, "groupBy")
                        }
                        value={
                          dataTime.groupBy === null
                            ? arrGroupBy[0]?.value
                            : dataTime.groupBy
                        }
                      >
                        {arrGroupBy?.map(({ value, index }) => (
                          <MenuItem key={index} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </>
                )}
                <div className="col-button p-1">
                  <button
                    type="button"
                    className="search-btn btn btn-primary"
                    onClick={() => handleOnClickSearch(searchKeyword)}
                    disabled={
                      isValidDate.checkStartDay ||
                      isValidDate.checkEndDay ||
                      isValidDate.startDay === false ||
                      isValidDate.endDay === false
                    }
                  >
                    <BsSearch size="1.22rem" />
                    <span className="name ml-1 ">Tìm kiếm</span>
                  </button>
                </div>
              </div>
              <div className="col-md-12 p-0 pt-2">
                <Line options={optionLine} data={dataLine} />
              </div>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default DashBoard;
