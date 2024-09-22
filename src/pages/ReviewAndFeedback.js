import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../Components/DeleteModel";
import { bookingApi } from "../config/URL";
import toast from "react-hot-toast";
import { IoMdStar } from "react-icons/io";

const ReviewAndFeedback = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  console.log("Booking Datas:", datas);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const table = $(tableRef.current).DataTable();

    return () => {
      table.destroy();
    };
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
    destroyDataTable();
    setLoading(true);
    try {
      const response = await bookingApi.get("/booking/getAllReviews");
      setDatas(response.data.responseBody);
      initializeDataTable();
    } catch (error) {
      toast.error("Error refreshing data:", error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getItemData = async () => {
      setLoading(true);
      try {
        const response = await bookingApi.get("/booking/getAllReviews");
        setDatas(response.data.responseBody);
        console.log("Response :", response.data);
      } catch (error) {
        toast.error("Error fetching data: ", error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    getItemData();
  }, []);

  const deleteFun = (bookingId) => {
    return bookingApi.delete(`booking/delete/booking/${bookingId}`);
  };

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
        <div className="container-fluid px-2 minHeight">
          <div className="card shadow border-0 my-2">
            <div className="container-fluid pt-4 pb-3">
              <div className="row align-items-center justify-content-between ">
                <div className="col">
                  <div className="d-flex align-items-center gap-4">
                    <h1 className="h4 ls-tight headingColor ">
                      Reviews And Feedback
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <hr className="removeHrMargin mt-0"></hr>

            <div className="table-responsive p-2 minHeight">
              <table ref={tableRef} className="display">
                <thead className="thead-light">
                  <tr>
                    <th scope="col" style={{ whiteSpace: "nowrap" }}>
                      S.NO
                    </th>
                    <th scope="col" className="text-center">
                      Rating By User
                    </th>
                    <th scope="col" className="text-center">
                      Review By User
                    </th>
                    <th scope="col" className="text-center">
                      Rating By Driver
                    </th>
                    <th scope="col" className="text-center">
                      Review By Driver
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(datas) &&
                    datas?.map((data, index) => (
                      <tr>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">
                          <IoMdStar className="text-warning mb-1 fs-5"/> {data.ratingByUser || ""}
                        </td>
                        <td className="text-center">
                          {data.reviewByUser || ""}
                        </td>
                        <td className="text-center">
                          <IoMdStar className="text-warning mb-1 fs-5"/> {data.ratingByDriver === "Driver rating not yet available." ? 0 : "0"}
                        </td>
                        <td className="text-center">
                          {data.reviewByDriver || ""}
                        </td>
                        {/* <td className="text-center">
                          <div className="gap-2">
                            <Link
                              to={`/bookingManagement/view/${data.bookingId}`}
                            >
                              <button className="btn btn-light btn-sm  shadow-none border-none">
                                View
                              </button>
                            </Link>
                            <DeleteModel
                              onSuccess={refreshData}
                              onDelete={() => deleteFun(data.bookingId)}
                              // path={`deleteMstrItem/${data.id}`}
                              style={{ display: "inline-block" }}
                            />
                          </div>
                        </td> */}
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

export default ReviewAndFeedback;
