
import React from 'react';
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6"; 
import Chart from "react-apexcharts";
import { Link } from 'react-router-dom';

const SellerDashboard = () => {

    const state = {
          series: [
            {
              name: "Orders",
              data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 34, 45],
            },
            {
              name: "Revenue",
              data: [67, 39, 45, 56, 90, 56, 23, 56, 87, 78, 67, 78],
            },
            {
              name: "Sales",
              data: [34, 39, 56, 56, 80, 67, 23, 56, 98, 78, 45, 56],
            },
          ],
          options: {
            color: ["#181ee8", "#181ee8"],
            plotOptions: {
              radius: 30,
            },
            chart: {
              background: "transparent",
              foreColor: "#d0d2d6",
            },
            dataLabels: {
              enabled: false,
            },
            strock: {
              show: true,
              curve: ["smooth", "straight", "stepline"],
              lineCap: "butt",
              colors: "#f0f0f0",
              width: 0.5,
              dashArray: 0,
            },
            xaxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apl",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
            legend: {
              position: "top",
            },
            responsive: [
              {
                breakpoint: 565,
                yaxis: {
                  categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apl",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                },
                options: {
                  plotOptions: {
                    bar: {
                      horizontal: true,
                    },
                  },
                  chart: {
                    height: "550px",
                  },
                },
              },
            ],
          },
        };

    return (
        <div className="px-2 md:px-7 pb-20">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
                  <div className="flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
                      <h2 className="text-2xl font-bold">$3434</h2>
                      <span className="text-sm font-bold">Total Salse</span>
                    </div>
        
                    <div className="w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl">
                      <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
                    </div>
                  </div>
        
                  <div className="flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
                      <h2 className="text-2xl font-bold">50</h2>
                      <span className="text-sm font-bold">Products</span>
                    </div>
        
                    <div className="w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl">
                      <MdProductionQuantityLimits className="text-[#fae8e8] shadow-lg" />
                    </div>
                  </div>
        
                  <div className="flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
                      <h2 className="text-2xl font-bold">10</h2>
                      <span className="text-sm font-bold">Orders</span>
                    </div>
        
                    <div className="w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl">
                      <FaCartShopping className="text-[#fae8e8] shadow-lg" />
                    </div>
                  </div>
        
                  <div className="flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
                      <h2 className="text-2xl font-bold">1</h2>
                      <span className="text-sm font-bold">Pending Orders</span>
                    </div>
        
                    <div className="w-[40px] h-[47px] rounded-full bg-[#0200f8] flex justify-center items-center text-xl">
                      <FaCartShopping className="text-[#fae8e8] shadow-lg" />
                    </div>
                  </div>
                </div>
        
                <div className="w-full flex flex-wrap mt-7">
                  <div className="w-full lg:w-7/12 lg:pr-3">
                    <div className="w-full bg-[#6a5fdf] p-4 rounded-md">
                      <Chart
                        options={state.options}
                        series={state.series}
                        type="bar"
                        height={350}
                      />
                    </div>
                  </div>
        
                  <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
                    <div className="w-full bg-[#6a5fdf] p-4 rounded-md text-[#d0d2d6]">
                      <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
                          Recent Customer Message
                        </h2>
                        <Link className="font-semibold text-sm text-[#d0d2d6]">
                          View All
                        </Link>
                      </div>
        
                      <div className="flex flex-col gap-2 pt-6 text-[#d0d2d6]">
                        <ol className="relative ml-4 ">
                          <li className="mb-3  ml-6">
                            <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10">
                              <img
                                src="/public/image/admin.png"
                                alt=""
                                className="w-full rounded-full h-full shadow-lg"
                              />
                            </div>
        
                            <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                              <div className="flex justify-between items-center mb-2">
                                <Link className="text-md font-normal">Seller</Link>
                                <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                                  2 day ago
                                </time>
                              </div>
                              <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                                How are you
                              </div>
                            </div>
                          </li>
        
                          <li className="mb-3  ml-6">
                            <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10">
                              <img
                                src="/public/image/admin.png"
                                alt=""
                                className="w-full rounded-full h-full shadow-lg"
                              />
                            </div>
        
                            <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                              <div className="flex justify-between items-center mb-2">
                                <Link className="text-md font-normal">Customer</Link>
                                <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                                  2 day ago
                                </time>
                              </div>
                              <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                                How are you
                              </div>
                            </div>
                          </li>
        
                          <li className="mb-3  ml-6">
                            <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10">
                              <img
                                src="/public/image/admin.png"
                                alt=""
                                className="w-full rounded-full h-full shadow-lg"
                              />
                            </div>
        
                            <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                              <div className="flex justify-between items-center mb-2">
                                <Link className="text-md font-normal">Admin</Link>
                                <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                                  2 day ago
                                </time>
                              </div>
                              <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                                How are you
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
        
                <div className="w-full p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200/50 mt-6">
                  <div className="flex justify-between items-center pb-4 mb-2 border-b border-slate-200">
                    <h2 className="font-bold text-xl text-slate-800">
                      Recent Orders
                    </h2>
                    <Link className="font-semibold text-sm text-indigo-600 hover:text-indigo-700 transition-colors">
                      View All
                    </Link>
                  </div>
        
                  <div className="relative overflow-x-auto mt-4 rounded-xl border border-slate-200 shadow-md">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-gradient-to-r from-indigo-600 to-purple-600 text-white tracking-wider">
                        <tr>
                          <th scope="col" className="py-4 px-6 font-bold">
                            Order Id
                          </th>
                          <th scope="col" className="py-4 px-6 font-bold">
                            Price
                          </th>
                          <th scope="col" className="py-4 px-6 font-bold">
                            Payment Status
                          </th>
                          <th scope="col" className="py-4 px-6 font-bold">
                            Order Status
                          </th>
                          <th scope="col" className="py-4 px-6 font-bold">
                            Action
                          </th>
                        </tr>
                      </thead>
        
                      <tbody className='bg-white'>
                        {
                            [1, 2, 3, 4, 5].map((d, i) => (
                          <tr key={i} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300">
                            <td
                              scope="row"
                              className="py-4 px-6 font-semibold whitespace-nowrap text-slate-800"
                            >
                              ##34344
                            </td>
                            <td
                              scope="row"
                              className="py-4 px-6 font-bold whitespace-nowrap text-green-600"
                            >
                              $454
                            </td>
                            <td
                              scope="row"
                              className="py-4 px-6 font-medium whitespace-nowrap"
                            >
                              <span className='px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold'>Pending</span>
                            </td>
                            <td
                              scope="row"
                              className="py-4 px-6 font-medium whitespace-nowrap"
                            >
                              <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold'>Pending</span>
                            </td>
                            <td
                              scope="row"
                              className="py-4 px-6 font-medium whitespace-nowrap"
                            >
                              <Link className='px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95 inline-block font-semibold text-xs'>
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
        
        
                </div>
              </div>
    );
};

export default SellerDashboard;