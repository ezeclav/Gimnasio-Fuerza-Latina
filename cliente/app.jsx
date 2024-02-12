//import React from "react";
//import { useFetch } from "./useFetch";
//import "./App.css";


 //function App() {
//   const { data, loading, error, handleCancelRequest } = useFetch(
//     "http://localhost:3050"
 // );

 //  return (
  //   <div className="App">
 //      <h1>Fetch like a Pro</h1>
//
 //      <button onClick={handleCancelRequest}>Cancel Request</button>
 //      <ul className="card">
 //        {error && <li>Error: {error}</li>}
 //        {loading && <li>Loading...</li>}
 //        {data?.map((item) => (
 //          <li key={item.id}>{item.title}</li>
 //        ))}
 //      </ul>
 //   </div>
 //  );
// }


 const apiData = fetchData("https://jsonplaceholder.typicode.com/todos");

function App() {
  const data = apiData.read();

  return (
    <div className="App">
      <h1>Fetch like a Pro</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ul className="card">
          {data?.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
}
export default App;