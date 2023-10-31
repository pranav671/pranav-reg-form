import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Fun from "./Fun";
import SelectGroup from "./components/select group";
import { Page1 } from "./temp/Page1";
import './temp/Style.css';
import Exp from "./temp/exp";


export  const server_url = "http://51.20.101.214:8080";


export default function App() {
  const [data, setData] = React.useState([]);
  const [info, setInfo] = React.useState({'event':'','cat':''});
  
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
        {/* <Route path="/1" element={<SelectGroup data={data} onSave={saveData}/>} /> */}
        {/* <Route path='/1' element={<Home data={data} onSave={saveData}/>}/> */}
        <Route path="/continue" element={<Fun data={data} info={info}/>} />
        <Route path="/exp/:id" element={<Exp text="Testing"/>}/>
      </Routes>
    </Router>
  );
}
