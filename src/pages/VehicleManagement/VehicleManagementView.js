import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { driverApi } from "../../config/URL";
import toast from "react-hot-toast";

function VehicleManagementView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await driverApi.get(`/vehicle/vehicleTypeById/${id}`,
        );
        setData(response.data.responseBody);
      } catch (error) {
        toast.error("Error Fetching Data ", error)
      }
    };
    getData();
  }, [id]);

  return (
    <div>
      {/* {loading ? (
      <div className="loader-container">
       <div class="Loader-Div">
        <svg id="triangle" width="50px" height="50px" viewBox="-3 -4 39 39">
            <polygon fill="transparent" stroke="blue" stroke-width="1.3" points="16,0 32,32 0,32"></polygon>
        </svg>
    </div>
      </div>
    ) : ( */}

      <div className="container-fluid px-2 minHeight">
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">View Vehicle Management</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-start">
                  <Link to="/vehiclemanagement">
                    <button type="button" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow border-0 mb-2 minHeight">
          <div className="container">
            <div className="row mt-2 p-3">
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>Vehicle Type</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.type || ""}</p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>Base Fare</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.baseFare || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>Per Km Charge</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.perKm || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>Helper Charge</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.helper || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>Extra Helper Charge</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.extraHelper || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>Tail Gate Charge</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.tailGateCharge || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>Overtime Charge</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.overtimeCharge || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>Non-lift Access Charge</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.nonLiftAccess || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>ERP Charge</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.erpCharge || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>CBD Charge</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.cbdCharge || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>Secured Zone Charge</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.securedZoneCharge || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>GST</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.gst || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>Round Trip Charge</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.roundTrip || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>Wrapping Charge</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.wrappingCharge || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>Add Stop Charge</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.addStopCharge || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>10 to 12 Charge</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.tenToTwelveCharge || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>12 to 7 Charge</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.twelveToSevenCharge || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>Peak Hour Charge</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.peakHourCharge || ""}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm"><b>Description</b></p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.description || ""}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default VehicleManagementView;
