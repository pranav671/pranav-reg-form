import "bootstrap/dist/css/bootstrap.css";
import './temp/Style.css'
import React, {useEffect, useReducer, useState } from "react";
import axios from 'axios';

const Fun = (args) => {

  const [teamMembers, setTeamMembers] = useState(args.data)
  const event = args.info.event;
  const cat = args.info.cat;
  const [ignored, forceUpdate] = useReducer( x=>x+1, 0)
  const [id, setId] = useState('')
  const [paymentLink , setPaymentLink] = useState("Err");

  const handleSubmission = async (e) => {
    e.preventDefault();
    let info = [{ 'name': event, 'email': cat, 'phoneVerified' : false, 'school': 'error'}]
    let payload = { 'members': args.data, "info": info }
    // check for verification
    // teamMembers.forEach(element => {
    //   if(!element.phoneVerified || !element.emailVerified)
    //   {
    //     alert("Please complete the verification first!!!")
    //   }
    // });
    if(id != '')
    {
      axios.get('/newLink/'+id).then(response => {
        console.log(response)
        let links = String(response.data);
        let payment_url = links.split(", ")[1];
        if(payment_url === 'error')
        {
          alert('Error creating payment link.\nPlease try again');
        }
        else
          setPaymentLink(payment_url);
        let id = links.split(", ")[0];
        setId(id);
      }).catch(err => console.log(err));
      return;
    }
    // eslint-disable-next-line no-restricted-globals
    axios.post('/newEntry', payload).then(response => {
      console.log(response)
      let links = String(response.data);
      let payment_url = links.split(", ")[1];
      if(payment_url === 'error')
      {
        alert('Error creating payment link.\nPlease try again');
      }
      else
        setPaymentLink(payment_url);
      let id = links.split(", ")[0];
      setId(id);
    }).catch(err => console.log(err));

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
            console.log(id ) 
            return (
              <li>
                <div key={"input of " + i} className="card w-80">
                  <div className="d-flex inline-block">
                    <div className=" input-group mb-3">
                      <span className="input-group-text">Name</span>
                      <input
                        type="text"
                        className="form-control w-60"
                        value={member.name}
                        readOnly='true'
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Email</span>
                      <input
                        type="email"
                        className="form-control"
                        value={member.email}
                        readOnly
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
                      readOnly='true'
                    />
                    <input
                      required type="number"
                      className="form-control"
                      value={member.whatsappNum}
                      readOnly='true'
                    />
                    <button onClick={(e) => verifyPhone(e, i)} className='btn btn-outline-success' type="button">Verify</button>
                  </div>

                  <div className="d-flex inline-block">
                    <div className="input-group w-25 mb-3">
                      <span className="input-group-text">Class</span>
                      <input
                        type="text"
                        className="form-control"
                        readOnly='true'
                        value={member.standard}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">School</span>
                      <input className="form-control" type="text" value={member.school} readOnly='true' />
                    </div>
                  </div>
                  <div className="d-flex inline-block">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Address 1</span>
                      <input type="text" className="form-control" value={member.add1} readOnly='true' />
                    </div>
                    <div className="input-group mb-3 w-35">
                      <span className="input-group-text">PIN</span>
                      <input type="int" maxLength={6} className="form-control" readOnly='true' value={member.pin} />
                    </div>
                  </div>
                  <div className="input-group">
                    <input className="form-control" readOnly={true} id={"cityNstate" + i} value={teamMembers[i].add2 == '' ? 'Invalid PIN detected please re-fill the form' : teamMembers[i].add2} />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        {
          teamMembers.length>0 &&
        <div className="text-center w-80">
          <br/>
          {
            paymentLink === 'Err'
            ?
            <button className="btn btn-outline-primary" onClick={handleSubmission}>Load Payment Link</button>
            :
            <a href={paymentLink} target="_blank" className="btn btn-success">Proceed to payment</a>
          }
          {
            id !=='' &&
          <p>You can track your application details with Id = {id}</p>
          }
        </div>
        }
      </div>

    </>
  );
};

export default Fun;
