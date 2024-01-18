import Navbar from "../Layout/Navbar";
import MyDateRangePicker from './DateRage';
import Data from "./Data/Data";
import { useState } from "react";
const Dashboard = () => {
    const [selectedDateRange, setSelectedDateRange] = useState(null);

    const handleDateRangeChange = (dateRange) => {
        setSelectedDateRange(dateRange);
    };
    return (
        <>
            <Navbar />
            <div className="p-6">
                <div className="">
                    <h1 className="font-semibold text-4xl mb-3">Laporan Analytics</h1>
                </div>
                <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start">
                    <div className="mb-4 lg:mb-0 lg:mr-4">
                        <MyDateRangePicker onChange={handleDateRangeChange} />
                        <div className="flex items-center mt-4">
                            <div className="flex items-center border rounded-md p-1">
                                <input
                                    type="text"
                                    placeholder="Judul Button"
                                    className="outline-none px-9 py-1"
                                />
                                <span className="text-gray-600 ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="relative p-2 lg:w-1/4">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start">
                            <div className="mb-2 lg:mb-0 lg:mr-2">
                                <label htmlFor="">Devices :</label>
                                <select className="appearance-none px-2 border rounded-md">
                                    <option value="" disabled selected></option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                </select>
                            </div>
                            <div className="mb-2 lg:mb-0 lg:mr-2">
                                <label htmlFor="">Tampilkan :</label>
                                <select className="appearance-none px-2 border rounded-md">
                                    <option value="" disabled selected></option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-center mt-3 lg:mt-5 bg-blue-500 rounded-sm text-white p-1">
                            <button className="text-sm">Export Data</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-6 justify-center mt-8">
                    <div className="mb-4 lg:mb-0">
                        <div className="flex items-center border rounded-md p-1">
                            <input
                                type="text"
                                placeholder="Nama User"
                                className="outline-none px-2 py-1"
                            />
                            <span className="text-gray-600 ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="mb-4 lg:mb-0">
                        <div className="flex items-center border rounded-md p-1">
                            <input
                                type="text"
                                placeholder="Email User"
                                className="outline-none px-2 py-1"
                            />
                            <span className="text-gray-600 ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="mb-4 lg:mb-0">
                        <div className="flex items-center border rounded-md p-1">
                            <input
                                type="text"
                                placeholder="No WhatsApp"
                                className="outline-none px-2 py-1"
                            />
                            <span className="text-gray-600 ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <Data dateRange={selectedDateRange} />
            </div>
        </>
    );
};

export default Dashboard;
