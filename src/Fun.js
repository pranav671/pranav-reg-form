import React from 'react'
import "bootstrap/dist/css/bootstrap.css";


const Fun = (args) => {
  return (
    <>
    <div><h2>Entered Info</h2></div>
    <div>
      <h5>Event selected = {args.info}</h5>
      {/* <h5>Category selected = {args.info.cat}</h5> */}
      {args.data.map((el)=><a>Name = {el.name} and email = {el.email}</a>)}
    </div>
    <p>{args.text}</p>
    </>
  )
}

export default Fun;