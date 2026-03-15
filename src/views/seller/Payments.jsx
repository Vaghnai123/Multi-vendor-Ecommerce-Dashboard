/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useState } from "react";
import { MdCurrencyExchange } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  get_seller_payment_details,
  messageClear,
  send_withdrowal_request,
} from "../../store/Reducers/PaymentReducer";
import toast from "react-hot-toast";
import moment from "moment";
import { FixedSizeList as List } from "react-window";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Payments = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    successMessage,
    errorMessage,
    loader,
    pendingWithdrows,
    successWithdrows,
    totalAmount,
    withdrowAmount,
    pendingAmount,
    availableAmount,
  } = useSelector((state) => state.payment);

  const [amount, setAmount] = useState(0);

  const sendRequest = (e) => {
    e.preventDefault();
    if (availableAmount - amount > 10) {
      dispatch(send_withdrowal_request({ amount, sellerId: userInfo._id }));
      setAmount(0);
    } else {
      toast.error("Insufficient Balance");
    }
  };

  const Row = ({ index, style }) => {
    return (
      <div
        style={style}
        className="flex items-center text-xs sm:text-sm font-medium border-b border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300"
      >
        <div className="w-[25%] p-2 sm:p-3 whitespace-nowrap text-slate-800 font-semibold">
          {index + 1}
        </div>
        <div className="w-[25%] p-2 sm:p-3 whitespace-nowrap text-green-600 font-bold">
          ${pendingWithdrows[index]?.amount}
        </div>
        <div className="w-[25%] p-2 sm:p-3 whitespace-nowrap">
          <span className="px-2 py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-orange-100 text-orange-700">
            {pendingWithdrows[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 sm:p-3 whitespace-nowrap text-slate-600 text-[11px] sm:text-sm">
          {moment(pendingWithdrows[index]?.createdAt).format('LL')}
        </div>
      </div>
    );
  };

  const Rows = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm text-white font-medium">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          ${successWithdrows[index]?.amount}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm">
            {successWithdrows[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {" "}
          {moment(successWithdrows[index]?.createdAt).format("LL")}{" "}
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(get_seller_payment_details(userInfo._id));
  }, []);

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

  return (
    <div className="px-2 md:px-7 pb-18 bg-[#cdcae9] min-h-screen">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5">
        <div className="flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-2xl font-bold">₹{totalAmount}</h2>
            <span className="text-sm font-bold">Total Salse</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-2xl font-bold">₹{availableAmount}</h2>
            <span className="text-sm font-bold">Available Amount</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-2xl font-bold">₹{withdrowAmount}</h2>
            <span className="text-sm font-bold">Withdraw Amount</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-2xl font-bold">₹{pendingAmount}</h2>
            <span className="text-sm font-bold">Pending Amount</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full bg-[#0200f8] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 pb-4">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6">
          <h2 className="text-slate-800 text-xl font-bold mb-5">
            Send Request
          </h2>
          <div className="mb-6">
            <form onSubmit={sendRequest}>
              <div className="flex gap-3 flex-wrap">
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  min="0"
                  type="number"
                  className="px-4 py-3 md:w-[70%] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none bg-slate-50 border border-slate-300 rounded-lg text-slate-700 placeholder-slate-400"
                  name="amount"
                  placeholder="Enter amount"
                />
                <button
                  disabled={loader}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg text-white font-semibold rounded-lg px-7 py-3 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {loader ? "loading.." : "Submit"}
                </button>
              </div>
            </form>
          </div>

          <div>
            <h2 className="text-slate-800 text-lg font-bold mb-4">
              Pending Request
            </h2>

            <div className="w-full overflow-x-auto rounded-xl border border-slate-200 shadow-md">
              <div className="flex bg-gradient-to-r from-indigo-600 to-purple-600 uppercase text-xs font-bold text-white min-w-[340px] tracking-wider">
                <div className="w-[25%] p-4">No</div>
                <div className="w-[25%] p-4">Amount</div>
                <div className="w-[25%] p-4">Status</div>
                <div className="w-[25%] p-4">Date</div>
              </div>
              {
                <List
                  style={{ minWidth: "340px", backgroundColor: "white" }}
                  className="List scrollbar-hide"
                  height={350}
                  itemCount={pendingWithdrows.length}
                  itemSize={55}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6">
          <div>
            <h2 className="text-slate-800 text-lg font-bold mb-4">
              Success Withdrawal
            </h2>

            <div className="w-full overflow-x-auto rounded-xl border border-slate-200 shadow-md">
              <div className="flex bg-gradient-to-r from-indigo-600 to-purple-600 uppercase text-xs font-bold text-white min-w-[340px] tracking-wider">
                <div className="w-[25%] p-4">No</div>
                <div className="w-[25%] p-4">Amount</div>
                <div className="w-[25%] p-4">Status</div>
                <div className="w-[25%] p-4">Date</div>
              </div>
              {
                <List
                  style={{ minWidth: "340px", backgroundColor: "white" }}
                  className="List"
                  height={350}
                  itemCount={successWithdrows.length}
                  itemSize={55}
                  outerElementType={outerElementType}
                >
                  {Rows}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
