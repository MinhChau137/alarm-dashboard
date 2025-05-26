import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AlarmTable.css";

const AlarmTable = () => {
  const [alarms, setAlarms] = useState([]);
  const [filters, setFilters] = useState({
    fromDate: null,
    toDate: null,
    unit: "",
    alarmName: "",
    alarmId: ""
  });

  useEffect(() => {
    fetch("/data.json") // đổi giá trị ở đây thành fetch từ API thực tế
      .then((res) => res.json())
      .then((data) => setAlarms(data));
  }, []);

  // Bộ lọc theo search term
  const filteredAlarms = alarms.filter((alarm) => {
    const time = new Date(alarm.timestamp);
    const { fromDate, toDate, unit, alarmName, alarmId } = filters;

    const matchFrom = fromDate ? time >= fromDate : true;
    const matchTo = toDate ? time <= toDate : true;
    const matchUnit = alarm.unit.toLowerCase().includes(unit.toLowerCase());
    const matchName = alarm.alarm_name.toLowerCase().includes(alarmName.toLowerCase());
    const matchId = String(alarm.alarm_id).includes(alarmId);

    return matchFrom && matchTo && matchUnit && matchName && matchId;
  });

  return (
    <div className="table-container">
      <h2>Danh sách cảnh báo</h2>
      <div className="filter-box">
        <div>
          <label>Bắt đầu từ: </label>
          <DatePicker
            selected={filters.fromDate}
            onChange={(date) => setFilters({ ...filters, fromDate: date })}
            dateFormat="dd/MM/yyyy"
            placeholderText="Chọn ngày"
          />
        </div>

        <div>
          <label>Đến: </label>
          <DatePicker
            selected={filters.toDate}
            onChange={(date) => setFilters({ ...filters, toDate: date })}
            dateFormat="dd/MM/yyyy"
            placeholderText="Chọn ngày"
          />
        </div>

        <div>
          <label>Đơn vị: </label>
          <input
            type="text"
            value={filters.unit}
            onChange={(e) => setFilters({ ...filters, unit: e.target.value })}
          />
        </div>

        <div>
          <label>Alarm Name: </label>
          <input
            type="text"
            value={filters.alarmName}
            onChange={(e) => setFilters({ ...filters, alarmName: e.target.value })}
          />
        </div>

        <div>
          <label>Alarm ID: </label>
          <input
            type="text"
            value={filters.alarmId}
            onChange={(e) => setFilters({ ...filters, alarmId: e.target.value })}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Prediction</th>
            <th>Alarm ID</th>
            <th>Alarm Name</th>
            <th>Thời gian</th>
            <th>Đơn vị</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlarms.map((alarm, index) => (
            <tr key={alarm.alarm_id}>
              <td>{index + 1}</td>
              <td style={{ color: alarm.prediction_label === 1 ? "red" : "black", fontWeight: alarm.prediction_label === 1 ? "bold" : "normal" }}>
                {alarm.prediction_label === 1 ? "Bất thường" : "Bình thường"}
              </td>
              <td>
                <Link to={`/alarm/${alarm.alarm_id}`}>{alarm.alarm_id}</Link>
              </td>
              <td>{alarm.alarm_name}</td>
              <td>{new Date(alarm.timestamp).toLocaleString("vi-VN")}</td>
              <td>{alarm.unit}</td>
              <td>
                <input
                  type="text"
                  defaultValue={alarm.notes}
                  onChange={(e) => {
                    alarm.notes = e.target.value;
                    // Gọi API lưu note về backend
                    /*
                    fetch(`http://localhost:3000/api/alarms/${alarm.id}`, {
                      method: "PUT", // hoặc PATCH tùy backend
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ notes: updatedNote }),
                    })
                      .then((res) => {
                        if (!res.ok) {
                          throw new Error("Lỗi khi lưu ghi chú");
                        }
                        return res.json();
                      })
                      .then((data) => {
                        console.log("Đã lưu thành công", data);
                        // Có thể set lại state nếu cần
                      })
                      .catch((error) => {
                        console.error("Lỗi:", error);
                        alert("Lưu ghi chú thất bại!");
                      });*/
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlarmTable;
