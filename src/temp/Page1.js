import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import React, { useEffect, useState } from "react";
import "react-dropdown/style.css";
import { useNavigate } from "react-router-dom";
import "./Style.css";

export const Page1 = (props) => {
  const [events, setEvents] = useState({
    "Robotics Premier League": 2,
    "Geek Gala": 5,
    "S.T.E.A.M. Workshops": 1,
  });
  const classList = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', "XI", "XII"]
  const [categories, setCategories] = useState({});
  const [selectedEvent, setSelectedEvent] = useState("Select Event");
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [selectedTeamSize, setSelectedTeamSize] = useState("Select Team Size");
  const [teamMembers, setTeamMembers] = useState([]);
  const [nameArr, setNamearr] = useState([]);
  const [pinArr, setPinarr] = useState([]);
  const [flag, setFlag] = useState(false);  

  useEffect(()=> {
    //set input values here

    for(let i=0; i<teamMembers.length; i++)
    {
      // const getCity = async () => {
      
      //   for(let i=0; i<teamMembers.length; i++)
      //   {
      //     if(teamMembers[i].pin.length != 6)
      //       continue;
      //     const result = await fetch ('https://api.postalpincode.in/pincode/'+teamMembers[i].pin);
      //     result.json().then( json =>{
      //       console.log("fetched for"+i);
      //       if(json[0].Status == 'Success'){
      //         let str = json[0].PostOffice[0].Block+", "+json[0].PostOffice[0].District+", "+json[0].PostOffice[0].State+", India."
      //         teamMembers[i].add2 = str
      //         document.getElementById("inputAdd2"+i).value = str;
      //       }
      //       else  
      //       teamMembers[i].add2 = "Invalid PIN detected"
      //     }
      //     )
      //   }
      // }
      // getCity().then(()=> {
          try
          {
            document.getElementById("inputName"+i).value = teamMembers[i].name;
            document.getElementById("inputEmail"+i).value = teamMembers[i].email;
            document.getElementById("inputPhone"+i).value = teamMembers[i].phoneNum;
            document.getElementById("inputWhatsapp"+i).value = teamMembers[i].whatsappNum;
            document.getElementById("inputSchool"+i).value = teamMembers[i].school;
            document.getElementById("inputAdd1"+i).value = teamMembers[i].add1;
            document.getElementById("inputAdd2"+i).value = teamMembers[i].add2;
            document.getElementById("inputPin"+i).value = teamMembers[i].pin;
          }
          catch(err)
          {
            // console.log("Error",err)
          }
          
      //   })
      }
    }, [pinArr])




    const loadFromIp = (s, i) => {
      const getCity = async (s,i) => {

          const result = await fetch ('https://api.postalpincode.in/pincode/'+s);
          result.json().then( json =>{
            console.log("fetched for"+i);
            if(json[0].Status == 'Success'){
              let str = json[0].PostOffice[0].Block+", "+json[0].PostOffice[0].District+", "+json[0].PostOffice[0].State+", India."
              teamMembers[i].add2 = str
              document.getElementById("inputAdd2"+i).value = str;
            }
            else  
            teamMembers[i].add2 = "Invalid PIN detected"
            
          }
          )
    }
    getCity(s, i);

  }
  
  
  const navigate = useNavigate();

  
  const loadNextPage = (e) => {
    e.preventDefault();
    teamMembers.forEach(el => {
      if(el.pin.length != 6)
      {
        alert("Invalid PIN detected");
        return;
      }
    })
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
                  standard:'',
                  school: '',
                  pin:'',
                  add1: '',
                  add2: '',
                  phoneVerified:false,
                  emailVerified:false
                });
              }
              setTeamMembers(temp);
              setNamearr(Array(parseInt(n)))
              setPinarr(Array(parseInt(n)));
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
      return (
        <div>
          <ol>
            {teamMembers.map((member, i) => {
              return (
                <li>
                  <div key={"input of " + i} className="card w-75 mb-5">
                    <div className="d-flex inline-block">
                      <div className="mb-3 input-group">
                      <span className="input-group-text">Name</span>
                          <input
                          type="text"
                          placeholder="Enter Name"
                          className="form-control w-60"
                          id={"inputName"+i}
                          onChange={(e) => {
                            member.name = e.target.value;
                          }}
                        />
                      </div>
                      <div className="input-group mb-3">
                      <span className="input-group-text">Email</span>
                        <input
                          type="email"
                          placeholder="Enter e-mail"
                          className="form-control"
                          id={"inputEmail"+i}
                          onChange={(e) => member.email = e.target.value}
                        />
                        {/* <button onClick={(e) => verifyEmail(e, i)} className='btn btn-outline-success' type="button">Verify</button> */}
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Contact</span>
                      <input
                        type="number"
                        maxLength={10}
                        placeholder="Mobile No."
                        className="form-control"
                        id={"inputPhone"+i}
                        required pattern="[1-9]{1}[0-9]{9}"
                        onChange={e => member.phoneNum = e.target.value}
                      />
                      <input
                        required type="number"
                        maxLength={10} 
                        id={"inputWhatsapp"+i}
                        placeholder="WhatsApp No."
                        className="form-control"
                        onChange={e => member.whatsappNum = e.target.value}
                      />
                      {/* <button onClick={(e) => verifyPhone(e, i)} className='btn btn-outline-success' type="button">Verify</button> */}
                    </div>

                    <div className="d-flex inline-block">
                      <div className="input-group w-25 mb-3">
                        <span className="input-group-text">Class</span>
                        <select id={"standard-Selection"+i} className='form-control' onChange={(e) => {
                          member.standard = e.target.value;
                        }} placeholder="Standard">
                          {
                            classList.map((std, stdIx) => {
                              return (
                                std == member.standard ?
                                  <option selected key={std+"std"}>{std}</option> :
                                <option key={std + 'std'}>{std}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">School</span>
                        <input className="form-control" type="text" id={"inputSchool"+i} placeholder="School Name" onChange={e => member.school = e.target.value}/>
                      </div>
                    </div>
                    <div className="d-flex inline-block">
                      <div className="input-group mb-3">
                        <span className="input-group-text">Address 1</span>
                        <input type="text" className="form-control" id={"inputAdd1"+i} placeholder="House no, Lane, Area, Village/City" onChange={e => member.add1 = e.target.value}/>
                      </div>
                      <div className="input-group mb-3 w-35">
                        <span className="input-group-text">PIN</span>
                        <input type="int" maxLength={6} id={"inputPin"+i} className="form-control" onChange={(e) =>{
                          if(e.target.value.length == 6)
                          {
                            loadFromIp(e.target.value, i);
                            let temp = [...pinArr];
                            temp[i] = e.target.value;
                            setPinarr(temp);
                          }
                           member.pin = e.target.value
                           }}/>
                      </div>
                    </div>
                    <div className="input-group">
                      <input className="form-control-plaintext" readOnly={true} id={"inputAdd2"+i} placeholder="Block, District and State will be loaded from entered pincode"/>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

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
      {/* <MyNavbar /> */}
      {/* {console.log(teamMembers)} */}
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
