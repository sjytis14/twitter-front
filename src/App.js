// import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";

import Home from "./components/Home";
import Navigation from "./components/Navigation";

// const [contract, setContract] = useState();
// const [selectedImage, setSelectedImage] = useState();
// const [candidates, setCandidates] = useState([]);

// const [candidateFormData, setCandidateFormData] = useState({
//   name: "",
//   imageHash: "",
// });
// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// useEffect(() => {
//   setContract(getContract(contractAddress));
// }, []);

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    // if (user) {
    //   setUserObj(user);
    // }
    // else{
    // setUserObj(null);
    // }
    // setInit(true);
  }, []);
  return (
    <div>
      <Navigation />
      <Home
        userObj={{
          id: "0x3Abb6Da6E5b53c688597540b7d9795B8FDc02D4f",
        }}
      />
      {/* <Home userObj={userObj} /> */}
    </div>
  );
}

export default App;
