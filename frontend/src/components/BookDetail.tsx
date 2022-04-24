import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries";

interface PropsType {
  bookId: string;
}

const BookDetail: React.FC<PropsType> = ({ bookId }) => {
  const { data, error, loading } = useQuery(getBookQuery, {
    variables: {
      id: bookId,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const book = data.book;

  return (
    <div>
      <h3>Book Detail</h3>
      <h4>{book.name}</h4>
      <p>{book.genre}</p>
      <p>{book.author.name}</p>
      <ul className="list-disc">
        {book.author.books.map((book: any) => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookDetail;
