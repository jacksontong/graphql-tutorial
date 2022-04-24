import { gql, useQuery } from "@apollo/client";

const getBooksQuery = gql`
  {
    books {
      id
      name
    }
  }
`;

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul>
        {data.books.map((book: any) => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
