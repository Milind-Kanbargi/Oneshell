// src/App.js
import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Greeting from './components/Greetings';
import Summary from './components/Summary';
import FilterSearchAdd from './components/FilterSearchAdd';
import CustomerTable from './components/CustomerTable';
import Navbar from './components/Navbar';
import AddCustomerModal from './components/AddCustomerModal';
import SettleTransactionModal from './components/SettleTransactionModal';
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';
import Support from './components/Support';
import CustomersByPhone from './components/CustomersByPhone';
import './index.css';

import { db, auth } from './firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState('default');
  const [search, setSearch] = useState('');
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isSettleTransactionModalOpen, setIsSettleTransactionModalOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('isAuthenticated'));

  // Fetch customers from Firestore
  const fetchCustomers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'customers'));
      setCustomers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching customers: ", error);
    }
  };

  // Fetch customers when component mounts
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Add or update customer in Firestore
  const addCustomer = async (customer) => {
    try {
      // Ensure balance is initialized
      customer.balance = customer.balance || 0;

      if (customerToEdit) {
        // Update existing customer
        await updateDoc(doc(db, 'customers', customerToEdit.id), customer);
        setCustomers(customers.map(c => (c.id === customerToEdit.id ? { ...customer, id: c.id } : c)));
      } else {
        // Add new customer
        const docRef = await addDoc(collection(db, 'customers'), customer);
        setCustomers([...customers, { ...customer, id: docRef.id }]);
      }
      setIsAddCustomerModalOpen(false);
    } catch (error) {
      console.error("Error adding or updating customer: ", error);
    }
  };

  // Settle transaction
  const settleTransaction = async (updatedCustomer) => {
    try {
      await updateDoc(doc(db, 'customers', updatedCustomer.id), { balance: updatedCustomer.balance });
      setCustomers(customers.map(c => (c.id === updatedCustomer.id ? updatedCustomer : c)));
      setIsSettleTransactionModalOpen(false);
    } catch (error) {
      console.error("Error settling transaction: ", error);
    }
  };

  // Edit customer
  const handleEditCustomer = (customer) => {
    setCustomerToEdit(customer);
    setIsAddCustomerModalOpen(true);
  };

  // Delete customer from Firestore
  const deleteCustomer = async (id) => {
    try {
      await deleteDoc(doc(db, 'customers', id));
      setCustomers(customers.filter(customer => customer.id !== id));
    } catch (error) {
      console.error("Error deleting customer: ", error);
    }
  };

  // Filtering and sorting logic
  const filteredCustomers = customers
    .filter((customer) => {
      if (filter === 'payables') return customer.balance < 0;
      if (filter === 'receivables') return customer.balance > 0;

      const searchLower = search.toLowerCase();
      return (
        customer.name.toLowerCase().startsWith(searchLower) ||
        customer.phone.startsWith(searchLower)
      );
    })
    .sort((a, b) => {
      if (filter === 'a-z') return a.name.localeCompare(b.name);
      if (filter === 'z-a') return b.name.localeCompare(a.name);
      return 0;
    });

  // Handle search error
  useEffect(() => {
    if (search && !filteredCustomers.length) {
      setError('No results found for your search.');
    } else {
      setError('');
    }
  }, [search, filter, customers]);

  // Calculate totals
  const totalPayables = customers.reduce((acc, customer) => acc + (customer.balance < 0 ? customer.balance : 0), 0);
  const totalReceivables = customers.reduce((acc, customer) => acc + (customer.balance > 0 ? customer.balance : 0), 0);
  const totalBalance = customers.reduce((acc, customer) => acc + customer.balance, 0);

  // Check authentication state on auth change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <HashRouter>
      <Navbar onLogout={handleLogout} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/customers-by-phone/:phoneNumber" element={<CustomersByPhone />} />
          <Route path="/" element={
            isAuthenticated ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <Greeting />
                  <Summary 
                    totalPayables={totalPayables} 
                    totalReceivables={totalReceivables}
                    totalBalance={totalBalance} 
                  />
                </div>
                <FilterSearchAdd 
                  setFilter={setFilter} 
                  search={search} 
                  setSearch={setSearch} 
                  addCustomer={() => {
                    setCustomerToEdit(null);
                    setIsAddCustomerModalOpen(true);
                  }} 
                />
                {error && <p className="text-red-500">{error}</p>}
                <CustomerTable 
                  customers={filteredCustomers} 
                  onEditCustomer={handleEditCustomer} 
                  onDeleteCustomer={deleteCustomer} 
                  onSettleTransaction={(customer) => {
                    setCustomerToEdit(customer);
                    setIsSettleTransactionModalOpen(true);
                  }} 
                />
                <AddCustomerModal 
                  isOpen={isAddCustomerModalOpen} 
                  onRequestClose={() => setIsAddCustomerModalOpen(false)} 
                  onAddCustomer={addCustomer} 
                  customerToEdit={customerToEdit} 
                />
                <SettleTransactionModal 
                  isOpen={isSettleTransactionModalOpen} 
                  onRequestClose={() => setIsSettleTransactionModalOpen(false)} 
                  onSettleTransaction={settleTransaction} 
                  customer={customerToEdit} 
                />
              </>
            ) : (
              <Navigate to="/login" />
            )
          } />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
