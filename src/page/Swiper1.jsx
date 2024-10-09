import React, { useState } from "react";
import "./Swiper.css";

const Swiper = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 4; // Number of cards displayed per page
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  // Function to handle the transition to a specific page
  const goToPage = (pageNumber) => {
    setCurrentIndex((pageNumber - 1) * cardsPerPage);
  };

  const goToPreviousPage = () => {
    const isFirstPage = currentIndex === 0;
    const newIndex = isFirstPage ? 0 : currentIndex - cardsPerPage;
    setCurrentIndex(newIndex);
  };

  const goToNextPage = () => {
    const isLastPage = currentIndex + cardsPerPage >= cards.length;
    const newIndex = isLastPage ? currentIndex : currentIndex + cardsPerPage;
    setCurrentIndex(newIndex);
  };

  const goToLastPage = () => {
    setCurrentIndex((totalPages - 1) * cardsPerPage);
  };

  const goToFirstPage = () => {
    setCurrentIndex(0);
  };

  return (
    <div className="swiper-container">
      <div
        className="swiper-wrapper"
        style={{
          transform: `translateX(-${(currentIndex / cardsPerPage) * 100}%)`,
        }}
      >
        {cards.map((card, index) => (
          <div className="swiper-card" key={index}>
            <img src={card.image} alt={card.title} className="card-image" />
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </div>
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={goToFirstPage} disabled={currentIndex === 0}>
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
          onClick={goToLastPage}
          disabled={currentIndex + cardsPerPage >= cards.length}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Swiper;
