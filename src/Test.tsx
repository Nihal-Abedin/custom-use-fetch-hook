import "./App.css";
import {  useCache } from "./hooks/cache";
import { useMutation, useQuery } from "./hooks/useFetchFactory";

function Test() {
  const { cacheState } = useCache();
  const { isLoading, isError, error } = useQuery(
    "tours/5c88fa8cf4afda39709c2955",
    {
      onSuccess(data) {
        console.log("SUCCESSFULLY LOAD :", data);
      },
      onError(err) {
        console.log("ERROR:", err);
      },
    }
  );
  const {
    mutate,
    data: mutateData,
    isError: mutateError,
  } = useMutation("tours");
  console.log(mutateData, mutateError);
  if (isLoading) {
    return <p>Loding...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  console.log(cacheState);
  return (
    <div>
      POSTS
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const data = Object.fromEntries(formData);
          console.log(data);
          mutate(JSON.stringify(data),{onError(error) {
            console.log(error)
          },});
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
