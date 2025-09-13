import React from 'react';

const CustomerRow = ({ customer }) => {
    return (
        <tr>
            <td className="p-2 border">{customer.name}</td>
            <td className="p-2 border">{customer.phone}</td>
            <td className="p-2 border">{customer.balance}</td>
            <td className="p-2 border">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>
        </tr>
    );
};

export default CustomerRow;
