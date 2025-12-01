import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";

function handleOnWheel({ deltaY }) {
console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
<div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {

const Row = ({ index, style }) => {
return (
<div style={style} className="flex items-center text-xs sm:text-sm font-medium border-b border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300">

    <div className="w-[20%] p-2 sm:p-3 whitespace-nowrap text-slate-800 font-semibold">{index + 1}</div>
    <div className="w-[20%] p-2 sm:p-3 whitespace-nowrap text-green-600 font-bold">$3434</div>
    <div className="w-[20%] p-2 sm:p-3 whitespace-nowrap">
    <span className="px-2 py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-orange-100 text-orange-700"> Pending </span> </div>
    <div className="w-[20%] p-2 sm:p-3 whitespace-nowrap text-slate-600 text-[11px] sm:text-sm">25 Dec 2025</div>
    <div className="w-[20%] p-2 sm:p-3 whitespace-nowrap">
    <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg px-3 sm:px-4 py-1.5 cursor-pointer text-white rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-105 active:scale-95"> 
    Confirm </button>
</div>
</div>

);
};

return (
<div className="px-4 lg:px-7 pt-6 bg-[#cdcae9] min-h-screen">
      <div className="w-full p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200/50">
      <h2 className="font-bold text-xl mb-6 text-slate-800">Withdrawal Request</h2>
          <div className="w-full overflow-x-auto rounded-xl border border-slate-200 shadow-md">
                <div className="flex bg-gradient-to-r from-indigo-600 to-purple-600 uppercase text-[10px] sm:text-xs font-bold text-white min-w-[500px] tracking-wider">
                  <div className="w-[20%] p-3 sm:p-4">No</div>
                  <div className="w-[20%] p-3 sm:p-4">Amount</div>
                  <div className="w-[20%] p-3 sm:p-4">Status</div>
                  <div className="w-[20%] p-3 sm:p-4">Date</div>
                  <div className="w-[20%] p-3 sm:p-4">Action</div>
                </div>
<div>
<List
 style={{ minWidth: "500px", backgroundColor: 'white' }}
 className="List"
 height={350}
 itemCount={100}
 itemSize={55}
 outerElementType={outerElementType}>
{Row}
</List>
</div>

          </div>
      </div>
</div>
);
};

export default PaymentRequest;
