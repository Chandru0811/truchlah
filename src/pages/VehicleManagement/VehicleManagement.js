import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../../Components/DeleteModel";
import { driverApi } from "../../config/URL";
import toast from "react-hot-toast";

// import toast from "react-hot-toast";
// import api from "../../config/URL";

const VehicleManagement = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  console.log("object", datas)
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

  const funDelete=(vehicletypeId)=>{
    return driverApi.delete(`/vehicle/deleteVehicleType/${vehicletypeId}`)
  }
  
  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await driverApi.get("vehicle/vehicleType");
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
        const response = await driverApi.get("vehicle/vehicleType",
        );
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
                  <h1 className="h4 ls-tight headingColor ">Vehicle Management</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/vehiclemanagement/add">
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
                  <th scope="col" style={{ whiteSpace: "nowrap" }} className="text-center">
                    S.NO
                  </th>
                  {/* <th scope="col" className="text-center">
                    Vehicle Type Id
                  </th> */}
                  <th scope="col" className="text-center">
                    Vehicle Type
                  </th>
                  <th scope="col" className="text-center">
                    Vehicle Capacity
                  </th>
                  <th scope="col" className="text-center">
                    Base Charge
                  </th>
                  <th scope="col" className="text-center">
                    Per KM Charge
                  </th>
                  <th scope="col" className="text-center">
                    Status
                  </th>
                  <th scope="col" className="text-center">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{data.type}</td>
                    <td className="text-center">{`${data.vehicleCapacity}Kg`}</td>
                    <td className="text-center">{data.baseFare}</td>
                    <td className="text-center">{data.perKm}</td>
                    <td className="text-center">
                  {data.vehicleStatus === "ACTIVE" ? (
                    <span className="badge active">Active</span>
                  ) : (
                    <span className="badge badges-Red inactive">Inactive</span>
                  )}
                </td>
                    <td className="text-center">
                      <div className="gap-2">
                        <Link to={`/vehiclemanagement/view/${data.vehicletypeId}`}>
                          <button className="btn btn-light btn-sm  shadow-none border-none">
                            View
                          </button>
                        </Link>
                        <Link to={`/vehiclemanagement/edit/${data.vehicletypeId}`} className="px-2">
                          <button className="btn btn-light  btn-sm shadow-none border-none">
                            Edit
                          </button>
                        </Link>
                        <DeleteModel
                        onSuccess={refreshData}
                        onDelete={()=>funDelete(data.vehicletypeId)}
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

export default VehicleManagement;
