import "./App.css";
import { useMutation, useQuery } from "./hooks/useFetchFactory";

function Test() {
  const { isLoading, isError } = useQuery("posts", {
    onSuccess(data) {
      console.log("SUCCESSFULLY LOAD :", data);
    },
    onError(err) {
      console.log("ERROR:", err);
    },
  });
  const {
    mutate,
    data: mutateData,
    isError: mutateError,
  } = useMutation("posts/", {
    BASE_URL: "https://jsonplaceholder.typicode.com",
  });
  console.log(mutateData, mutateError);
  if (isLoading) {
    return <p>Loding...</p>;
  }
  if (isError) {
    return <p>Error</p>;
  }
  return (
    <div>
      POSTS
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const data = Object.fromEntries(formData);
          console.log(data);
          mutate(JSON.stringify(data));
        }}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input placeholder="title" name="title" />
        <textarea placeholder="body" name="body" />
        <button>Submit</button>
        {mutateError ? <p style={{ color: "red" }}>Error on mutate</p> : null}
      </form>
    </div>
  );
}

export default Test;
