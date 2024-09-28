// import React from 'react';
//
// const ServiceProviders = () => {
//     return <div>Service Providers</div>;
// };
//
// export default ServiceProviders;
import React, { useEffect, useState } from 'react';
import ServiceProviderCard from '../components/Card';
import './ServiceProviders.css';
// import { db } from '../firebase'; // Make sure you have Firebase setup and configured
// import { collection, getDocs } from 'firebase/firestore';

const providersData = [
    { name: 'Hamza Ali Abbasi', category: 'Electrician', rating: 5, reviews: 10 },
    { name: 'Ali Abbasi', category: 'Mechanic', rating: 2, reviews: 15 },
    { name: 'Hamza Ali', category: 'Plumber', rating: 1, reviews: 19 },
    { name: 'John Doe', category: 'Carpenter', rating: 4.5, reviews: 8 },
    { name: 'Jane Smith', category: 'Freelancer', rating: 3.5, reviews: 12 },
    { name: 'Sarah Khan', category: 'Painter', rating: 4, reviews: 9 },
    { name: 'Michael Brown', category: 'Gardener', rating: 2.5, reviews: 14 },
    { name: 'Emma Wilson', category: 'Cleaner', rating: 5, reviews: 22 },
];
const ServiceProviders = () => {
    const [providers, setProviders] = useState([]);
//
//     useEffect(() => {
//         const fetchProviders = async () => {
//             const querySnapshot = await getDocs(collection(db, 'serviceProviders'));
//             const providerList = querySnapshot.docs.map(doc => doc.data());
//             setProviders(providerList);
//         };
//
//         fetchProviders();
//     }, []);
//     useEffect(() => {
//         // Generate random static data
//         const generateProviders = () => {
//             const categories = ['Electrician', 'Mechanic', 'Plumber', 'Carpenter', 'Painter'];
//             const names = ['John Doe', 'Jane Smith', 'Alex Johnson', 'Emily Davis', 'Michael Brown'];
//             const reviews = [10, 15, 20, 25, 30];
//             const providersData = [];
//
//             for (let i = 0; i < 20; i++) {
//                 const randomCategory = categories[Math.floor(Math.random() * categories.length)];
//                 const randomName = names[Math.floor(Math.random() * names.length)];
//                 const randomRating = Math.floor(Math.random() * 5) + 1;
//                 const randomReviews = reviews[Math.floor(Math.random() * reviews.length)];
//
//                 providersData.push({
//                     name: randomName,
//                     category: randomCategory,
//                     rating: randomRating,
//                     reviews: randomReviews,
//                 });
//             }
//
//             setProviders(providersData);
//         };
//
//         generateProviders();
//     }, []);
    return (
        <div className="service-providers-container">
            <h1>Service Provider Panel</h1>
            <div className="providers-grid">
                {providersData.map((provider, index) => (
                    <ServiceProviderCard
                        key={index}
                        name={provider.name}
                        category={provider.category}
                        rating={provider.rating}
                        reviews={provider.reviews}
                        location={"Lahore"}
                    />
                ))}
            </div>
        </div>
    );
};

export default ServiceProviders;
