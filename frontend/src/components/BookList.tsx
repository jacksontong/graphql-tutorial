import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteBookMutation, getBooksQuery } from "../queries";
import BookDetail from "./BookDetail";

const BookList = () => {
  const [selectedBook, setSelectedBook] = useState("");
  const { loading, error, data } = useQuery(getBooksQuery);
  const [deleteBook] = useMutation(deleteBookMutation);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="w-60 flex flex-col">
      <ul className="list-disc mb-6">
        {data.books.map((book: any) => (
          <li key={book.id} className="flex justify-between px-3 py-2">
            <div>{book.name}</div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setSelectedBook(book.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                title="delete"
                onClick={async () => {
                  if (window.confirm(`Are you sure to delete ${book.name}?`)) {
                    await deleteBook({
                      variables: {
                        id: book.id,
                      },
                      refetchQueries: [getBooksQuery],
                    });
                    toast(`${book.name} deleted successfully.`);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedBook && <BookDetail bookId={selectedBook} />}
    </div>
  );
};

export default BookList;
