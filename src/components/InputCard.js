import React, { useState } from 'react'

export const InputCard = (props) => {

    const [arr, setArray] = useState(new Array(props.n).fill({name:"", email:""}));

    const handleEmailChange = (event) => {
        let temp = [...arr];
        // temp[parseInt(event.target.key)].email = event.target.value;
        setArray(temp);
    }

    const handleNameChange = (event) => {
        let temp = [...arr];
        console.log(event.target.id);
        temp[parseInt(event.target.id)].name = event.target.value;
        console.log(temp)
        setArray(temp);
    }

    const sendDataUp = (e)=> {
        e.preventDefault();
        props.onSave(arr);
    }

    const check = ()=>{
        console.log("inputcard loaded, n = "+props.n);
        console.log(arr);
    }

    return (
    <div>
        <p>InputCard</p>
        {
            arr.map((el, i)=>{
                return(
                <div>
                    <input
                    type='text'
                    key={i}
                    id={i}
                    value={el.name}
                    onChange={handleNameChange}
                    placeholder='Name'/>
                    <input
                    type='email'
                    key={i+'email'}
                    value={el.email}
                    onChange={handleEmailChange}
                    placeholder='Email'/>
                    </div>)
            })
        }
        {
            check()
        }
        <button onClick={sendDataUp}>Save</button>
    </div>
  )
}
