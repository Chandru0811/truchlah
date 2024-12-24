import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../../Components/DeleteModel";
import { userApi } from "../../config/URL";
import { toast } from "react-toastify";
// import DeleteModel from "../../components/common/DeleteModel";
// import toast from "react-hot-toast";
// import api from "../../config/URL";

const ContactForm = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);

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
      const response = await userApi.get("getAllContactPageDetails");
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
      setLoading(true);
      try {
        const response = await userApi.get("getAllContactPageDetails");
        setDatas(response.data);
      } catch (error) {
        toast.error(
          `Error fetching data: ${
            error?.response?.data?.message || error.message
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    getItemData();
  }, []);

  const deletefunction = async (dataId) => {
    return userApi.delete(`deleteContactPageDetails/${dataId}`);
  };
  return (
    <div className="container-fluid px-2 minHeight">
      {loading ? (
        <div className="loader-container d-flex align-items-center justify-content-center">
          <div class="loader"></div>
        </div>
      ) : (
        <div className="card shadow border-0 my-2">
          <div className="container-fluid pt-4 pb-3">
            <div className="row align-items-center justify-content-between ">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor ">Contact Form</h1>
                </div>
              </div>
              {/* <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/vehiclemanagement/add">
                  <button type="submit" className="btn btn-sm btn-button">
                    <span>Add +</span>
                  </button>
                </Link>
              </div>
            </div> */}
            </div>
          </div>
          <hr className="removeHrMargin mt-0"></hr>

          <div className="table-responsive p-2 minHeight">
            <table ref={tableRef} className="display ">
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
                    Phone Number
                  </th>
                  <th scope="col" className="text-center">
                    Enquiry
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
                {datas?.map((data, index) => (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{data.name}</td>
                    <td className="text-center">{data.email}</td>
                    <td className="text-center">{data.mobile}</td>
                    <td className="text-center">{data.enquiry}</td>
                    {/* <td className="text-center">unit</td> */}
                    <td className="text-center">
                      <div className="gap-2">
                        <Link to={`/contactform/view/${data.id}`}>
                          <button className="btn btn-light btn-sm  shadow-none border-none">
                            View
                          </button>
                        </Link>
                        <Link
                          to={`/contactform/edit/${data.id}`}
                          className="px-2"
                        >
                          <button className="btn btn-light  btn-sm shadow-none border-none">
                            Edit
                          </button>
                        </Link>
                        <DeleteModel
                          onSuccess={refreshData}
                          onDelete={() => deletefunction(data.id)}
                          // path={`deleteContactPageDetails/${data.id}`}
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
      )}
    </div>
  );
};

export default ContactForm;
