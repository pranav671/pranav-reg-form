import "bootstrap/dist/css/bootstrap.css";
import './temp/Style.css'
import React from "react";
import axios from 'axios';

const Fun = (args) => {

  const event = args.info.event;
  const cat = args.info.cat;
  const handleSubmission = async (e) => {
    e.preventDefault();
    let info = [{'name' : event, 'email':cat}]
    let payload = {'members' : args.data, "info" : info}
    // eslint-disable-next-line no-restricted-globals
    location.href = "https://robokidz.co.in";
    axios.post('/newEntry', payload).then(response=> console.log(response)).catch(err=> console.log(err));
  }

  return (
    <>
      <div  className="web-container">
      <div className="appointment-header">
        Entered Details</div>
        <div style={{'minHeight' : '30px'}}></div>
        <h5>Event selected = {event}</h5>
        <h5>Category selected = {cat}</h5>
      {/* <p>{args.text}</p> */}
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Player Name</th>
            <th>Player email</th>
          </tr>
        </thead>
      <div style={{'minHeight' : '30px'}}></div>
      <tbody>
        {args.data.map(
          (el,i) => {
            return (
              <tr key={i + "name"}>
                <td>{i + 1}.</td>
                <td>
                  <p> {el.name} </p>
                </td>
                <td>
                  <p> {el.email}</p>
                </td>
              </tr>
            );
          })
        }
      </tbody>
        
        </table>

        <span style={{'justifyContent':'right'}}>
          <button className="btn btn-primary" onClick={handleSubmission}>Continue to payment</button>
        </span>
      </div>
    </>
  );
};

export default Fun;
