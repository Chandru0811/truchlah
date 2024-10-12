import React, { useEffect, useState,useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { userApi } from "../../config/URL";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../common_pages/cropImageHelper";

function BannerAndOfferEdit() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { id } = useParams();
  const [imageSrc, setImageSrc] = useState(null);
  const [imageName,setImageName]=useState(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    status: Yup.string().required("*Status is required"),
    attachment: Yup.mixed()
  .test("fileSize", "*File size is too large", (value) => {
    return !value || (value.size && value.size <= 1024 * 1024); 
  })
  .test("fileType", "*Unsupported file format", (value) => {
    return !value || ["image/jpeg", "image/png"].includes(value.type); 
  }).notRequired(),

    description: Yup.string().required("*Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      status: "",
      attachment: null,
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("status", values.status);
      if(values.attachment)formData.append("attachment", values.attachment);
      formData.append("description", values.description);
      try {
        const response = await userApi.put(`updateOfferFile/${id}`, formData);
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/bannerandoffer");
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        toast.error("Error updating data: ", error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const getItemData = async () => {
      setLoading(true);
      try {
        const response = await userApi.get(`/offer/byOfferId/${id}`);
        formik.setValues({
          status: response.data.responseBody.offerStatus || "",
          attachment: null,
          description: response.data.responseBody.description || "",
        });
        setData(response.data.responseBody);
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
  }, [id]);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    setImageName(file.name)
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const blobToFile = (blob, fileName) => {
    return new File([blob], fileName, { type: blob.type, lastModified: Date.now() });
  };
  
  const handleCrop = useCallback(async () => {
    try {
      const croppedImageData = await getCroppedImg(imageSrc, croppedAreaPixels);
      const croppedImageFile = blobToFile(croppedImageData, imageName);
  
      setCroppedImage(croppedImageFile);
      // console.log("object",croppedImageFile);
  
      formik.setFieldValue("attachment", croppedImageFile);
      setShowCropper(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imageSrc]);

  const handleCropCancel = () => {
    setShowCropper(false);
    setImageSrc(null);
    setImageName(null)
    formik.setFieldValue("image", ""); 
    document.querySelector("input[type='file']").value = ""; 
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
        <div className="container-fluid p-2 minHeight m-0">
          <form onSubmit={formik.handleSubmit}>
            <div className="card shadow border-0 mb-2 top-header">
              <div className="container-fluid py-4">
                <div className="row align-items-center">
                  <div className="col">
                    <div className="d-flex align-items-center gap-4">
                      <h1 className="h4 ls-tight headingColor">
                        Edit Banner And Offer
                      </h1>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="hstack gap-2 justify-content-end">
                      <Link to="/bannerandoffer">
                        <button type="button" className="btn btn-sm btn-light">
                          <span>Back</span>
                        </button>
                      </Link>
                      <button
                        type="submit"
                        className="btn btn-sm btn-button"
                        disabled={loading}
                      >
                        {loading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          <span></span>
                        )}
                        &nbsp;<span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow border-0 my-2">
              <div className="container mb-5">
                <div className="row py-4">
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label">
                      Status <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <select
                        {...formik.getFieldProps("status")}
                        className={`form-select ${
                          formik.touched.status && formik.errors.status
                            ? "is-invalid"
                            : ""
                        }`}
                        aria-label="Default select example"
                      >
                        <option value="" label="Select status" />
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                      {formik.touched.status && formik.errors.status && (
                        <div className="invalid-feedback">
                          {formik.errors.status}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label">
                      Attachment <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        type="file"
                        name="attachment"
                        accept="image/jpeg, image/png"
                        className={`form-control ${
                          formik.touched.attachment && formik.errors.attachment
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={handleFileChange}
                      />
                      {formik.touched.attachment &&
                        formik.errors.attachment && (
                          <div className="invalid-feedback">
                            {formik.errors.attachment}
                          </div>
                        )}
                    </div>
                    {(data.attachment || formik.values?.attachment) ? (
                      <img
                        src={formik.values?.attachment? URL.createObjectURL(formik.values?.attachment):data.attachment}
                        alt="Attachment"
                        className="img-fluid"
                        style={{ maxWidth: "40%", height: "auto" }}
                      />
                    ) : (
                      <p className="text-muted text-sm">No attachment</p>
                    )} {showCropper && (
                      <div
                        className="crop-container"
                        style={{
                          width: "300px",
                          height: "200px",
                          position: "relative",
                        }}
                      >
                        <Cropper
                          image={imageSrc}
                          crop={crop}
                          zoom={zoom}
                          aspect={4 / 2} 
                          onCropChange={setCrop}
                          onZoomChange={setZoom}
                          onCropComplete={onCropComplete}
                          cropShape="box" 
                          showGrid={false}
                          style={{
                            containerStyle: { width: "100%", height: "100%" },
                          }} 
                        />
                      </div>
                    )}
    
                    {showCropper && (
                      <div className="d-flex justify-content-start mt-3 gap-2 ">
                        <button
                          type="button"
                          className="btn btn-sm btn-primary mt-3"
                          onClick={handleCrop}
                        >
                          Save
                        </button>
    
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary mt-3"
                          onClick={handleCropCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label">
                      Description <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <textarea
                        type="text"
                        name="description"
                        className={`form-control ${
                          formik.touched.description &&
                          formik.errors.description
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("description")}
                      />
                      {formik.touched.description &&
                        formik.errors.description && (
                          <div className="invalid-feedback">
                            {formik.errors.description}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default BannerAndOfferEdit;
