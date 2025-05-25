import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AlarmDetail.css";

const AlarmDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alarm, setAlarm] = useState(null);

  useEffect(() => {
    fetch("/data.json") // đổi giá trị ở đây thành fetch từ API thực tế
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.alarm_id === id);
        setAlarm(found);
      });
  }, [id]);

  if (!alarm) return <div className="loading">Đang tải chi tiết cảnh báo...</div>;

  const detailEntries = Object.entries(alarm.detail || {});

  return (
    <div className="alarm-detail-container">
      <h2>ID: {alarm.alarm_id} | {alarm.alarm_name}</h2>

      <section>
        <h3>Data, Comments & Details</h3>
        <div className="detail-grid">
          <div className="label">Alarm ID</div>
          <div>{alarm.alarm_id}</div>

          <div className="label">Alarm Name</div>
          <div>{alarm.alarm_name}</div>

          <div className="label">Prediction</div>
          <div>{alarm.prediction_label === 1 ? "Nguy hiểm ⚠️" : "Bình thường"}</div>

          <div className="label">Ghi chú</div>
          <div>{alarm.notes || "Không có"}</div>
        </div>
      </section>

      <section>
        <h3>Chi tiết từ hệ thống</h3>
        <div className="detail-grid">
          {detailEntries.map(([key, value], idx) => (
            <React.Fragment key={idx}>
              <div className="label">{key}</div>
              <div>
                {typeof value === "string" && value.match(/\d+\.\d+\.\d+\.\d+/) ? (
                  <>
                    {value} <button className="btn-view">View Details</button>
                  </>
                ) : (
                  value
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
      <section>
        <div style={{ marginTop: "24px" }}>
          <button className="back-button" onClick={() => navigate(-1)}>
            ⬅️ Quay lại danh sách
          </button>
        </div>
      </section>
    </div>
  );
};

export default AlarmDetail;
