import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
// import DeleteModel from "../../components/common/DeleteModel";
// import toast from "react-hot-toast";
// import api from "../../config/URL";

const SupportTeamManagement = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!loading) {
//       initializeDataTable();
//     }
//     return () => {
//       destroyDataTable();
//     };
//   }, [loading]);

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

//   const refreshData = async () => {
//     destroyDataTable();
//     setLoading(true);
//     try {
//       const response = await api.get("getAllMstrItems");
//       setDatas(response.data);
//       initializeDataTable(); 
//     } catch (error) {
//       toast.error("Error refreshing data:", error?.response?.data?.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const getItemData = async () => {
//       try {
//         const resposnse = await api.get(
//           "getAllMstrItems"
//         );
//         setDatas(resposnse.data);
//       } catch (error) {
//         toast.error("Error fetching data: ", error?.response?.data?.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getItemData();
//   }, []);

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
        <div className="container-fluid py-4">
          <div className="row align-items-center justify-content-between ">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor ">Support Team Management</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/supportteammanagement/add">
                  <button type="submit" className="btn btn-sm btn-button">
                    <span>Add +</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr className="removeHrMargin"></hr>
       
        <div className="table-responsive p-2 minHeight">
          <table ref={tableRef} className="display table">
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
              {/* {datas.map((data, index) => ( */}
                <tr>
                  <td className="text-center">1</td>
                  <td className="text-center">itemCode</td>
                  <td className="text-center">itemName</td>
                  <td className="text-center">costPrice</td>
                  {/* <td className="text-center">unit</td> */}
                  <td className="text-center">
                    <div className="gap-2">
                      <Link to={`/supportteammanagement/view/`}>
                        <button className="btn btn-light btn-sm  shadow-none border-none">
                          View
                        </button>
                      </Link>
                      <Link to={`/supportteammanagement/edit/`} className="px-2">
                        <button className="btn btn-light  btn-sm shadow-none border-none">
                          Edit
                        </button>
                      </Link>
                      {/* <DeleteModel
                        // onSuccess={refreshData}
                        path={`deleteMstrItem/${data.id}`}
                        style={{ display: "inline-block" }}
                      /> */}
                    </div>
                  </td>
                </tr>
              {/* ))} */}
            </tbody>
          </table>
        </div>
        
        <div className="card-footer border-0 py-5"></div>
      </div>
    </div>
  {/* )} */}
  </div>
  );
};

export default SupportTeamManagement;
