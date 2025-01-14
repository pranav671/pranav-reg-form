import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import React, { useEffect, useState } from "react";
import "react-dropdown/style.css";
import { useNavigate } from "react-router-dom";
import "./Style.css";
import axios from "axios";

export const Page1 = (props) => {
  const [events, setEvents] = useState([]
    // {
    // "Robotics Premier League": 2,
    // "Geek Gala" : 5,
    // "S.T.E.A.M. Workshops": 1,
    // }
  );

  // const options = [{"_id":"655d995298bce80e516c9a53","event":"Robotics Premier League","categories":["RoboSoccer (Wired)","RoboSoccer (Wireless)","RoboRacer (Wired)","RoboRacer (Wireless)","Line Follower"],"limit":2},{"_id":"655d9a1098bce80e516c9a54","event":"Geek Gala","categories":["Geek Gala"],"limit":5},{"_id":"655d9a4698bce80e516c9a55","event":"S.T.E.A.M. Workshops","categories":["Workshop 1","Workshop 2","Workshop 3"],"limit":1}];

  const [options, setOptions] = useState([]);
  
  
  //funtion will be called only on the first render
  useEffect( ()=>{
    axios.get('https://us-east-1.aws.data.mongodb-api.com/app/list-options-grvqr/endpoint/options')
      .then(res => {
        // console.log(res.data);
        let temp=[];
        // options = res.data;
        res.data.forEach((op)=>{
          temp.push(op.event);
        })
        setEvents(temp);
        setOptions(res.data);
      })
      .catch(err => {});
  }, [])

  const getSize = (event) => {
      for(let i=0; i<options.length; i++)
      {
        if(options[i].event == event)
          return options[i].limit;
      }
  }


  const classList = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ];
  const [categories, setCategories] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(props.info.event);
  const [selectedCategory, setSelectedCategory] = useState(props.info.cat);
  const [selectedTeamSize, setSelectedTeamSize] = useState(props.info.len);
  const [teamMembers, setTeamMembers] = useState(props.members);
  const [pinArr, setPinarr] = useState([]);

  useEffect(() => {
    //set input values here
    for (let i = 0; i < teamMembers.length; i++) {
      try {
        document.getElementById("inputName" + i).value = teamMembers[i].name;
        document.getElementById("inputEmail" + i).value = teamMembers[i].email;
        document.getElementById("inputPhone" + i).value = teamMembers[i].phoneNum;
        document.getElementById("inputWhatsapp" + i).value = teamMembers[i].whatsappNum;
        document.getElementById("inputSchool" + i).value = teamMembers[i].school;
        document.getElementById("inputAdd1" + i).value = teamMembers[i].add1;
        document.getElementById("inputAdd2" + i).value = teamMembers[i].add2;
        document.getElementById("inputPin" + i).value = teamMembers[i].pin;
      } catch (err) {
        // console.log("Error",err)
      }
    }
  }, [pinArr,  selectedTeamSize]);

  const loadAddressFromPin = (s, i) => {
    const getCity = async (s, i) => {
      const result = await fetch("https://api.postalpincode.in/pincode/" + s);
      result.json().then((json) => {
        console.log("fetched for" + i);
        if (json[0].Status == "Success") {
          let str =
            json[0].PostOffice[0].Block +
            ", " +
            json[0].PostOffice[0].District +
            ", " +
            json[0].PostOffice[0].State +
            ", India.";
          teamMembers[i].add2 = str;
          document.getElementById("inputAdd2" + i).value = str;
        } else teamMembers[i].add2 = "Invalid PIN detected";
      });
    };
    getCity(s, i);
  };

  const navigate = useNavigate();

  const loadNextPage = (e) => {
    e.preventDefault();
    for (let i = 0; i < teamMembers.length; i++) {
      let el = teamMembers[i];
      if (
        el.name == "" ||
        el.email == "" ||
        el.phoneNum == "" ||
        el.whatsappNum == "" ||
        el.add1 == ""
      ) {
        alert("All fields are mandatory!!!");
        return;
      }
      if (el.phoneNum.length != 10 || el.whatsappNum.length != 10) {
        alert("Please enter a valid number");
        return;
      }
      if (el.pin.length != 6) {
        alert("Invalid PIN detected");
        return;
      }
    }
    let temp = { event: selectedEvent, cat: selectedCategory, len : teamMembers.length};
    props.onSave(teamMembers, temp);
    navigate("/continue");
  };

  const handleEventChange = (e) => {
    let event = String(e.target.value);
    setSelectedEvent(event);
    options.forEach(op => {
      if(op.event == event)
        setCategories(op.categories);
    })
  };

  const Content = () => {
    return (
      <div className="container">
        <div className="appointment-header">Team Details</div>
        <div className="d-inline-flex row mx-3">
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
          {events.map((ob, ind) => {
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
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={selectedTeamSize != "Select Team Size"}
            placeholder="Select Category"
          >
            <option selected>{selectedCategory}</option>
            {categories.map((ob, ind) => {
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
        <div className="form-spacing dropdownContainer">
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
                  standard: "I",
                  school: "",
                  pin: "",
                  add1: "",
                  add2: "",
                  phoneVerified: false,
                  emailVerified: false,
                });
              }
              setTeamMembers(temp);
              setPinarr(Array(parseInt(n)));
            }}
            className="form-select"
            placeholder="Select Event"
          >
            <option selected>{selectedTeamSize}</option>
            {[...Array(getSize(selectedEvent))].map((ob, ind) => {
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
      return (
        <div>
          <ul>
            {teamMembers.map((member, i) => {
              return (
                <li>
                  <div key={"input of " + i} className="card w-75 mb-5">
                    <div className="d-flex inline-block">
                      <div className="mb-3 input-group">
                        <span className="input-group-text">
                          Name
                          <span style={{ color: "#dc3545" }}>*</span>
                        </span>
                        <input
                          type="text"
                          placeholder="Enter Name"
                          className="form-control w-60"
                          id={"inputName" + i}
                          onChange={(e) => {
                            member.name = e.target.value;
                          }}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          Email
                          <span style={{ color: "#dc3545" }}>*</span>
                        </span>
                        <input
                          type="email"
                          placeholder="Enter e-mail"
                          className="form-control"
                          id={"inputEmail" + i}
                          onChange={(e) => (member.email = e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        Contact
                        <span style={{ color: "#dc3545" }}>*</span>
                      </span>
                      <input
                        type="number"
                        maxLength={10}
                        placeholder="Mobile No."
                        className="form-control"
                        id={"inputPhone" + i}
                        required
                        pattern="[1-9]{1}[0-9]{9}"
                        onChange={(e) => (member.phoneNum = e.target.value)}
                      />
                      <input
                        required
                        type="number"
                        maxLength={10}
                        id={"inputWhatsapp" + i}
                        placeholder="WhatsApp No."
                        className="form-control"
                        onChange={(e) => (member.whatsappNum = e.target.value)}
                      />
                    </div>

                    <div className="d-flex inline-block">
                      <div className="input-group w-25 mb-3">
                        <span className="input-group-text">
                          Class
                          <span style={{ color: "#dc3545" }}>*</span>
                        </span>
                        <select
                          id={"standard-Selection" + i}
                          className="form-control"
                          onChange={(e) => {
                            member.standard = e.target.value;
                          }}
                          placeholder="Standard"
                        >
                          {classList.map((std, stdIx) => {
                            return std == member.standard ? (
                              <option selected key={std + "std"}>
                                {std}
                              </option>
                            ) : (
                              <option key={std + "std"}>{std}</option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          School
                          <span style={{ color: "#dc3545" }}>*</span>
                        </span>
                        <input
                          className="form-control"
                          type="text"
                          id={"inputSchool" + i}
                          placeholder="School Name"
                          onChange={(e) => (member.school = e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="d-flex inline-block">
                      <div className="input-group mb-3">
                        <span className="input-group-text">Address 1</span>
                        <input
                          type="text"
                          className="form-control"
                          id={"inputAdd1" + i}
                          placeholder="House no, Lane, Area, Village/City"
                          onChange={(e) => (member.add1 = e.target.value)}
                        />
                      </div>
                      <div className="input-group mb-3 w-35">
                        <span className="input-group-text">
                          PIN
                          <span style={{ color: "#dc3545" }}>*</span>
                        </span>
                        <input
                          type="int"
                          maxLength={6}
                          id={"inputPin" + i}
                          className="form-control"
                          onChange={(e) => {
                            if (e.target.value.length == 6) {
                              loadAddressFromPin(e.target.value, i);
                              let temp = [...pinArr];
                              temp[i] = e.target.value;
                              setPinarr(temp);
                            }
                            member.pin = e.target.value;
                          }}
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <input
                        className="form-control-plaintext"
                        readOnly={true}
                        id={"inputAdd2" + i}
                        placeholder="Block, District and State will be loaded from entered pincode"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="text-center w-75">
            <button
              className="btn-outline-success btn"
              onClick={(e) => loadNextPage(e)}
            >
              Continue
            </button>
          </div>
        </div>
      );
    } else {
      return "";
    }
  };

  return (
    <div className="form mb-5">
      <Content />
    </div>
  );
};
