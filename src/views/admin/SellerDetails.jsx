/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get_seller,seller_status_update,messageClear } from '../../store/Reducers/sellerReducer';
import toast from 'react-hot-toast';

const SellerDetails = () => {
    const dispatch = useDispatch()
    const {seller,successMessage} = useSelector(state=> state.seller)
    const { sellerId } = useParams()

    useEffect(() => {
        dispatch(get_seller(sellerId))

    },[sellerId])

    const [status, setStatus] =  useState('')
    const submit = (e) => {
        e.preventDefault()
        dispatch(seller_status_update({
            sellerId,
            status
        })) 
    }

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
        } 
    },[successMessage])

    useEffect(() => { 
        if (seller) { 
            setStatus(seller.status)
        } 
    },[seller])

    return (
        <div className="px-4 lg:px-7 pt-6 bg-[#cdcae9] min-h-screen font-sans">
            
            <div className="w-full p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200/50">

            <h2 className="font-bold text-xl mb-6 text-slate-800">Seller Details </h2>
            
                <div className="w-full flex flex-wrap gap-6">
                
            {/* Profile Image */}
                <div className="w-full md:w-auto md:flex-shrink-0 flex justify-center items-start">
                    <div className="w-[280px] h-[280px] flex justify-center items-center">
                        {
                            seller?.image ? (
                            <img
                                className="w-full h-full object-contain"
                                src={seller?.image}
                                alt="Seller Profile"/>
                            ) : (
                            <span className="text-slate-600 font-medium">Image Not Uploaded</span>
                            )
                        }
                    </div>
                </div>

                    {/* Basic Info */}
                    <div className="w-full md:flex-1">
                        <div className="px-0 py-2">

                            <div className="py-2 text-xl font-bold text-slate-800 mb-2">
                                <h2>Basic Info</h2>
                            </div>

                            <div className="flex flex-col gap-4 p-5 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-semibold text-slate-600">Name :</span>
                                    <span className="text-slate-800 font-medium">{ seller?.name }</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-semibold text-slate-600">Email :</span>
                                    <span className="text-slate-800 font-medium">{ seller?.email }</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-semibold text-slate-600">Role :</span>
                                    <span className="text-slate-800 font-medium">{ seller?.role }</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-semibold text-slate-600">Status :</span>
                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700">{ seller?.status } </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-semibold text-slate-600">Payment Status :</span>
                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">{ seller?.payment }</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Address Info */}
                    <div className="w-full md:flex-1">
                        <div className="px-0 py-2">
                            <div className="py-2 text-xl font-bold text-slate-800 mb-2">
                                <h2>Address</h2>
                            </div>
                            <div className="flex flex-col gap-4 p-5 bg-gradient-to-br from-slate-50 to-purple-50 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-semibold text-slate-600">Shop Name :</span>
                                    <span className="text-slate-800 font-medium">{seller?.shopInfo?.shopName}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-semibold text-slate-600">Shop Address :</span>
                                    <span className="text-slate-800 font-medium">{seller?.shopInfo?.division} </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-semibold text-slate-600">District :</span>
                                    <span className="text-slate-800 font-medium">{seller?.shopInfo?.district}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-semibold text-slate-600">State :</span>
                                    <span className="text-slate-800 font-medium">{seller?.shopInfo?.sub_district}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                {/* Status Update Form */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                    <form onSubmit={submit}>
                        <div className="flex flex-col sm:flex-row items-center gap-4 py-3">
                            <select value={status} onChange={(e)=>setStatus(e.target.value)}
                                className="w-full sm:w-auto px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all cursor-pointer"
                                name="status"
                                id="status"
                                required>
                                <option value="">--Select Status--</option>
                                <option value="active">Active</option>
                                <option value="deactive">Deactive</option>
                            </select>
                            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 w-full sm:w-auto shadow-lg hover:shadow-xl text-white rounded-lg px-8 py-2.5 font-semibold transition-all duration-300 hover:scale-105 active:scale-95">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default SellerDetails;