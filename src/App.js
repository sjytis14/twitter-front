import React, { useState } from "react";
import Home from "components/Home";
import Navigation from "components/Navigation";

function App() {
  const [error, setError] = useState(null);
  return (
    <>
      <Navigation setError={setError} />
      <Home error={error} />
    </>
  );
}

export default App;
