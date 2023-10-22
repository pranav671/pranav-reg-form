import "bootstrap/dist/css/bootstrap.css";
import './temp/Style.css'
import React, {useEffect, useReducer, useState } from "react";
import axios from 'axios';
import { json } from "react-router-dom";

const Fun = (args) => {

  const [teamMembers, setTeamMembers] = useState(args.data)
  const event = args.info.event;
  const cat = args.info.cat;
  const [ignored, forceUpdate] = useReducer( x=>x+1, 0)

  const handleSubmission = async (e) => {
    e.preventDefault();
    let info = [{ 'name': event, 'email': cat }]
    let payload = { 'members': args.data, "info": info }
    // eslint-disable-next-line no-restricted-globals
    axios.post('/newEntry', payload).then(response => console.log(response)).catch(err => console.log(err));

  }

  useEffect(()=> {
    for(let i=0; i<teamMembers.length; i++)
      document.getElementById('cityNstate'+i).value = teamMembers[i].add2;

    forceUpdate();
  }, [teamMembers])

  const verifyEmail = (e) => {
    //Implement this
  }

  const verifyPhone = (e) => {
    //Implement this
  }

  return (
    <>
      <div className="container m-5 ">
        <ol>
          {teamMembers.map((member, i) => {
            return (
              <li>
                <div key={"input of " + i} className="card w-80 mb-5">
                  <div className="d-flex inline-block">
                    <div className="mb-3 input-group">
                      <span className="input-group-text">Name</span>
                      <input
                        type="text"
                        className="form-control w-60"
                        value={member.name}
                        disabled='true'
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Email</span>
                      <input
                        type="email"
                        className="form-control"
                        value={member.email}
                        disabled='true'
                      />
                      <button onClick={(e) => verifyEmail(e, i)} className='btn btn-outline-success' type="button">Verify</button>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Contact No.</span>
                    <input
                      type="number"
                      className="form-control"
                      value={member.phoneNum}
                      disabled='true'
                    />
                    <input
                      required type="number"
                      className="form-control"
                      value={member.whatsappNum}
                      disabled='true'
                    />
                    <button onClick={(e) => verifyPhone(e, i)} className='btn btn-outline-success' type="button">Verify</button>
                  </div>

                  <div className="d-flex inline-block">
                    <div className="input-group w-25 mb-3">
                      <span className="input-group-text">Class</span>
                      <input
                        type="text"
                        className="form-control"
                        disabled='true'
                        value={member.standard}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">School</span>
                      <input className="form-control" type="text" value={member.school} disabled='true' />
                    </div>
                  </div>
                  <div className="d-flex inline-block">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Address 1</span>
                      <input type="text" className="form-control" value={member.add1} disabled='true' />
                    </div>
                    <div className="input-group mb-3 w-35">
                      <span className="input-group-text">PIN</span>
                      <input type="int" maxLength={6} className="form-control" disabled='true' value={member.pin} />
                    </div>
                  </div>
                  <div className="input-group">
                    <input className="form-control" readOnly={true} id={"cityNstate" + i} disabled='true' value={teamMembers[i].add2 == '' ? 'Invalid PIN detected please re-fill the form' : teamMembers[i].add2} />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="container m-5">
          <button className="btn btn-outline-primary" onClick={handleSubmission}>Continue to Payment</button>
        </div>
      </div>

    </>
  );
};

export default Fun;
