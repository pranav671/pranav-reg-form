import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SelectGroup from './select group';
import MyNavbar from './Navbar';


export const Home = (props) => {


    const [data, setdata] = useState([]);
    const [selectVis, setSelectVis] = useState('visible');
    const [dataVis, setDataVis] = useState('hidden');
    const [continueLink, setContinueLink] = useState('');

    const saveData = (data) => {
        console.log(data)
        setdata(data);
        setSelectVis('hidden');
        setDataVis('visible')
        setContinueLink(<Link to='/continue'><span>Continue</span></Link>);
        props.onSave(data);
    }

    const init = () => {
        console.log("loaded");
        console.log(data);
    }

    const editData = (e) => {
        e.preventDefault();
        console.log("editData called")
        setSelectVis('visible');
        setDataVis('hidden');
        setdata([...data]);

    }

    let dataoption = null;

    if (data) {
        // dataoption = data.forEach((el)=>{<span>Email = {el.name}, Name = {el.name}</span>})
        dataoption = [];
        data.forEach(element => {
            dataoption.push(<p>Name = {element.name}, Email = {element.email}</p>)
        });
    }


    return (
        <>
            <div>
                <MyNavbar />
            </div>
            <div className="App">
                <div>
                    {data.length === 0 && <SelectGroup onStoreData={saveData} visibility={selectVis} data={data}>
                    </SelectGroup>}
                    <div visibility={dataVis}>
                        {dataoption}
                    </div>
                    {continueLink}
                </div>
            </div>
        </>
    )
}
