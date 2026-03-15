/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { admin_order_status_update, get_admin_order,messageClear } from '../../store/Reducers/couponReducer';
import toast from 'react-hot-toast';
const OrderDetails = () => {

    const { orderId } = useParams();
    const dispatch = useDispatch();
    const [status, setStatus] = useState('')

    const { order, errorMessage, successMessage } = useSelector(state => state.coupon);

    useEffect(() => {
        if (orderId) {
            dispatch(get_admin_order(orderId));
        }
    }, [orderId]);

    useEffect(() => {
        setStatus(order?.delivery_status)
    },[order])

    const status_update = (e) => {
        dispatch(admin_order_status_update({orderId, info: {status: e.target.value} }))
        setStatus(e.target.value)
    }

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
        } 
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())  
        } 
    },[successMessage,errorMessage])

    return (
        <div className='max-w-6xl mx-auto px-4 py-8 font-sans'>

            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
                <h2 className='text-2xl font-bold text-slate-800 mb-2 sm:mb-0'>Order Details</h2>
                <select 
                    name="status" 
                    id="status" 
                    onChange={status_update} 
                    value={status}
                    defaultValue={order.delivery_status}
                    className='w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all cursor-pointer hover:border-emerald-500'>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="placed">Placed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
                <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>

                    <div>
                        <h2 className='text-slate-800 text-lg font-bold flex items-center gap-2'>
                            Order <span className='text-slate-500 font-mono text-base font-normal'>#{order._id}</span>
                        </h2>
                        <div className='flex items-center gap-2 mt-1'>
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <span className='text-slate-500 text-sm font-medium'>
                                Placed on {order.date}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-start md:items-end w-full md:w-auto pl-16 md:pl-0'>
                    <div className='flex items-baseline gap-1'>
                        <span className='text-sm text-slate-500 font-semibold mr-2'>Total Amount :</span>
                        <h2 className='text-lg font-bold text-emerald-600 font-sans'>₹{order.price}</h2>
                    </div>
                    <span className='text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full font-bold mt-1.5 inline-block uppercase'>
                        {order.payment_status}
                    </span>
                </div>
            </div>

            {/* Shipping & Status Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                <div className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full'>
                    <div className='flex items-center gap-3 mb-4'>
                        <span className='bg-blue-50 text-blue-600 p-2 rounded-lg'>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </span>
                        <h2 className='text-slate-800 font-bold text-lg'>Delivery Information</h2>
                    </div>

                    <div className='space-y-3 pl-1'>
                        <div className='pt-2'>
                            <p className='text-xs text-slate-400 uppercase font-bold tracking-wider mb-1'>Delivering To</p>
                            <p className='text-slate-700 font-semibold text-base'>{order.shippingInfo?.name} </p>
                        </div>
                        <div className='pt-2'>
                            <p className='text-xs pb-3 text-slate-400 uppercase font-bold tracking-wider mb-1'>Address</p>
                            <div className='flex items-start gap-2'>
                                <span className='bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide mt-0.5'>Home</span>
                                <span className='text-slate-800 text-sm font-medium'>
                                    {order.shippingInfo?.address}, {order.shippingInfo?.area},  {order.shippingInfo?.city}, {order.shippingInfo?.province}, {order.shippingInfo?.post}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Status */}
                <div className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full'>
                    <div className='flex items-center gap-3 mb-6'>
                        <span className='bg-emerald-50 text-emerald-600 p-2 rounded-lg'>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                        </span>
                        <h2 className='text-slate-800 font-bold text-lg'>Order Status</h2>
                    </div>

                    <div className='space-y-6'>
                        <div className='flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100'>
                            <span className='text-slate-600 font-medium'>Payment Status</span>
                            <span className='py-1.5 px-4 text-xs font-bold uppercase tracking-wide rounded-full border bg-emerald-100 text-emerald-700 border-emerald-200'>
                                {order.payment_status}
                            </span>
                        </div>
                        <div className='flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100'>
                            <span className='text-slate-600 font-medium'>Delivery Status</span>
                            <span className='py-1.5 px-4 text-xs font-bold uppercase tracking-wide rounded-full border bg-yellow-100 text-yellow-700 border-yellow-200'>
                                {order.delivery_status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product List */}
            <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6'>
                <div className='p-6 border-b border-slate-200'>
                    <h2 className='text-slate-800 font-bold text-lg'>Order Products</h2>
                </div>
                <div className='divide-y divide-slate-100'>
                    <div className='p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors'>
                    {
                         order.products && order.products.map((p, i) => <div key={i} className='flex items-start gap-4 flex-1'>
                            <div className='shrink-0 w-20 h-20 bg-slate-100 rounded-xl overflow-hidden border border-slate-200'>
                                <img className='w-full h-full object-cover' src={p.images[0]} alt="Rolex Watch" />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='text-slate-800 font-medium text-md'>
                                    {p.name}
                                </div>
                                <div className='flex items-center gap-4 text-sm'>
                                    <span className='text-slate-600 font-medium text-sm'>Brand : <span className='text-emerald-600 font-medium'>{p.brand}</span></span>
                                    <span className='w-1 h-1 bg-slate-300 rounded-full'></span>
                                    <span className='text-slate-600 font-medium text-sm'>Qty : <span className='text-slate-700 font-medium'>{p.quantity}</span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;