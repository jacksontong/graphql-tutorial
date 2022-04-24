import { gql, useQuery } from "@apollo/client";
import { Formik, Field, Form } from "formik";
import { getAuthorsQuery } from "../queries";

const AddBook = () => {
  const { data, error, loading } = useQuery(getAuthorsQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Formik
      initialValues={{
        name: "",
        genre: "",
        authorId: "",
      }}
      onSubmit={async (values) => {
        console.log(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col space-y-3">
          <div>
            <label
              htmlFor="name"
              className="uppercase text-sm font-bold opacity-70"
            >
              Name
            </label>
            <Field
              id="name"
              name="name"
              placeholder="Name"
              className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="genre"
              className="uppercase text-sm font-bold opacity-70"
            >
              Genre
            </label>
            <Field
              id="genre"
              name="genre"
              placeholder="Genre"
              className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="authorId"
              className="uppercase text-sm font-bold opacity-70"
            >
              Author
            </label>
            <Field
              id="authorId"
              name="authorId"
              placeholder="Author"
              as="select"
              className="w-full p-3 mt-2 mb-4 bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
            >
              <option value="">--- Select Author ---</option>
              {data.authors.map((author: any) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </Field>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3 px-6 my-2 bg-emerald-500 disabled:bg-emerald-200 disabled:cursor-not-allowed text-white font-medium rounded hover:bg-indigo-500 active:bg-indigo-200 cursor-pointer ease-in-out duration-300 transition"
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddBook;
