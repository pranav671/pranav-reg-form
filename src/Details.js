import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./temp/Style.css";
import axios from "axios";
import { server_url } from "./App";
import {useParams } from "react-router-dom";

export default function Details(props) {

  const [data, setData] = React.useState(null);
  const [code, setCode]= React.useState('');

  React.useEffect(() => {
    if(data == null)
    {
      axios
        .get(server_url+"/applications/" + id)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
          setCode("enyj");
        })
        .catch((err) => console.log(err));
      return;
    }
  }, [data])

  const generateLink = () => {
    axios.get(server_url+"/newLink/"+data.id)
            .then(res => {
                let links = String(res.data);
                let payment_url = links.split(", ")[1];
                console.log(res)
                data.paymentUrl = payment_url;
                setCode("siomeb")
            
            })
            .catch(err => {
                alert("Error creating payment Link!!!\nTry again.")
            })
            ;
  }

  let {id} = useParams()

  return (
        (code == '' || (data != null && data.id == 'Error'))
        ?
        <>
          <div className="Container mt-5">
            <p className="text-center pt-5">No records found</p>
          </div>
        </>
        :
    <div style={{ color: "black", marginInline: "auto" }}>
      <div
        className="w-80"
        style={{ alignItems: "center", marginInline: "auto" }}
      >
        <h5 className="mt-5 ms-5">Event = {data.event}</h5>
        <h5 className="mt-3 ms-5">Category = {data.category}</h5>
        <h5 className="mt-3 ms-5">Payment status = {data.hasPaid ? "Successful" : "Pending"}</h5>
        <p className="mt-3 ms-5">
        Payment Link = 
          {(data.paymentUrl == null || data.paymentUrl=='error') ? <button className="btn btn-outline-success ms-2" onClick={generateLink}>Generate</button>
          :
          <a href={data.paymentUrl} className="link-danger">{data.paymentUrl}</a>
        }
        </p>
        <p className="mt-2 ms-5">Application Id = {data.id}</p>
        {
          data.members.map((el, i) => {
            // {console.log(el)}
            return ( <div className="card w-65 my-4 ms-5" key={i+"card"} style={{ textAlign: "left" }}>
              <Card data={el} />
            </div>)
            })

        }
      </div>
    </div>
  
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
        Std - {data.standard}
      </p>
      <p>Address - {data.add1+" "+data.add2}</p>
      <div className="d-inline-flex">
        <a>Email : {data.email}<i className="bi bi-patch-check-fill"></i></a>
        <span style={{ color: "white", marginLeft: "6vw" }}></span>
        <p>Phone no : {data.phoneNum} </p>
      </div>
      <p>WhatsApp no : {data.whatsappNum} </p>
    </div>
  );
};
