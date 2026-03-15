import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add_coupon, get_coupons, delete_coupon, messageClear } from '../../store/Reducers/couponReducer'; 
import toast from 'react-hot-toast';

import { FiTrash2, FiTag, FiPercent, FiDollarSign, FiCalendar, FiLayers } from 'react-icons/fi';
import { BiTargetLock } from 'react-icons/bi';
import { LuIndianRupee } from "react-icons/lu";

const Coupons = () => {
    const dispatch = useDispatch();
    const { loader, successMessage, errorMessage, coupons } = useSelector(state => state.coupon);

    const [state, setState] = useState({
        code: '',
        discountValue: '',
        type: 'percent',
        minAmount: '',
        expiryDate: ''
    });

    useEffect(() => {
        dispatch(get_coupons());
    }, [dispatch]);

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(add_coupon(state));
    };

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to remove this coupon?")) {
            dispatch(delete_coupon(id));
        }
    }

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            setState({ code: '', discountValue: '', type: 'percent', minAmount: '', expiryDate: '' });
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    return (
        <div className='px-2 lg:px-7 pt-5 pb-10  min-h-screen'>
            {/* Header Area */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-violet-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-violet-600">
                    <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight leading-none">Coupon Management</h1>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
                
                {/* Left Side: Create Form  */}
                <div className='lg:col-span-4'>
                    <div className='bg-white rounded-2xl shadow-[0_5px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-6 sticky top-5'>
                        <div className='flex items-center gap-3 mb-6 pb-4 border-b border-gray-100'>
                            <div className='w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600'>
                                <FiTag size={20}/>
                            </div>
                            <h2 className='text-lg font-bold text-gray-800'>New Coupon</h2>
                        </div>

                        <form onSubmit={submit}>
                            {/* Code Input */}
                            <div className='mb-5'>
                                <label className='text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block'>Coupon Code</label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400'>
                                        <FiLayers />
                                    </div>
                                    <input 
                                        onChange={inputHandle} 
                                        value={state.code} 
                                        className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none uppercase placeholder:normal-case' 
                                        type="text" 
                                        name="code" 
                                        required 
                                        placeholder="SUMMER50"  />
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-4 mb-5'>
                                {/* Discount Value */}
                                <div>
                                    <label className='text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block'>Value</label>
                                    <div className='relative'>
                                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400'>
                                            <FiPercent />
                                        </div>
                                        <input 
                                            onChange={inputHandle} 
                                            value={state.discountValue} 
                                            className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none' 
                                            type="number" 
                                            name="discountValue" 
                                            required 
                                            placeholder="20" />
                                    </div>
                                </div>
                                {/* Discount Type */}
                                <div>
                                    <label className='text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block'>Type</label>
                                    <div className='relative'>
                                        <select 
                                            onChange={inputHandle} 
                                            value={state.type} 
                                            className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none cursor-pointer appearance-none' 
                                            name="type">
                                            <option value="percent">Percent (%)</option>
                                            <option value="fixed">Fixed (₹)</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Min Amount */}
                            <div className='mb-5'>
                                <label className='text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block'>Min Order Amount</label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400'>
                                        <LuIndianRupee />
                                    </div>
                                    <input 
                                        onChange={inputHandle} 
                                        value={state.minAmount} 
                                        className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none' 
                                        type="number" 
                                        name="minAmount" 
                                        required 
                                        placeholder="500" />
                                </div>
                            </div>

                            {/* Expiry Date */}
                            <div className='mb-6'>
                                <label className='text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block'>Expiry Date</label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400'>
                                        <FiCalendar />
                                    </div>
                                    <input 
                                        onChange={inputHandle} 
                                        value={state.expiryDate} 
                                        className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none' 
                                        type="date" 
                                        name="expiryDate" 
                                        required 
                                    />
                                </div>
                            </div>

                            <button disabled={loader} className='w-full bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-violet-500/30 transition-all duration-300 transform hover:-translate-y-1'>
                                {loader ? 'Processing...' : 'Create Coupon'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Side: Table */}
                <div className='lg:col-span-8'>
                    <div className='bg-white rounded-2xl shadow-[0_5px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden'>
                        <div className='p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50'>
                            <h2 className='text-lg font-bold text-gray-800'>Active Campaigns</h2>
                            <span className='px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-bold'>{coupons.length} Active</span>
                        </div>
                        
                        <div className='overflow-x-auto'>
                            <table className='w-full text-left'>
                                <thead className='bg-white text-gray-500 border-b border-gray-100'>
                                    <tr>
                                        <th className='py-4 px-6 text-xs font-bold uppercase tracking-wider'>Coupon Info</th>
                                        <th className='py-4 px-6 text-xs font-bold uppercase tracking-wider'>Type  </th>
                                        <th className='py-4 px-6 text-xs font-bold uppercase tracking-wider'>Expiry</th>
                                        <th className='py-4 px-6 text-xs font-bold uppercase tracking-wider text-right'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-50'>
                                    {
                                        coupons.map((c, i) => (
                                            <tr key={i} className='hover:bg-gray-50/80 transition-colors duration-200 group'>
                                                <td className='py-4 px-6'>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-violet-100 group-hover:text-violet-600 transition-colors'>
                                                            <FiTag />
                                                        </div>
                                                        <div>
                                                            <p className='font-bold text-gray-800 uppercase'>{c.code}</p>
                                                            <p className='text-xs font-medium text-gray-600'>Min : ₹{c.minAmount}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-4 px-6'>
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                                                        c.type === 'percent' 
                                                        ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                                                        : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                                    }`}>
                                                        {c.type === 'percent' ? <FiPercent size={10}/> : <LuIndianRupee size={10}/>}
                                                        {c.discountValue}{c.type === 'percent' ? '%' : ''} Off
                                                    </span>
                                                </td>
                                                <td className='py-4 px-6'>
                                                    <div className='flex items-center gap-2 text-gray-600 text-sm'>
                                                        <BiTargetLock className='text-gray-400'/>
                                                        {new Date(c.expiryDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                                    </div>
                                                </td>
                                                <td className='py-4 px-6 text-right'>
                                                    <button 
                                                        onClick={() => handleDelete(c._id)} 
                                                        className='w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all ml-auto'
                                                        title="Delete">
                                                        <FiTrash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {coupons.length === 0 && (
                                <div className='p-10 flex flex-col items-center justify-center text-gray-400'>
                                    <FiLayers size={40} className='mb-3 opacity-20'/>
                                    <span className='text-sm font-medium'>No active coupons found</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Coupons;