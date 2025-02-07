import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../../Components/DeleteModel";

// import DeleteModel from "../../components/common/DeleteModel";
import toast from "react-hot-toast";
import { bookingApi } from "../../config/URL";
// import api from "../../config/URL";

const OfficeCategoryManagement = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
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
      const response = await bookingApi.get("getAllCommercialShifting");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      toast.error("Error refreshing data:", error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getItemData = async () => {
      try {
        const resposnse = await bookingApi.get("getAllCommercialShifting");
        setDatas(resposnse.data);
      } catch (error) {
        toast.error("Error fetching data: ", error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    getItemData();
  }, []);

  const funDelete = (id) => {
    return bookingApi.delete(`/deleteCommercialShifting/${id}`)
  }

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
              <div className="row align-items-center justify-content-between ">
                <div className="col">
                  <div className="d-flex align-items-center gap-4">
                    <h1 className="h4 ls-tight headingColor ">
                      Office Category Management
                    </h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-end">
                    <Link to="/officecategorymanagement/add">
                      <button type="submit" className="btn btn-sm btn-button">
                        <span>Add +</span>
                      </button>
                    </Link>
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
                      Office Category Name
                    </th>
                    <th scope="col" className="text-center">
                      Price
                    </th>
                    <th scope="col" className="text-center">
                      Status
                    </th>
                    {/* <th scope="col" className="text-center">
                  Unit
                </th> */}
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
                  {datas.map((data, index) => (
                    <tr>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{data.commercialCategoryName}</td>
                      <td className="text-center">{data.price}</td>
                      <td className="text-center">
                        {data.commercialStatus === "ACTIVE" ? (
                          <span className="badge active">Active</span>
                        ) : (
                          <span className="badge badges-Red inactive">
                            Inactive
                          </span>
                        )}
                      </td>
                      {/* <td className="text-center">unit</td> */}
                      <td className="text-center">
                        <div className="gap-2">
                          <Link
                            to={`/officecategorymanagement/view/${data.id}`}
                          >
                            <button className="btn btn-light btn-sm  shadow-none border-none">
                              View
                            </button>
                          </Link>
                          <Link
                            to={`/officecategorymanagement/edit/${data.id}`}
                            className="px-2"
                          >
                            <button className="btn btn-light  btn-sm shadow-none border-none">
                              Edit
                            </button>
                          </Link>
                          <DeleteModel
                            onSuccess={refreshData}
                            onDelete={() => funDelete(data.id)}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficeCategoryManagement;
