import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import TimeSlotEdit from "./TimeSlotEdit";
import { toast } from "react-toastify";
import { bookingApi } from "../../config/URL";

const TimeSlot = () => {
  const tableRef = useRef(null);
  // const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [datas, setDatas] = useState([]);
  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      // DataTable already initialized, no need to initialize again
      return;
    }
    $(tableRef.current).DataTable();
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };
  const getData = async () => {
    // destroyDataTable();
    setLoading(true);
    try {
      const response = await bookingApi.get("/getAllVisitingDayWithTime");
      setDatas(response.data);
      if (Array.isArray(response.data.responseBody)) {
        setDatas(response.data.responseBody);
      } else {
        console.error("API did not return an array:", response.data);
        setDatas([]); // Prevents errors
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loader-container d-flex align-items-center justify-content-center">
          <div class="loader"></div>
        </div>
      ) : (
        <div className="container-fluid px-2 minHeight">
          <div className="card shadow border-0 my-2">
            <div className="container-fluid pt-4 pb-3">
              <div className="row align-items-center justify-content-between">
                <div className="col">
                  <h1 className="h4 ls-tight headingColor">
                    Driver Management
                  </h1>
                </div>
              </div>
            </div>
            <hr className="removeHrMargin mt-0" />

            <div className="table-responsive p-2 minHeight">
              <table ref={tableRef} className="display">
                <thead className="thead-light">
                  <tr>
                    <th scope="col" style={{ whiteSpace: "nowrap" }}>
                      S.NO
                    </th>
                    <th scope="col" className="text-center">
                      Batch Day
                    </th>
                    <th scope="col" className="text-center">
                      Batch Times
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ pointerEvents: "none" }}
                    >
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(datas || []).map((data, index) => (
                    <tr key={data.driverId}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{data.day}</td>
                      <td className="text-center">
                        {data.visitingTimes
                          .map((time) => {
                            const [hours, minutes] = time.split(":");
                            const date = new Date();
                            date.setHours(hours, minutes);
                            return date.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            });
                          })
                          .join(", ")}
                      </td>

                      <td className="text-center">
                        <TimeSlotEdit
                          id={data.id}
                          day={data.day}
                          visitingTimes={data.visitingTimes}
                          onSuccess={getData}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlot;
