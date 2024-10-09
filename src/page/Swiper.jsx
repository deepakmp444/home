import React, { useState, useRef } from "react";
import "./Swiper.css";

const Swiper = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 4; // Number of cards displayed per page
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const animationRef = useRef(null);
  const swiperWrapperRef = useRef(null);

  const startDrag = (clientX) => {
    setIsDragging(true);
    startX.current = clientX;
    prevTranslate.current = currentTranslate.current;
    animationRef.current = requestAnimationFrame(animation);
  };

  const endDrag = () => {
    setIsDragging(false);
    cancelAnimationFrame(animationRef.current);

    const movedBy = currentTranslate.current - prevTranslate.current;
    if (movedBy < -100 && currentIndex + cardsPerPage < cards.length) {
      goToNextPage();
    } else if (movedBy > 100 && currentIndex > 0) {
      goToPreviousPage();
    } else {
      currentTranslate.current = prevTranslate.current;
      setSliderPosition();
    }
  };

  const moveDrag = (clientX) => {
    if (isDragging) {
      const deltaX = clientX - startX.current;
      currentTranslate.current = prevTranslate.current + deltaX;
      setSliderPosition();
    }
  };

  const setSliderPosition = () => {
    swiperWrapperRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
  };

  const animation = () => {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  };

  const handleTouchStart = (e) => startDrag(e.touches[0].clientX);
  const handleTouchMove = (e) => moveDrag(e.touches[0].clientX);
  const handleTouchEnd = () => endDrag();

  const handleMouseDown = (e) => startDrag(e.clientX);
  const handleMouseMove = (e) => moveDrag(e.clientX);
  const handleMouseUp = () => endDrag();
  const handleMouseLeave = () => endDrag();

  const goToPage = (pageNumber) => {
    setCurrentIndex((pageNumber - 1) * cardsPerPage);
    currentTranslate.current =
      -(pageNumber - 1) * swiperWrapperRef.current.offsetWidth;
    prevTranslate.current = currentTranslate.current;
    setSliderPosition();
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
    <div
      className="swiper-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="swiper-wrapper" ref={swiperWrapperRef}>
        {cards.map((card, index) => (
          <div className="swiper-card" key={index}>
            <img src={card.image} alt={card.title} className="card-image" />
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </div>
        ))}
      </div>
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
