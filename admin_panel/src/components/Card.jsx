import React from 'react';
import './Card.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Card = ({ name, category, rating, reviews ,location}) => {
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="star" />);
            } else if (i - rating === 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="star" />);
            } else {
                stars.push(<FaRegStar key={i} className="star" />);
            }
        }
        return stars;
    };
    return (
        <div className="service-provider-card">
            <div className="card-header">
                <div className="avatar">
                    <img src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`} alt={name} />
                </div>
                <div className="provider-info">
                    <h3>{name}</h3>
                    <p className="category">{category}</p>
                </div>
            </div>
            <div className="card-body">
                <div className="rating">{renderStars(rating)}</div>
                <div className="reviews">{reviews} Reviews</div>
                <div className="location">Location: {location}</div>

            </div>
            <div className="card-footer">
                <button className="button reviewsBtn">Reviews</button>
                <button className="button deleteBtn">Delete</button>
            </div>
        </div>
    );
};

export default Card;
