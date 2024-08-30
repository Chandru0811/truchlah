import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import api from "../../config/URL";
// import toast from "react-hot-toast";

function BookingManagmentView() {
  // const { id } = useParams();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItemData = async () => {
      //   setLoading(true);
      //   try {
      //     const response = await api.get(
      //       `getMstrItemsById/${id}`
      //     );
      //     setData(response.data);
      //   } catch (error) {
      //     toast.error("Error fetching data: ", error?.response?.data?.message);
      //   }finally{
      //     setLoading(false);
      //   }
    };
    getItemData();
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
              <div className="row align-items-center">
                <div className="col">
                  <div className="d-flex align-items-center gap-4">
                    <h1 className="h4 ls-tight headingColor">
                      View Booking Management
                    </h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-start">
                    <Link to="/supportteammanagement">
                      <button type="submit" className="btn btn-sm btn-light">
                        <span>Back</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow border-0 mb-2 minHeight">
          <div className="container">
            <div className="row mt-2 p-3">
              <div className="col-md-12 col-12 text-end">
                <div className="d-flex justify-content-end align-items-center">
                  <select className="form-select w-25 me-3">
                    <option value="Select Driver" disabled></option>
                    <option value="list 1">List 1</option>
                    <option value="list 2">List 2</option>
                    <option value="list 3">List 3</option>
                  </select>
                  <button className="btn btn btn-sm bg-gradient bg-primary py-1 text-white">
                    Assign
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt-2 p-3">
              <div class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      Accordion Item #1
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseOne"
                    class="accordion-collapse collapse show"
                  >
                    <div class="accordion-body row mt-2 p-3">
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Name</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.itemCode || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Email</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.itemCode || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Mobile Number</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.itemName || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Country Code</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.unit || ""}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Reference Code</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.unit || ""}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Login Type</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.unit || ""}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseTwo"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseTwo"
                    >
                      Accordion Item #2
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    class="accordion-collapse collapse"
                  >
                    <div class="accordion-body">
                      <strong>This is the second item's accordion body.</strong>{" "}
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseThree"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseThree"
                    >
                      Accordion Item #3
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseThree"
                    class="accordion-collapse collapse"
                  >
                    <div class="accordion-body">
                      <strong>This is the third item's accordion body.</strong>{" "}
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingManagmentView;
