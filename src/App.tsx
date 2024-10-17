import "./App.css";
import { FetchClient } from "./hooks/FetchClient";
import { FetchWrapper } from "./hooks/useFetchContext";
import Test from "./Test";
const { defaultOptions } = new FetchClient({
  BASE_URL: "https://natours-sable-three.vercel.app/api/v1",
  cacheTime: 60 * 1000,
});
function App() {
  return (
    <FetchWrapper client={defaultOptions}>
      <Test />
    </FetchWrapper>
  );
}

export default App;
