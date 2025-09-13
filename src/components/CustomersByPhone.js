import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const CustomersByPhone = () => {
  const { phoneNumber } = useParams();
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const q = query(collection(db, 'customers'), where('phone', '==', phoneNumber));
        const querySnapshot = await getDocs(q);
        const fetchedCustomers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (fetchedCustomers.length === 0) {
          setError('No customers found with this phone number.');
        }
        setCustomers(fetchedCustomers);
      } catch (err) {
        setError('Error fetching customers.');
        console.error('Error fetching customers:', err);
      }
    };

    fetchCustomers();
  }, [phoneNumber]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Customers with Phone Number: {phoneNumber}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {customers.length > 0 && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map(customer => (
              <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.balance.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomersByPhone;
