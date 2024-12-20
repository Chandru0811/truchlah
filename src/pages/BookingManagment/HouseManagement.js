import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../../Components/DeleteModel";
import toast from "react-hot-toast";
import { bookingApi } from "../../config/URL";
import { Avatar, Badge, Space } from "antd";
import WebSocketService from "../../config/WebSocketService";

const HouseManagement = () => {
  const tableRef = useRef(null);
  const [count,setCount]=useState(0)
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await bookingApi.get(
        "booking/getAllHouseBookingDetailsByAdmin"
      );
      setDatas(response.data);
      console.log("Response: ", response.data);
    } catch (error) {
      toast.error("Error fetching data: ", error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  
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

  const refreshData = async () => {
    setLoading(true);
    destroyDataTable();
    try {
      const response = await bookingApi.get(
        "booking/getAllHouseBookingDetailsByAdmin"
      );
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      toast.error("Error refreshing data:", error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refreshData();
  }, [count]);

  const deleteFun = (bookingId) => {
    return bookingApi.delete(`booking/delete/${bookingId}`);
  };

  useEffect(() => {
    const subscription = WebSocketService.subscribeToBookingUpdates(
      (data) => {
        if (data === true) {
          setCount((prevCount) => prevCount + 1);
        }
      }
    );

    // return () => {
    //   subscription.unsubscribe();
    // };
  }, []);

  return (
    <div>
      {loading ? (
        <div className="darksoul-layout">
          <div className="darksoul-grid">
            <div className="item1"></div>
            <div className="item2"></div>
            <div className="item3"></div>
            <div className="item4"></div>
          </div>
          <h3 className="darksoul-loader-h">Trucklah</h3>
        </div>
      ) : (
        <div className="table-responsive p-2 minHeight">
          <table ref={tableRef} className="display">
            <thead className="thead-light">
              <tr>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  S.NO
                </th>
                <th scope="col" className="text-center">
                  Booking ID
                </th>
                <th scope="col" className="text-center">
                  Booking Date & Time
                </th>
                <th scope="col" className="text-center">
                  Est Km
                </th>
                <th scope="col" className="text-center">
                  Amount
                </th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th
                  scope="col"
                  className="text-center"
                  aria-disabled="true"
                  style={{ pointerEvents: "none" }}
                >
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {(datas? datas:[]).map((data, index) => (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{data.bookingId || ""}</td>
                    <td className="text-center">
                      {data.bookingTime ? (
                        <>
                          {data.bookingTime.substring(0, 10)} <b>at</b>{" "}
                          {new Date(data.bookingTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </>
                      ) : (
                        " "
                      )}
                    </td>
                    <td className="text-center">{data.estKm || ""}</td>
                    <td className="text-center">{data.totalAmount || "0.0"}</td>
                    <td className="text-center">
                      {data.status === "DRAFT_BOOKING" ? (
                        <span
                          className="badge"
                          style={{ background: "#fcd162" }}
                        >
                          Draft Booking
                        </span>
                      ) : data.status === "CANCELLED" ? (
                        <span
                          className="badge"
                          style={{ background: "#f04545" }}
                        >
                          Cancelled
                        </span>
                      ) : data.status === "BOOKED" ? (
                        <span
                          className="badge"
                          style={{ background: "#2593fb" }}
                        >
                          Booked
                        </span>
                      ) : data.status === "COMPLETED" ? (
                        <span
                          className="badge"
                          style={{ background: "#17e540" }}
                        >
                          Completed
                        </span>
                      ) : data.status === "ASSIGNED" ? (
                        <span
                          className="badge"
                          style={{ background: "#28d8b7" }}
                        >
                          Assigned
                        </span>
                      ) : (
                        <span
                          className="badge"
                          style={{ background: "#6d736e" }}
                        >
                          Unknown
                        </span>
                      )}
                    </td>

                    <td className="text-center">
                      <div className="gap-2">
                        <Link to={`/bookingManagement/view/${data.bookingId}`}>
                          <Space size="small">
                            {/* {data.status === "ASSIGNED" ? ( */}

                            <button className="btn btn-light btn-sm shadow-none border-none me-2">
                              View
                            </button>
                            {/* ) : (
                                <Badge
                                  size="small"
                                  color="#acff3b"
                                  count={" "}
                                  placement="start"
                                  style={{ right: "41px", color: "#333" ,minWidth:"8px" ,height:"8px" }}
                                  className="p-0"
                                >
                                  <button className="btn btn-light btn-sm shadow-none border-none">
                                    View
                                  </button>
                                </Badge>
                              )} */}
                          </Space>
                        </Link>

                        <DeleteModel
                          onSuccess={refreshData}
                          onDelete={() => deleteFun(data.bookingId)}
                          // path={`deleteMstrItem/${data.id}`}
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HouseManagement;
