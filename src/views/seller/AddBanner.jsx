/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  add_banner,
  get_banner,
  messageClear,
  update_banner,
} from "../../store/Reducers/bannerReducer";
import toast from "react-hot-toast";

const AddBanner = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { loader, successMessage, errorMessage, banner } = useSelector(
    (state) => state.banner,
  );

  const [imageShow, setImageShow] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;

    if (length > 0) {
      setImage(files[0]);
      setImageShow(URL.createObjectURL(files[0]));
    }
  };

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("mainban", image);
    dispatch(add_banner(formData));
  };

  const update = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("mainban", image);
    dispatch(update_banner({ info: formData, bannerId: banner._id }));
  };

  useEffect(() => {
    dispatch(get_banner(productId));
  }, [productId]);

  return (
    <div className="bg-gradient-to-br bg-[#cdcae9] min-h-screen px-4 lg:px-7 pt-3 pb-9 font-sans">
      
      {/* Main Card Container */}
      <div className="w-full p-6 sm:p-8 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200/50">
        <h1 className="text-xl font-bold text-slate-800 mb-6 uppercase tracking-wide">
          Add / Update Banner
        </h1>

        <div className="w-full">
          {!banner && (
            <div>
              <form onSubmit={add}>
                <div className="mb-6">
                  {/* Updated Dropzone UI */}
                  <label
                    className="flex justify-center items-center flex-col h-[200px] cursor-pointer border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-400 w-full text-slate-600 rounded-xl transition-all duration-300 shadow-sm"
                    htmlFor="image"
                  >
                    <span className="text-5xl text-indigo-500 mb-3 opacity-80 hover:scale-110 transition-transform duration-300">
                      <FaRegImage />
                    </span>
                    <span className="font-semibold text-slate-700">Select Banner Image</span>
                    <span className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF</span>
                  </label>
                  <input
                    required
                    onChange={imageHandle}
                    className="hidden"
                    type="file"
                    id="image"
                  />
                </div>

                {imageShow && (
                  <div className="mb-6 p-2 border border-slate-200 rounded-xl bg-slate-50 shadow-sm">
                    <img className="w-full h-[300px] object-cover rounded-lg" src={imageShow} alt="" />
                  </div>
                )}

                <button
                  disabled={loader ? true : false}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 w-[280px] hover:shadow-indigo-500/30 hover:shadow-lg text-white rounded-lg px-7 py-3 mb-3 font-semibold hover:scale-[1.02] transition-all duration-300 active:scale-95 flex justify-center items-center"
                >
                  {loader ? (
                    <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                  ) : (
                    "Add Banner"
                  )}
                </button>
              </form>
            </div>
          )}

          {banner && (
            <div>
              {
                <div className="mb-6 p-2 border border-slate-200 rounded-xl bg-slate-50 shadow-sm">
                   {/* Current Banner Preview */}
                  <img className="w-full h-[300px] object-cover rounded-lg" src={banner.banner} alt="Current Banner" />
                </div>
              }

              <form onSubmit={update}>
                <div className="mb-6">
                   {/* Updated Dropzone UI */}
                  <label
                    className="flex justify-center items-center flex-col h-[200px] cursor-pointer border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-400 w-full text-slate-600 rounded-xl transition-all duration-300 shadow-sm"
                    htmlFor="image"
                  >
                    <span className="text-5xl text-indigo-500 mb-3 opacity-80 hover:scale-110 transition-transform duration-300">
                      <FaRegImage />
                    </span>
                    <span className="font-semibold text-slate-700">Select New Banner Image</span>
                    <span className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF</span>
                  </label>
                  <input
                    required
                    onChange={imageHandle}
                    className="hidden"
                    type="file"
                    id="image"
                  />
                </div>

                {imageShow && (
                  <div className="mb-6 p-2 border border-slate-200 rounded-xl bg-slate-50 shadow-sm">
                    <img className="w-full h-[300px] object-cover rounded-lg" src={imageShow} alt="New Banner Preview" />
                  </div>
                )}

                <button
                  disabled={loader ? true : false}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 w-[280px] hover:shadow-indigo-500/30 hover:shadow-lg text-white rounded-lg px-7 py-3 mb-3 font-semibold hover:scale-[1.02] transition-all duration-300 active:scale-95 flex justify-center items-center"
                >
                  {loader ? (
                    <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                  ) : (
                    "Update Banner"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBanner;