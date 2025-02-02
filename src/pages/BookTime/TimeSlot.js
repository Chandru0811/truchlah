import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import TimeSlotEdit from "./TimeSlotEdit";

const TimeSlot = () => {
  const tableRef = useRef(null);

  const timeSlotData = [
    { batchday: "MONDAY", batchtimes: "10:00 AM - 12:00 PM", driverId: 1 },
    { batchday: "TUESDAY", batchtimes: "01:00 PM - 03:00 PM", driverId: 2 },
    { batchday: "WEDNESDAY", batchtimes: "09:00 AM - 11:00 AM", driverId: 3 },
    { batchday: "THURSDAY", batchtimes: "02:00 PM - 04:00 PM", driverId: 4 },
    { batchday: "FRIDAY", batchtimes: "11:00 AM - 01:00 PM", driverId: 5 },
    { batchday: "SATURDAY", batchtimes: "03:00 PM - 05:00 PM", driverId: 6 },
    { batchday: "SUNDAY", batchtimes: "04:00 PM - 06:00 PM", driverId: 7 },
  ];

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    setDatas(timeSlotData); // Set the data state correctly

    // Initialize DataTable after setting data
    setTimeout(() => {
      $(tableRef.current).DataTable();
    }, 100);
  }, []);

  return (
    <div className="container-fluid px-2 minHeight">
      <div className="card shadow border-0 my-2">
        <div className="container-fluid pt-4 pb-3">
          <div className="row align-items-center justify-content-between">
            <div className="col">
              <h1 className="h4 ls-tight headingColor">Driver Management</h1>
            </div>
          </div>
        </div>
        <hr className="removeHrMargin mt-0" />

        <div className="table-responsive p-2 minHeight">
          <table ref={tableRef} className="display">
            <thead className="thead-light">
              <tr>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>S.NO</th>
                <th scope="col" className="text-center">Batch Day</th>
                <th scope="col" className="text-center">Batch Times</th>
                <th scope="col" className="text-center" style={{ pointerEvents: "none" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={data.driverId}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{data.batchday}</td>
                  <td className="text-center">{data.batchtimes}</td>
                  <td className="text-center">
                    <TimeSlotEdit
                      id={data.driverId}
                      batchDay={data.batchday}
                      batchTimes={data.batchtimes}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimeSlot;
