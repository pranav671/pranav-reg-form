import * as React from "react"; 

const SelectGroup = () => { 
/** "selected" here is state variable which will hold the 
* value of currently selected dropdown. 
*/
const [event, setEvent] = React.useState(""); 
const [category, setCategory] = React.useState("");
const [size, setSize] = React.useState(0);
const [data, setdata] = React.useState("");
const [inputform, setInputform] = React.useState([]);

/** Function that will set different values to state variable 
* based on which dropdown is selected 
*/
const setEventChangeHandler = (e) => { 
	setEvent(e.target.value); 
	setdata("");

}; 

const setCategoryChangeHandler = (e) => {
	setCategory(e.target.value);
	setdata("");
}

let display = (e)=> {
	setSize(parseInt(e.target.value));
	setInputform(new Array[e.target.value]);
	setdata("Selected options are<br/> Event = " + event+"<br/>category = "+category+"<br/>teamsize = "+e.target.value);
}

/** Different arrays for different dropdowns */
const categories = ["Cat 1", "Cat 2", "Cat 3","Cat 4"]; 
const teamsizes = [1,2,3,4,5]; 

/** Type variable to store different array for different dropdown */
let categoryList = null; 
let teamsizeList = null;

/** This will be used to create set of options that user will see */
let categoryOptions = null;
let teamsizeOptions = null; 
/** Setting Type variable according to selected event */
if (event === "Event 1") { 
	categoryList = categories;
} else if (event === "Event 2") { 
	categoryList = categories; 
} else if (event === "Event 3") { 
	categoryList = categories.slice(0,2); 
} 

/**Setting TEAMSIZE according to the selecte (event,categort) */
if(category === "Cat 1") {
	teamsizeList = teamsizes.slice(0,3);
}
else if(category === "Cat 2") {
	teamsizeList = teamsizes;
}
else if(category === "Cat 3") {
	teamsizeList = teamsizes.slice(1);
}
else if(category === "Cat 4") {
	teamsizeList = teamsizes.slice(2);
}

/** If "Type" is null or undefined then options will be null, 
* otherwise it will create a options iterable based on our array 
*/
if (categoryList) { 
	categoryOptions = categoryList.map((el) => <option key={el}>{el}</option>); 
}

if(teamsizeList) {
	teamsizeOptions = teamsizeList.map((i)=><option key={i}>{i}</option>)
}


return ( 
	<div 
	style={{ 
		padding: "16px", 
		margin: "16px", 
	}} 
	> 
	<form> 
		<div> 
		{/** Bind changeSelectOptionHandler to onChange method of select. 
		* This method will trigger every time different 
		* option is selected. 
		*/} 
		<select onChange={setEventChangeHandler}> 
			<option>Choose...</option> 
			<option>Event 1</option> 
			<option>Event 2</option> 
			<option>Event 3</option> 
		</select> 
		</div> 
		<div> 
		<select onChange={setCategoryChangeHandler}> 
			{ 
			/** This is where we have used our options variable */
			categoryOptions 
			} 
		</select> 
		</div>
		<div>
		<select onChange={display}>
			{
				teamsizeOptions
			}
		</select>
		{size && <div>{data}</div>}
		{
			inputform
		}
		</div> 
	</form> 
	</div> 
); 

}; 

export default SelectGroup; 

//https://www.youtube.com/watch?v=tHjxSVaj_wY&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=10