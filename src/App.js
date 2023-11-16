import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Fun from "./components/Fun";
import { Page1 } from "./components/Page1";
import './components/Style.css';
import Exp from "./temp/exp";
import Details from "./components/Details";


// export  const server_url = "http://192.168.0.163:8080";
export const server_url = "http://my-app-env-2.eba-ni8tqtmu.eu-north-1.elasticbeanstalk.com";


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
        <Route path="/continue" element={<Fun data={data} info={info}/>} />
        <Route path="/exp/:id" element={<Exp text="Testing"/>}/> {/*for testing extrafeatures*/}
        <Route path="/applications/:id" element={<Details/>}/>
      </Routes>
    </Router>
  );
}
