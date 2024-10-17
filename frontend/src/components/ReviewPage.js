// ReviewPage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../components/ReviewPage.css";

const getStars = (rating) => {
  const filledStars = Array(parseInt(rating)).fill(
    <FontAwesomeIcon icon={faStar} color="gold" />
  );
  const emptyStars = Array(5 - parseInt(rating)).fill(
    <FontAwesomeIcon icon={faStar} color="gray" />
  );
  return filledStars.concat(emptyStars);
};

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    calculateAverageRating();
  }, [reviews]);

  const calculateAverageRating = () => {
    const totalRatings = reviews.reduce(
      (sum, review) => sum + parseInt(review.rating),
      0
    );
    const newAverageRating =
      reviews.length > 0 ? totalRatings / reviews.length : null;
    setAverageRating(newAverageRating);
  };

  const handleSubmitReview = (event) => {
    event.preventDefault();
    const newReview = { name: name, rating: rating, reviewText: reviewText };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setName("");
    setRating("");
    setReviewText("");
    calculateAverageRating(); // Update average rating after adding a review
  };

  return (
    <div className="container">
      {averageRating !== null && (
        <div className="overall-rating">
          <h2>Overall Rating</h2>
          <p>
            <strong>Average Rating:</strong> {averageRating.toFixed(1)}/5
          </p>
        </div>
      )}
      <div className="reviews-list-container">
        <div className="reviews-list" id="reviews-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-container">
              <h2 className="review-header">{review.name}'s review:</h2>
              <p className="review-rating">Rating: {getStars(review.rating)}</p>
              <p className="review-content">{review.reviewText}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="review-form">
        <h2>Add a New Review</h2>
        <form onSubmit={handleSubmitReview}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating (out of 5):</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              name="review"
              rows="4"
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit">Submit Review</button>
          </div>
        </form>
      </div>
      {/* Add Link to DoctorDetails with averageRating as parameter */}
      {averageRating !== null && (
        <Link
          to={`/doctor-details/${averageRating.toFixed(1)}`}
          className="link"
        >
          View Doctor Details
        </Link>
      )}
    </div>
  );
};

export default ReviewPage;
