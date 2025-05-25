import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AlarmTable.css";

const AlarmTable = () => {
  const [alarms, setAlarms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/data.json") // đổi giá trị ở đây thành fetch từ API thực tế
      .then((res) => res.json())
      .then((data) => setAlarms(data));
  }, []);

  // Bộ lọc theo search term
  const filteredAlarms = alarms.filter((alarm) => {
    const alarmIdStr = String(alarm.alarm_id); // đảm bảo là string
    return (
      alarmIdStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alarm.alarm_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleNoteChange = (index, value) => {
    const updated = [...alarms];
    updated[index].notes = value;
    setAlarms(updated);
  };

  return (
    <div className="table-container">
      <h2>Danh sách cảnh báo</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Tìm kiếm theo Alarm ID hoặc Alarm Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Alarm ID</th>
            <th>Alarm Name</th>
            <th>Prediction</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlarms.map((alarm) => (
            <tr key={alarm.alarm_id}>
              <td>
                <Link to={`/alarm/${alarm.alarm_id}`}>{alarm.alarm_id}</Link>
              </td>
              <td>{alarm.alarm_name}</td>
              <td
                style={{
                  color: alarm.prediction_label === 1 ? "red" : "black",
                  fontWeight: alarm.prediction_label === 1 ? "bold" : "normal",
                }}
              >
                {alarm.prediction_label === 1 ? "Nguy hiểm" : "Bình thường"}
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={alarm.notes}
                  onChange={(e) => {
                    alarm.notes = e.target.value;
                    // có thể thêm hàm lưu về backend ở đây nếu cần
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
