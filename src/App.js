import Home from "components/Home";
import Navigation from "components/Navigation";
import { useState } from "react";

function App() {
  const [error, setError] = useState("");
  return (
    <>
      <Navigation setError={setError} />
      <Home error={error} />
    </>
  );
}

export default App;
