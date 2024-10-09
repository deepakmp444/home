import Header from "./component/Header";
import Swiper from "./page/Swiper";

function App() {
  const cards = [
    { image: 'https://via.placeholder.com/150', title: 'Card 1', description: 'Description for Card 1' },
    { image: 'https://via.placeholder.com/150', title: 'Card 2', description: 'Description for Card 2' },
    { image: 'https://via.placeholder.com/150', title: 'Card 3', description: 'Description for Card 3' },
    { image: 'https://via.placeholder.com/150', title: 'Card 4', description: 'Description for Card 4' },
    { image: 'https://via.placeholder.com/150', title: 'Card 5', description: 'Description for Card 5' },
    { image: 'https://via.placeholder.com/150', title: 'Card 6', description: 'Description for Card 6' },
    { image: 'https://via.placeholder.com/150', title: 'Card 7', description: 'Description for Card 7' },
    { image: 'https://via.placeholder.com/150', title: 'Card 8', description: 'Description for Card 8' },
    { image: 'https://via.placeholder.com/150', title: 'Card 9', description: 'Description for Card 9' },
    { image: 'https://via.placeholder.com/150', title: 'Card 10', description: 'Description for Card 10' },
    { image: 'https://via.placeholder.com/150', title: 'Card 11', description: 'Description for Card 11' },
    { image: 'https://via.placeholder.com/150', title: 'Card 12', description: 'Description for Card 12' },
  ];

  return (
    <div>
      <Header />
      <Swiper cards={cards} />
    </div>
  );
}

export default App;
