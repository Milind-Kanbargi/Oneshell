import React from 'react';
import { useNavigate } from 'react-router-dom';

const FilterSearchAdd = ({ setFilter, search, setSearch, addCustomer }) => {
  const navigate = useNavigate();

  // Function to handle view by phone number
  const handleViewByPhone = () => {
    const phoneNumber = prompt('Enter phone number to search:');
    if (phoneNumber) {
      navigate(`/customers-by-phone/${phoneNumber}`);
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className='md:ml-16'>
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border !border-slate-400 ml-2  p-2 px-2 rounded "
        >
          <option value="default" >Sort By:</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="payables">Payables</option>
          <option value="receivables">Receivables</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border !border-slate-400 p-2 m-2 rounded"
        />
      </div>
      <div className="flex space-x-2 md:mr-16">
        <button
          onClick={addCustomer}
          className="bg-red-500 text-white p-2  md:px-1 rounded font-AVENIR-M"
        >
          Add Customer
        </button>
    
      </div>
    </div>
  );
};

export default FilterSearchAdd;
