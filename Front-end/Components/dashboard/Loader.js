"use client";

import { useState } from "react";
import GridLoader from "react-spinners/GridLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function App() {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#193549");

  return (
    <div className="mt-10">
      
     

      <GridLoader

        color={color}
        loading={loading}
        css={override}  // Correct prop name
        size={25}
        aria-label="Loading Spinner"
        data-testid="GridLoader"
      />
    </div>
  );
}

export default App;
