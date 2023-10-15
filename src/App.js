import './App.css';
import Fun from './Fun';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import { Home } from './components/Home';
import { Page1 } from './temp/Page1';
import React from 'react';


function App() {

  const [data, setData]  = React.useState([]);

  const saveData = (data) => {
    console.log('Data recieved in app.js');
    setData(data);
  }

  return (

    <Router>
      <Routes>
          <Route path='/' element={<Page1 />}/>
          {/* <Route path='/' element={<Home data={data} onSave={saveData}/>}/> */}
          <Route path='/continue' element={<Fun data={data}/>}/>
      </Routes>
    </Router>
  );


}
export default App;
