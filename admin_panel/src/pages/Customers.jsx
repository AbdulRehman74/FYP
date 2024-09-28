import React from 'react';
import CustomerCard from '../components/Card';
import './Customer.css';

const customersData = [
    { name: 'Hamza Ali Abbasi', location: 'Johar Town', rating: 5, reviews: 10 },
    { name: 'Ali Abbasi', location: 'Pak View', rating: 2, reviews: 15 },
    { name: 'Hamza Ali', location: 'Lake Vista', rating: 1, reviews: 19 },
    { name: 'John Doe', location: 'Ali Town', rating: 4.5, reviews: 8 },
    { name: 'Jane Smith', location: 'Faisal Town', rating: 3.5, reviews: 12 },
    { name: 'Sarah Khan', location: 'Bhatti Gate', rating: 4, reviews: 9 },
    { name: 'Michael Brown', location: 'Wapda Town', rating: 2.5, reviews: 14 },
    { name: 'Emma Wilson', location: 'Lake City', rating: 5, reviews: 22 },
];

const Customers = () => {
    return (
        <div className="customers-container">
            <h1>Customers</h1>
            <div className="customers-grid">
                {customersData.map((customer, index) => (
                    <CustomerCard
                        key={index}
                        name={customer.name}
                        location={customer.location}
                        rating={customer.rating}
                        reviews={customer.reviews}
                    />
                ))}
            </div>
        </div>
    );
};

export default Customers;
