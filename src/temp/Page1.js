import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import React, { useState } from "react";
import "react-dropdown/style.css";
import { useNavigate } from "react-router-dom";
import "./Style.css";

export const Page1 = (props) => {
  const [events, setEvents] = useState({
    'Event 1': 3,
    'Event 2': 5,
    'Event 3': 2,
  });
  const [categories, setCategories] = useState({
    cat1: 3,
    cat2: 4,
    cat3: 2,
    cat4: 1,
  });
  const [selectedEvent, setSelectedEvent] = useState("Select Event");
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [selectedTeamSize, setSelectedTeamSize] = useState("Select Team Size");
  //   const [teamSize, setTeamSize] = useState(0);
  const [teamMembers, setTeamMembers] = useState([]);
  const navigate = useNavigate();

  const loadNextPage = (e) => {
    e.preventDefault();
    if(verifyIp())
    {
        let temp = {'event':selectedEvent, 'cat':selectedCategory}
        props.onSave(teamMembers, temp);
        navigate('/continue');
    }
    else
    {
      alert("Please enter valid values");
    }
  };

  const verifyIp = () => {
    for(let member in teamMembers)
    {
      if(member.name == "" || member.email == '')
        return false;
      let s = member.email;
      let reg = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,10}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/
      if(!reg.test(s)) 
      return false;
    }
    return true;
  }

  let selectedInfo = "";

  const Content = ({
    events,
    setSelectedEvent,
    selectedEvent,
    selectedTeamSize,
    setSelectedTeamSize,
  }) => {
    return (
      <div className="container">
        <div className="appointment-header">Team Details</div>
        <div className="d-inline-flex row">
          <EventDropDown
            events={events}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
          />
          <CategoryDropDown
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <TeamSizeDropDown
            events={categories}
            selectedEvent={selectedCategory}
            setTeamSize={setSelectedTeamSize}
          />
        </div>
        <div>{selectedInfo}</div>
        <div>
          <TeamTable
          style={{'justify-content':'center'}}
            events={events}
            selectedEvent={selectedEvent}
            teamsize={selectedTeamSize}
          />
        </div>
      </div>
    );
  };

  const EventDropDown = ({ events, selectedEvent, setSelectedEvent }) => {
    return (
      <div className="form-sapcing dropdownContainer">
        <label htmlFor="eventDrop">
          <a>Select Event</a>
          <span style={{ color: "#dc3545" }}>*</span>
        </label>
        <select
          id="eventDrop"
          className="form-select"
          onChange={(e) => setSelectedEvent(e.target.value)}
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

  const CategoryDropDown = ({
    categories,
    selectedCategory,
    setSelectedCategory,
  }) => {
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

  const TeamSizeDropDown = ({ events, selectedEvent, setTeamSize }) => {
    if (selectedEvent && selectedEvent != "Select Category") {
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
              setTeamSize(n);
              console.log(n);
              let temp = [];
              while (temp.length < n) {
                temp.push({ name: "", email: "" });
              }
              setTeamMembers(temp);
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

  const TeamTable = ({ events, selectedEvent, teamsize }) => {
    if (selectedEvent != "Select Event" && teamsize != "Select Team Size") {
      // console.log("Called table")
      return (
        <>
          <table className="table">
            <thead className="tablehead">
              <tr>
                <th>No.</th>
                <th>Player Name</th>
                <th>Player email</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(parseInt(teamsize))].map((ob, ind) => {
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
      <Content
        events={events}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        selectedTeamSize={selectedTeamSize}
        setSelectedTeamSize={setSelectedTeamSize}
      />
    </div>
  );
};
