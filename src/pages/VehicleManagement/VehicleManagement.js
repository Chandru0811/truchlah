import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../../Components/DeleteModel";

// import toast from "react-hot-toast";
// import api from "../../config/URL";

const VehicleManagement = () => {
  const tableRef = useRef(null);
  // const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const datas=[
    {
      name:"prem",
email:"email@gmail.com",
mobile:"0909090909"
    }
  ]
 
  useEffect(() => {
    const table = $(tableRef.current).DataTable();

    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div>
    {/* {loading ? ( */}
      {/* <div className="loader-container">
          <div class="Loader-Div">
        <svg id="triangle" width="50px" height="50px" viewBox="-3 -4 39 39">
            <polygon fill="transparent" stroke="blue" stroke-width="1.3" points="16,0 32,32 0,32"></polygon>
        </svg>
    </div>
      </div> */}
    {/* ) : ( */}
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
                {/* <th scope="col" className="text-center">
                  Unit
                </th> */}
                <th scope="col" className="text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr>
                  <td className="text-center">1</td>
                  <td className="text-center">{data.name}</td>
                  <td className="text-center">{data.email}</td>
                  <td className="text-center">{data.mobile}</td>
                  {/* <td className="text-center">unit</td> */}
                  <td className="text-center">
                    <div className="gap-2">
                      <Link to={`/vehiclemanagement/view/`}>
                        <button className="btn btn-light btn-sm  shadow-none border-none">
                          View
                        </button>
                      </Link>
                      <Link to={`/vehiclemanagement/edit/`} className="px-2">
                        <button className="btn btn-light  btn-sm shadow-none border-none">
                          Edit
                        </button>
                      </Link>
                      <DeleteModel
                        // onSuccess={refreshData}
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
  {/* )} */}
  </div>
  );
};

export default VehicleManagement;
