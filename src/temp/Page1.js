import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import React, { useState } from "react";
import "react-dropdown/style.css";
import { useNavigate } from "react-router-dom";
import "./Style.css";

export const Page1 = (props) => {
  const [events, setEvents] = useState({
    "Robotics Premier League": 2,
    "Geek Gala": 5,
    "S.T.E.A.M. Workshops": 1,
  });
  const [categories, setCategories] = useState({});
  const [selectedEvent, setSelectedEvent] = useState("Select Event");
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [selectedTeamSize, setSelectedTeamSize] = useState("Select Team Size");
  //   const [teamSize, setTeamSize] = useState(0);
  const [teamMembers, setTeamMembers] = useState([]);
  const navigate = useNavigate();

  const loadNextPage = (e) => {
    e.preventDefault();
    let temp = { event: selectedEvent, cat: selectedCategory };
    props.onSave(teamMembers, temp);
    navigate("/continue");
  };

  const handleEventChange = (e) => {
    let event = String(e.target.value);
    setSelectedEvent(event);
    if (event === "Robotics Premier League") {
      setCategories({
        "Robo-Soccer (Wired)": 0,
        "Robo-Soccer (Wireless)": 1,
        "Robo-Racer (Wired)": 2,
        "Robo-Raced (Wireless)": 3,
        "Line Follower": 4,
      });
    }
    if (event === "Geek Gala") setCategories({ "Geek Gala": 10 });
    if (event === "S.T.E.A.M. Workshops") {
      setCategories({
        //TODO: list of workshops to be rendered
        "Workshop 1": 21,
        "Workshop 2": 22,
      });
    }
  };

  const verifyEmail = (e,i)=>{
    //TODO implement api call  
  }

  const verifyPhone = (e,i)=>{
    //TODO implement api call  
  }

  // const verifyIp = () => {
  //   for(let member in teamMembers)
  //   {
  //     if(member.name == "" || member.email == '')
  //       return false;
  //     let s = member.email;
  //     let reg = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,10}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/
  //     if(!reg.test(s))
  //     return false;
  //   }
  //   return true;
  // }

  const Content = () => {
    return (
      <div className="container">
        <div className="appointment-header">Team Details</div>
        <div className="d-inline-flex row">
          <EventDropDown />
          <CategoryDropDown />
          <TeamSizeDropDown />
        </div>
        <div>
          <TeamTable />
        </div>
      </div>
    );
  };

  const EventDropDown = () => {
    return (
      <div className="form-sapcing dropdownContainer">
        <label htmlFor="eventDrop">
          <a>Select Event</a>
          <span style={{ color: "#dc3545" }}>*</span>
        </label>
        <select
          id="eventDrop"
          className="form-select"
          onChange={(e) => handleEventChange(e)}
          disabled={selectedTeamSize != "Select Team Size"}
          placeholder="Select Event"
        >
          <option selected>{selectedEvent}</option>
          {Object.keys(events).map((ob, ind) => {
            return ob !== selectedEvent && <option key={ind}>{ob}</option>;
          })}
        </select>
      </div>
    );
  };

  const CategoryDropDown = () => {
    if (selectedEvent && selectedEvent != "Select Event") {
      return (
        <div className="form-spacing dropdownContainer">
          <label htmlFor="categoryDrop">
            <a>Select Category</a>
            <span style={{ color: "#dc3545" }}>*</span>
          </label>
          <select
            id="categoryDrop"
            className="form-select"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            disabled={selectedTeamSize != "Select Team Size"}
            placeholder="Select Category"
          >
            <option selected>{selectedCategory}</option>
            {Object.keys(categories).map((ob, ind) => {
              return (
                ob != selectedCategory && (
                  <option key={ind + "category"}>{ob}</option>
                )
              );
            })}
          </select>
        </div>
      );
    }
  };

  const TeamSizeDropDown = () => {
    if (selectedCategory && selectedCategory != "Select Category") {
      return (
        <div className=" dropdownContainer">
          <label htmlFor="teamDrop">
            <a>Select Team Size</a>
            <span style={{ color: "#dc3545" }}>*</span>
          </label>
          <select
            id="teamDrop"
            onChange={(e) => {
              let n = e.target.value;
              setSelectedTeamSize(n);
              let temp = [];
              while (temp.length < n) {
                temp.push({
                  name: "",
                  email: "",
                  phoneNum: "",
                  whatsappNum: "",
                });
              }
              setTeamMembers(temp);
              console.log(n);
            }}
            className="form-select"
            placeholder="Select Event"
          >
            <option selected>{selectedTeamSize}</option>
            {[...Array(events[selectedEvent])].map((ob, ind) => {
              if (ind + 1 != selectedTeamSize)
                return <option key={ind + "size"}>{ind + 1}</option>;
            })}
          </select>
        </div>
      );
    } else {
      return "";
    }
  };

  const TeamTable = () => {
    if (
      selectedEvent != "Select Event" &&
      selectedTeamSize != "Select Team Size"
    ) {
      console.log("Called table");
      return (
        <>
          <ol>
            {teamMembers.map((el, i) => {
              return (
                <li>
                  <div key={"input of " + i} className="card w-75">
                    <div className="d-flex inline-block">
                      <div className="inline-group mb-3 input-group">
                        <span className="input-group-text">Name</span>
                        <input
                          type="text"
                          placeholder="Enter Name"
                          className="form-control w-60"
                        />
                      </div>
                      <div className="input-group mb-3 inline-block">
                        <input
                          type="email"
                          placeholder="Enter e-mail"
                          className="form-control"
                        />
                        <button onClick={(e)=>verifyEmail(e, i)} className='btn btn-outline-success' type="button">Verify</button>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text">Contact</span>
                      <input
                        type="tel"
                        maxLength={10}
                        minLength={10}
                        placeholder="Mobile No."
                        className="form-control"
                        required
                        pattern="[1-9]{1}[0-9]{9}"
                      />
                      <input
                        type="tel"
                        maxLength={10}
                        minLength={10}
                        placeholder="WhatsApp No."
                        className="form-control"
                      />
                      <button onClick={(e)=>verifyPhone(e, i)} className='btn btn-outline-success' type="button">Verify</button>
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text">School</span>
                      <input className="form-control" type="text" placeholder="School Name"/>
                    </div>
                    <div className="input-group mb-3">
                      <textarea></textarea>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="container">
            <button
              className="btn-outline-success btn"
              onClick={(e) => loadNextPage(e)}
            >
              Continue
            </button>
          </div>
        </>
      );
    } else {
      return "";
    }
  };

  return (
    <div className="form">
      {/* <MyNavbar /> */}
      <Content />
    </div>
  );
};

/**
 * <table className="table">
            <thead className="tablehead">
              <tr>
                <th>No.</th>
                <th>Player Name</th>
                <th>Player email</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(parseInt(selectedTeamSize))].map((ob, ind) => {
                return (
                  <tr key={ind + "input"}>
                    <th>{ind + 1}</th>
                    <th>
                      <input
                        className="nameInput"
                        placeholder="Enter name"
                        onChange={(e) => {
                          teamMembers[ind].name = e.target.value;
                        }}
                      />
                    </th>
                    <th>
                      <input
                        className="emailInput"
                        placeholder="Enter email"
                        onChange={(e) => {
                          teamMembers[ind].email = e.target.value;
                        }}
                        // pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                      />
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
 */
