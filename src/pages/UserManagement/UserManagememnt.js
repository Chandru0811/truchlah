import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../../Components/DeleteModel";
import { userApi } from "../../config/URL";
import toast from "react-hot-toast";

// import DeleteModel from "../../components/common/DeleteModel";
// import toast from "react-hot-toast";
// import api from "../../config/URL";

const UserManagement = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const funDelete = (userId) => {
    return userApi.delete(`deleteUserDetails/${userId}`)
  }

  const refreshData = async () => {
    setLoading(true);
    destroyDataTable();
    try {
      const response = await userApi.get("/user");
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
      try {
        const response = await userApi.get("/user");
        setDatas(response.data.responseBody);
      } catch (error) {
        toast.error("Error fetching data: ", error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    getItemData();
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
              <div className="row align-items-center justify-content-between ">
                <div className="col">
                  <div className="d-flex align-items-center gap-4">
                    <h1 className="h4 ls-tight headingColor ">
                      User Management
                    </h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-end">
                    {/* <Link to="/usermanagement/add">
                    <button type="submit" className="btn btn-sm btn-button">
                      <span>Add +</span>
                    </button>
                  </Link> */}
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
                      Name
                    </th>
                    <th scope="col" className="text-center">
                      Email
                    </th>
                    <th scope="col" className="text-center">
                      Mobile Number
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
                  {datas.map((data, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{`${data.firstName} ${
                        data.lastName === undefined ? "" : data.lastName
                      }`}</td>
                      <td className="text-center">{data.email}</td>
                      <td className="text-center">
                        {data.countryCode} {data.mobileNo}
                      </td>
                      <td className="text-center">
                        {data.userActiveStatus ? (
                          <span className="badge active">Active</span>
                        ) : (
                          <span className="badge badges-Red inactive">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="text-center">
                        <div className="gap-2">
                          <Link to={`/usermanagement/view/${data.userId}`}>
                            <button className="btn btn-light btn-sm  shadow-none border-none">
                              View
                            </button>
                          </Link>
                          {/* <Link to={`/usermanagement/edit/${data.userId}`} className="px-2">
                          <button className="btn btn-light  btn-sm shadow-none border-none">
                            Edit
                          </button>
                        </Link> */}
                          <DeleteModel
                            onSuccess={refreshData}
                            onDelete={() => funDelete(data.userId)}
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

export default UserManagement;
