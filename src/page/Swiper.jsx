import React, { useState } from "react";
import "./Swiper.css";

const Swiper = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 12; // 12 cards per page (4 cards per row, 3 rows per page)
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentIndex((pageNumber - 1) * cardsPerPage);
  };

  const goToPreviousPage = () => {
    const newIndex = currentIndex - cardsPerPage;
    if (newIndex >= 0) goToPage(Math.floor(newIndex / cardsPerPage) + 1);
  };

  const goToNextPage = () => {
    const newIndex = currentIndex + cardsPerPage;
    if (newIndex < cards.length)
      goToPage(Math.floor(newIndex / cardsPerPage) + 1);
  };

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {/* Display only the cards for the current page */}
        {cards
          .slice(currentIndex, currentIndex + cardsPerPage)
          .map((card, index) => (
            <div className="swiper-card" key={index}>
              <img src={card.image} alt={card.title} className="card-image" />
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
            </div>
          ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination-controls">
        <button onClick={() => goToPage(1)} disabled={currentIndex === 0}>
          First
        </button>
        <button onClick={goToPreviousPage} disabled={currentIndex === 0}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-button ${
              index === Math.floor(currentIndex / cardsPerPage) ? "active" : ""
            }`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={goToNextPage}
          disabled={currentIndex + cardsPerPage >= cards.length}
        >
          Next
        </button>
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentIndex + cardsPerPage >= cards.length}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Swiper;
