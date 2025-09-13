// src/components/CustomerSidebar.js
import React from 'react';

const CustomerSidebar = ({ customers, onSelectCustomer }) => {
    return (
        <div className="w-1/4 bg-gray-100 p-4 border-r border-gray-300">
            <h2 className="text-lg font-bold mb-4">Customers</h2>
            <ul>
                {customers.map(customer => (
                    <li 
                        key={customer.id} 
                        className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                        onClick={() => onSelectCustomer(customer)}
                    >
                        {customer.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerSidebar;
