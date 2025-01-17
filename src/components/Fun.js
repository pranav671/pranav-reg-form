import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { server_url } from "../App";
import "./Style.css";
import { useNavigate } from "react-router-dom";

const Fun = (args) => {
  const [teamMembers, setTeamMembers] = useState(args.data);
  const event = args.info.event;
  const cat = args.info.cat;
  const [editor, setEditor] = useState(true);
  const [ipt, setipt] = useState(10);
  const [id, setId] = useState("");
  const [OTP, setOTP] = useState([-1, -1]);
  const [paymentLink, setPaymentLink] = useState("Err");

  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();
    let info = [
      { name: event, email: cat, phoneVerified: false, school: "error" },
    ];
    let payload = { members: args.data, info: info };
    // check for verification
    for (let i = 0; i < teamMembers.length; i++) {
      let element = teamMembers[i];
      // check for phone after implementing it in the backend
      if (!element.emailVerified) {
        alert("Please complete the verification first!!!");
        return;
      }
      if (element.add2 == "Invalid PIN detected") {
        alert("Please try again with a valid PIN code");
        return;
      }
    }
    if (id != "") {
      axios
        .get(server_url + "/newLink/" + id)
        .then((response) => {
          // console.log(response);
          let links = String(response.data);
          let payment_url = links.split(", ")[1];
          if (payment_url === "error") {
            alert("Error creating payment link.\nPlease try again");
          } else setPaymentLink(payment_url);
          let id = links.split(", ")[0];
          setId(id);
        })
        .catch((err) => console.log(err));
      return;
    }
    axios
      .post(server_url + "/newEntry", payload)
      .then((response) => {
        // console.log(response);
        let links = String(response.data);
        let payment_url = links.split(", ")[1];
        if (payment_url === "error") {
          alert("Error creating payment link.\nPlease try again");
        } else setPaymentLink(payment_url);
        let id = links.split(", ")[0];
        setId(id);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    for (let i = 0; i < teamMembers.length; i++)
      document.getElementById("cityNstate" + i).value = teamMembers[i].add2;
  }, [teamMembers]);

  const verifyEmail = async (e, i) => {
    handleOpenotpmodal();
    let res = await axios
      .get(server_url + "/verifyEmail?email=" + teamMembers[i].email)
      .catch((err) => console.log(err));
    if (res) setOTP([res.data, e.target.id]);
    else handleCloseotpmodal();
    // console.log(OTP, " recieved");
  };

  const verifyPhone = (e, i) => {
    //Implement this
  };
  const [openOTPModal, setOpenotpmodal] = React.useState(false);
  const handleOpenotpmodal = () => setOpenotpmodal(true);
  const handleCloseotpmodal = () => setOpenotpmodal(false);

  const goBack = () => {
    navigate('/');
  }

 
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openOTPModal}
          onClose={handleCloseotpmodal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openOTPModal}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Enter the OTP sent to you
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <input
                  className="form-control w-50"
                  id="OTPinput"
                  onChange={(e) => setipt(e.target.value)}
                  placeholder="OTP"
                />
                <button
                  className="btn btn-primary mt-4"
                  onClick={(e) => {
                    if (ipt == OTP[0]) {
                      // console.log("Success for id = ", OTP[1]);
                      let b = document.getElementById(OTP[1]);
                      b.innerHTML = "Verified";
                      b.disabled = true;
                      let s = OTP[1];
                      s = parseInt(s.charAt(s.length - 1));
                      teamMembers[s].emailVerified = true;
                      // console.log(teamMembers[s]);
                      handleCloseotpmodal();
                    } else alert("Invalid OTP! Try again.");
                  }}
                >
                  Submit
                </button>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
      <div className="container mt-5 " style={{"font-family": 'Playfair Display'}}>
        <div className="mx-4" >
        <div className="mb-4 ps-2">
          <h2>Event = {event}</h2>
        </div>
        <div className="ps-2 mb-5">
          <h2>Category = {cat}</h2>
        </div>
        </div>
        <ol>
          {teamMembers.map((member, i) => {
            return (
              <li>
                <div key={"input of " + i} className="card w-80 mb-5">
                  <div className="d-flex inline-block">
                    <div className=" input-group mb-3">
                      <span className="input-group-text">Name</span>
                      <input
                        type="text"
                        className="form-control w-60"
                        value={member.name}
                        readOnly={editor}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Email</span>
                      <input
                        type="email"
                        className="form-control"
                        value={member.email}
                        readOnly={editor}
                      />
                      {member.emailVerified ? (
                        <button
                          disabled
                          className="btn btn-outline-success"
                          id={"emailOtp-btn" + i}
                          type="button"
                          onClick={(e) => verifyEmail(e, i)}
                        >
                          Verified
                        </button>
                      ) : (
                        <button
                          onClick={(e) => verifyEmail(e, i)}
                          className="btn btn-outline-success"
                          id={"emailOtp-btn" + i}
                          type="button"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <div id="timer" className="h-50"></div>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Contact No.</span>
                    <input
                      type="number"
                      className="form-control"
                      value={member.phoneNum}
                      readOnly={editor}
                    />
                    <input
                      required
                      type="number"
                      className="form-control"
                      value={member.whatsappNum}
                      readOnly={editor}
                    />
                    <button
                      onClick={(e) => verifyPhone(e, i)}
                      className="btn btn-outline-success"
                      id={"phoneOtp-btn" + i}
                      type="button"
                    >
                      Verify
                    </button>
                  </div>
                  <div className="d-flex inline-block">
                    <div className="input-group w-25 mb-3">
                      <span className="input-group-text">Class</span>
                      <input
                        type="text"
                        className="form-control"
                        readOnly={editor}
                        value={member.standard}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">School</span>
                      <input
                        className="form-control"
                        type="text"
                        value={member.school}
                        readOnly={editor}
                      />
                    </div>
                  </div>
                  <div className="d-flex inline-block">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Address 1</span>
                      <input
                        type="text"
                        className="form-control"
                        value={member.add1}
                        readOnly={editor}
                      />
                    </div>
                    <div className="input-group mb-3 w-35">
                      <span className="input-group-text">PIN</span>
                      <input
                        type="int"
                        maxLength={6}
                        className="form-control"
                        readOnly={editor}
                        value={member.pin}
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <input
                      className="form-control"
                      readOnly={true}
                      id={"cityNstate" + i}
                      value={
                        teamMembers[i].add2 == ""
                          ? "Invalid PIN detected please re-fill the form"
                          : teamMembers[i].add2
                      }
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        {teamMembers.length > 0 && (
          <div className="text-center w-80">
            <br />
            <button className="btn btn-outline-secondary mx-5"  onClick={goBack}>
              Edit
            </button>
            {paymentLink === "Err" ? (
              <button
                className="btn btn-outline-primary"
                onClick={handleSubmission}
              >
                Load Payment Link
              </button>
            ) : (
              <a href={paymentLink} className="btn btn-success">
                Proceed to payment
              </a>
            )}
            {/* {id !== "" && (
              <p>You can track your application details <a href={'/exp/'+id}>here</a></p>
            )} */}
          </div>
        )}
      </div>
    </>
    
  );
};

export default Fun;
