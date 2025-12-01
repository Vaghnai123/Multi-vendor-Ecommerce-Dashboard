import React from 'react';

const OrderDetails = () => {
    return (
        // Poora page ke liye light background aur behtar padding
        <div className="bg-gradient-to-br bg-[#cdcae9] min-h-screen p-4 md:p-6 font-sans">
            <div className="w-full p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200/50">

                {/* Header Section */}
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-slate-200 mb-4'>
                    <h2 className='text-2xl font-bold text-slate-800 mb-2 sm:mb-0'>Order Details</h2>
                    <select name="status" id="status" className='w-full sm:w-auto px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="warehouse">Warehouse</option>
                        <option value="placed">Placed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Order Info Section */}
                <div className='p-4'>
                    <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-lg mb-6'>
                        <h3 className='font-bold text-slate-800'>#3434</h3>
                        <span className='text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold'>3-9-2025</span>
                    </div>


                    <div className='flex flex-col lg:flex-row gap-8'>
                        {/* Left Column - Responsive width */}
                        <div className='w-full lg:w-1/3'>
                            <div className='space-y-4 text-slate-700 text-base'>
                                <div className='space-y-1'>
                                    <h2 className='pb-2 font-semibold text-xl text-slate-800 border-b border-slate-200'>Deliver To : Rahul</h2>
                                    <p className='text-slate-600'>
                                        Krishan Arcade, Near Tulshi Residency, Ahmedabad, Gujarat
                                    </p>
                                </div>

                                <div className='flex justify-between items-center pt-2'>
                                    <h3 className='font-semibold text-slate-700'>Payment Status :</h3>
                                    <span className='bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full'>Paid</span>
                                </div>
                                <div className='flex justify-between items-center text-xl font-bold text-slate-800'>
                                    <span>Total Price  :</span>
                                    <span className='text-green-600'>₹5000</span>
                                </div>

                                {/* Order Summary Card */}
                                <div className='mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border border-slate-200 shadow-md'>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Order Summary</h3>
                                    <div className='flex items-center gap-4'>
                                        <img className='w-16 h-16 rounded-lg object-cover flex-shrink-0 shadow-md border-2 border-slate-200' src="/public/image/category/2.jpg" alt="Product" />
                                        <div>
                                            <h4 className='font-semibold text-slate-800'>Rolex Watch</h4>
                                            <p className="text-sm text-slate-600">
                                                <span>Brand : </span>
                                                <span className="font-medium text-slate-700">Zorko</span>
                                            </p>
                                            <p className="text-lg font-bold text-slate-800">
                                                Quantity : 5
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Right Column - Responsive width */}
                        <div className='w-full lg:w-2/3'>
                            <div className='space-y-6'>
                                {/* Seller 1 Card */}
                                <div className='bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border border-slate-200 shadow-md'>
                                    <div className='flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-2'>
                                        <h3 className='font-semibold text-slate-800 text-lg'>Seller 1 Order</h3>
                                        <span className='bg-yellow-100 text-yellow-700 text-sm font-semibold px-3 py-1 rounded-full self-start'>Pending</span>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <img className='w-16 h-16 rounded-lg object-cover flex-shrink-0 shadow-md border-2 border-slate-200' src="/public/image/category/2.jpg" alt="Product" />
                                        <div>
                                            <h4 className='font-semibold text-slate-800'>Rolex Watch</h4>
                                            <p className='text-sm text-slate-600'>
                                                <span>Brand : </span>
                                                <span className='font-medium text-slate-700'>Zorko</span>
                                            </p>
                                            <p className='text-lg font-bold text-slate-800'>
                                                Quantity : 5
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Yahan aap aur seller cards add kar sakte hain */}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderDetails;