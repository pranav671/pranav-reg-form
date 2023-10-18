import "./App.css";
import Fun from "./Fun";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Home } from "./components/Home";
import { Page1 } from "./temp/Page1";
import React from "react";
import SelectGroup from "./components/select group";
import './temp/Style.css'

function App() {
  const [data, setData] = React.useState([]);
  const [info, setInfo] = React.useState({});

  const saveData = (data, x) => {
    console.log("Data recieved in app.js");
    console.log(data);
    setInfo(x);
    setData(data);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page1 onSave={saveData}/>} />
        <Route path="/1" element={<SelectGroup data={data} onSave={saveData}/>} />
        {/* <Route path='/1' element={<Home data={data} onSave={saveData}/>}/> */}
        <Route path="/continue" element={<Fun data={data} info={info}/>} />
      </Routes>
    </Router>
  );
}
export default App;
