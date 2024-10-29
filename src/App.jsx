import Header from "./component/Header";
import ExcelCRUD from "./page/ExcelCRUD";

function App() {
  const cards = [
    {
      image: "https://via.placeholder.com/150",
      title: "Card 1",
      description: "Description for Card 1",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 2",
      description: "Description for Card 2",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 3",
      description: "Description for Card 3",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 4",
      description: "Description for Card 4",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 5",
      description: "Description for Card 5",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 6",
      description: "Description for Card 6",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 7",
      description: "Description for Card 7",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 8",
      description: "Description for Card 8",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 9",
      description: "Description for Card 9",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 10",
      description: "Description for Card 10",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 11",
      description: "Description for Card 11",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 12",
      description: "Description for Card 12",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 13",
      description: "Description for Card 1",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 14",
      description: "Description for Card 2",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 15",
      description: "Description for Card 3",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 16",
      description: "Description for Card 4",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 17",
      description: "Description for Card 5",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 18",
      description: "Description for Card 6",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 19",
      description: "Description for Card 7",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 10",
      description: "Description for Card 8",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 20",
      description: "Description for Card 9",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 21",
      description: "Description for Card 10",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 22",
      description: "Description for Card 11",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 23",
      description: "Description for Card 12",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 24",
      description: "Description for Card 1",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 25",
      description: "Description for Card 2",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 26",
      description: "Description for Card 3",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 27",
      description: "Description for Card 4",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 28",
      description: "Description for Card 5",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 29",
      description: "Description for Card 6",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 30",
      description: "Description for Card 7",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 31",
      description: "Description for Card 8",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 32",
      description: "Description for Card 9",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 33",
      description: "Description for Card 10",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 34",
      description: "Description for Card 11",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 35",
      description: "Description for Card 12",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 36",
      description: "Description for Card 1",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 37",
      description: "Description for Card 2",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 38",
      description: "Description for Card 3",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 39",
      description: "Description for Card 4",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 40",
      description: "Description for Card 5",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 41",
      description: "Description for Card 6",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 42",
      description: "Description for Card 7",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 43",
      description: "Description for Card 8",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 44",
      description: "Description for Card 9",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 45",
      description: "Description for Card 10",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 46",
      description: "Description for Card 11",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 47",
      description: "Description for Card 12",
    },
  ];

  return (
    <div>
      <Header />
      <ExcelCRUD />
    </div>
  );
}

export default App;
