import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Style.css";
import axios from "axios";
import { server_url } from "../App";
import {useParams } from "react-router-dom";

export default function Exp(args) {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    if(data == null)
    {
      let res = {
        "name" : "User Name",
        "email" : "username@serviceprovider.isp",
        "school" : "Saint Tams Multi--Medium Public School",
        "std" : "IX",
        "add" : "House, Lane, Gully, Nagar, Village, City, State, India, PIN-XXXXXX.",
        "phone" : "+91-963085241",
        "whats" : "+91-654129875"
      }
      setData(res)
    }
    else
    {
      console.log("loaded")
    }
  }, [data])

  let {id} = useParams()
  return (
    data && 
    (<div style={{ color: "black", marginInline: "auto" }}>
      <div
        className="w-80"
        style={{ alignItems: "center", marginInline: "auto" }}
      >
        <h5 className="mt-5 ms-5">Event = Event</h5>
        <h5 className="mt-3 ms-5">Category = category</h5>
        <h5 className="mt-3 ms-5">Payment status = Successful</h5>
        <p className="mt-3 ms-5">
          Payment Link = <a>https://anywhere.net</a>
        </p>
        <p className="mt-2 ms-5">Application Id = {id}</p>
        <div className="card w-65 mx-3 ms-5" style={{ textAlign: "left" }}>
          <Card data={data} />
        </div>
      </div>
    </div>)
  );
}

/**
 *
 * name
 * shcloo
 * add
 * email
 * num
 */

const Card = (props) => {
  let data = props.data;
  return (
    <div className="card-body ps-5">
      <p>Name : {data.name}</p>
      <p>
        School = {data.school}
        <a className="user-select-none" style={{ color: "#fbfbfb" }}>- - - - -{" "}</a>
        Std - {data.std}
      </p>
      <p>Address - {data.add}</p>
      <div className="d-inline-flex">
        <a>Email : {data.email}<i className="bi bi-patch-check-fill"></i></a>
        <span style={{ color: "white", marginLeft: "6vw" }}></span>
        <p>Phone no : {data.phone} </p>
      </div>
      <p>WhatsApp no : {data.whats} </p>
    </div>
  );
};
