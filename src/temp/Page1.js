import React, { useState } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import 'font-awesome/css/font-awesome.min.css';
import './Style.css'


export const Page1 = (props) => {
    const [events, setEvents] = useState({
        event1: 3,
        event2: 5,
        event3: 2
    })
    const [seeTeams, setSeeTeams]=  useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [selectedTeamSize, setSelectedTeamSize] = useState(null)
    const [teamMembers, setTeamMembers] = useState({})
    const [teamSize, setTeamSize] = useState(0)
    
    return (
        <div>
            <Content seeTeams={seeTeams} events={events} setSeeTeams={setSeeTeams}
            selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} 
            selectedTeamSize={selectedTeamSize} setSelectedTeamSize={setSelectedTeamSize} 
            teamSize={teamSize} setTeamSize={setTeamSize}/>
        </div>
    )
}

const Content = ({seeTeams,events,setSelectedEvent,selectedEvent,selectedTeamSize,setSelectedTeamSize,setSeeTeams,teamSize,setTeamSize}) => {
    return (
        <div className="web-container">
            <div className="appointment-header">Team Details</div>
            <div className="row">
                <EventDropDown events={events} setSeeTeams={setSeeTeams} setSelectedEvent={setSelectedEvent}/>
                <TeamSizeDropDown events={events} selectedEvent={selectedEvent} setTeamSize={setTeamSize}/>
            </div>
            <div>
                <TeamTable events={events} selectedEvent={selectedEvent} teamSize={teamSize}/>
            </div>
        </div>
    )
}


const EventDropDown = ({events, setSeeTeams,setSelectedEvent}) => {
    return (
        <div className="form-sapcing dropdownContainer">
            <label htmlFor="eventDrop">
                <a>Select Event</a>
                <span style={{color: "#dc3545"}}>*</span>
            </label>
            <select id="eventDrop" className="form-select"
             onChange={e => setSelectedEvent(e.target.value)}
             placeholder="Select Event">
                <option>Select Event</option>
                {Object.keys(events).map((ob,ind) => {
                    return (
                        <option key={ind}>{ob}</option>
                    )
                })}
            </select>
        </div>
    )
}

const TeamSizeDropDown = ({events,selectedEvent,teamSize,setTeamSize}) => {
    if (selectedEvent && selectedEvent != "Select Event"){
    return (
        <div className="form-sapcing dropdownContainer">
            <label htmlFor="teamDrop">
                <a>Select Team Size</a>
                <span style={{color: "#dc3545"}}>*</span>
            </label>
            <select id="teamDrop" 
            onChange={e => setTeamSize(parseInt(e.target.value))}
            className="form-select" placeholder="Select Event">
                <option>
                    Select
                </option>
                {[...Array(events[selectedEvent])].map((ob,ind)=> {
                    return (
                        <option key={ind}>{ind+1}</option>
                    )
                })}
            </select>
        </div>
    )}  else{
        return ("")
    }
}

const TeamTable = ({events,selectedEvent,teamSize}) => {
    if (selectedEvent && selectedEvent != "Select Event" && teamSize){
    return (
        <table className="table">
            <thead className="tablehead">
                <tr>
                    <th>No.</th>
                    <th>Player_id</th>
                </tr>
            </thead>
            <tbody>
                {[...Array(teamSize)].map((ob,ind)=> {
                    return (
                        <tr key={ind}>
                            <th>{ind+1}</th>
                            <th><input className="emailInput" placeholder="email_id here..." /></th>
                        </tr>
                    )
                })}
                
            </tbody>
        </table>
    )}  else {
        return ("")
    }
}
