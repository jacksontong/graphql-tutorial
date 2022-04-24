import { gql, useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries";

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul className="list-disc">
        {data.books.map((book: any) => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
