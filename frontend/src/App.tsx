import React from "react";
import { toast } from "react-toastify";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

function App() {
  return (
    <div className="bg-white shadow-xl mb-4 flex flex-wrap justify-center items-center h-screen">
      <div className="flex space-x-16">
        <AddBook />
        <BookList />
      </div>
    </div>
  );
}

export default App;
