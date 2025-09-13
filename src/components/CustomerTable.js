import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import editIcon from './editing.png';
import deleteIcon from './bin.png';
import settleIcon from './settle.png'; 
import searchIcon from './search.png';

const CustomerTable = ({ customers, onEditCustomer, onDeleteCustomer, onSettleTransaction }) => {
    const navigate = useNavigate();
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const dropdownRef = useRef(null);

    const handleViewClick = (phone) => {
        navigate(`/customers-by-phone/${phone}`);
    };

    const handleSettleClick = (customer) => {
        onSettleTransaction(customer);
    };

    const toggleDropdown = (customerId) => {
        setSelectedCustomerId(selectedCustomerId === customerId ? null : customerId);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setSelectedCustomerId(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <table className="w-11/12 mx-auto bg-white border border-gray-200">
            <thead>
                <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-r border-gray-300 text-center font-AVENIR-H">Name</th>
                    <th className="py-2 px-4 border-r border-gray-300 text-center font-AVENIR-H">Phone No</th>
                    <th className="py-2 px-4 border-r border-gray-300 text-center font-AVENIR-H">Balance</th>
                    <th className="py-2 px-4 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id} className="text-center border-t border-gray-300">
                        <td className="py-2 px-3 border-r border-gray-300 font-AVENIR-M">{customer.name}</td>
                        <td className="py-2 px-3 border-r border-gray-300 font-AVENIR-M">{customer.phone}</td>
                        <td 
                            className={`py-2 px-3 border-r border-gray-300 font-AVENIR-M ${customer.balance < 0 ? 'text-red-500' : 'text-green-600'}`}
                        >
                            {Math.abs(customer.balance).toLocaleString('en-IN')}
                        </td>
                        <td className="py-2 px-4 flex items-center justify-center space-x-">
                            {/* Above md breakpoint, show actions normally */}
                            <div className="hidden md:flex space-x-2">
                                <button 
                                    onClick={() => handleSettleClick(customer)} 
                                    className="flex items-center justify-center text-blue-500"
                                >
                                    <img src={settleIcon} alt="Settle" className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => handleViewClick(customer.phone)} 
                                    className="flex items-center justify-center text-blue-500"
                                >
                                    <img src={searchIcon} alt="Search" className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => onEditCustomer(customer)} 
                                    className="flex items-center justify-center opacity-80"
                                >
                                    <img src={editIcon} alt="Edit" className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => onDeleteCustomer(customer.id)} 
                                    className="flex items-center justify-center opacity-60"
                                >
                                    <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Below md breakpoint, show dropdown menu */}
                            <div className="md:hidden relative">
                                <button 
                                    onClick={() => toggleDropdown(customer.id)} 
                                    className="flex items-center justify-center text-blue-500"
                                >
                                    <img src={searchIcon} alt="Actions" className="w-5 h-5" />
                                </button>
                                {selectedCustomerId === customer.id && (
                                    <div 
                                        ref={dropdownRef} 
                                        className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10"
                                    >
                                        <button 
                                            onClick={() => handleSettleClick(customer)} 
                                            className="w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-100"
                                        >
                                            Settle
                                        </button>
                                        <button 
                                            onClick={() => handleViewClick(customer.phone)} 
                                            className="w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-100"
                                        >
                                            View
                                        </button>
                                        <button 
                                            onClick={() => onEditCustomer(customer)} 
                                            className="w-full px-4 py-2 text-left opacity-80 hover:bg-gray-100"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => onDeleteCustomer(customer.id)} 
                                            className="w-full px-4 py-2 text-left opacity-60 hover:bg-gray-100"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomerTable;
