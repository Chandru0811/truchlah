import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../../Components/DeleteModel";
import { userApi } from "../../config/URL";
import { toast } from "react-toastify";

const BannerAndOffer = () => {
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
      const response = await userApi.get("getAllOffer");
      if(response.data.status ===200){
        setDatas(response.data.responseBody);
        initializeDataTable();} 
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
        const response = await userApi.get("getAllOffer");
        setDatas(response.data.responseBody);
      } catch (error) {
        toast.error("Error fetching data: ", error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    getItemData();
  }, []);

  const funDelete=(offerId)=>{
    return userApi.delete(`deleteOffer/${offerId}`)
  }

  return (
    <div className="container-fluid px-2 minHeight">
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
      <div className="card shadow border-0 my-2">
        <div className="container-fluid pt-4 pb-3">
          <div className="row align-items-center justify-content-between ">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor ">Banner and Offer</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/bannerandoffer/add">
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
                <th scope="col" className="text-center">
                  Description
                </th>
                <th scope="col" className="text-center">
                  status
                </th>
                {/* <th scope="col" className="text-center">
                  Mobile Number
                </th> */}
                <th scope="col" className="text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {datas?.map((data, index) => (
                <tr>
                  <td className="text-center">{index +1}</td>
                  <td className="text-center">{data.description}</td>
                  {/* <td className="text-center">itemName</td> */}
                  <td className="text-center">
                  {data.status === "Active" ? (
                    <span className="badge active">Active</span>
                  ) : (
                    <span className="badge badges-Red">Inactive</span>
                  )}
                </td>
                  <td className="text-center">
                    <div className="gap-2">
                      <Link to={`/bannerandoffer/view/${data.offerId}`}>
                        <button className="btn btn-light btn-sm  shadow-none border-none">
                          View
                        </button>
                      </Link>
                      <Link to={`/bannerandoffer/edit/${data.offerId}`} className="px-2">
                        <button className="btn btn-light  btn-sm shadow-none border-none">
                          Edit
                        </button>
                      </Link>
                      <DeleteModel
                        onSuccess={refreshData}
                        onDelete={()=>funDelete(data.offerId)}
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
   )} 
    </div>
  );
};

export default BannerAndOffer;
