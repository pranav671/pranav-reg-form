import * as React from "react";

const SelectGroup = (props) => {
	/** "selected" here is state variable which will hold the 
	* value of currently selected dropdown. 
	*/
	const [event, setEvent] = React.useState("");
	const [category, setCategory] = React.useState("");
	// const [size, setSize] = React.useState(0);
	const size = React.useRef(0);
	const [inputdataList, setInputdataList] = React.useState(props.data);
	const [storeddataList, setStoreddataList] = React.useState(props.data);
	/** Function that will set different values to state variable 
	* based on which dropdown is selected 
	*/
	const setEventChangeHandler = (e) => {
		setEvent(e.target.value);
		size.current = 0;
		// document.getElementById('sizeSelect').value = 'choose...';
	};

	const setCategoryChangeHandler = (e) => {
		// size.current = 0;
		document.getElementById('sizeSelect').value = 'choose...';
		document.getElementById('hit').disabled = false;	
		setStoreddataList([]);
		setCategory(e.target.value);
	}

	const handleSizechange = (e) => {
		let n = parseInt(e.target.value);
		size.current = n;
	}

	const loadForm = (e) => {
		teamsizeList = null;
		e.preventDefault();

		// console.log(e);
		flag = false;
		document.getElementById('hit').disabled = true;
		// console.log(inputdataList);
		let temp = [];
		while(temp.length < size.current)
		{
			let n = temp.length;
			temp.push({id:n, name:'', email:''});
		}
		setInputdataList(temp);
		// setInputform(<InputCard n={size.current} onSave={savedata} />);
	}

	const handleEmailChange = (e, x) => {
		e.preventDefault();
		e.stopPropagation();
		let temp = [...inputdataList];
		temp[x].email = e.target.value;
		setInputdataList(temp);		
		// console.log(x)

	}

	const handleNameChange = (e,x) =>
	{
		e.preventDefault();
		let temp = [...inputdataList];
		temp[x].name = e.target.value;
		setInputdataList(temp);	
		// console.log(e)
	}

	const submitForm = (e) =>{
		e.preventDefault();
		console.log("form submission");
	}

	const resetForm = (e) =>
	{
		e.preventDefault();
		window.location.reload(false);	
	}

	const saveNcontinue = (e) =>
	{
		e.preventDefault();
		let temp = [];
		for(let i=0; i<inputdataList.length; i++)
		{
			let el = inputdataList[i];
			el.id = i;
			temp.push(el);
		}
		// console.log(temp);
		inputdataOptions = null;
		props.onStoreData(temp);
		setStoreddataList(temp);
	}

	// const savedata = (data) => {
	// 	props.onSaveData(data);
	// }

	/** Different arrays for different dropdowns */
	const categories = ["Cat 1", "Cat 2", "Cat 3", "Cat 4"];
	const teamsizes = [1, 2, 3, 4, 5];

	/** Type variable to store different array for different dropdown */
	let categoryList = null;
	let teamsizeList = null;
	let flag = false;

	/** Store input values for time being */
	/** This will be used to create set of options that user will see */
	let categoryOptions = null;
	let teamsizeOptions = null;
	var button_vsbl = 'visible';
	let inputdataOptions = null;
	/** Setting Type variable according to selected event */
	if (event === "Event 1") {
		categoryList = categories;
	} else if (event === "Event 2") {
		categoryList = categories;
	} else if (event === "Event 3") {
		categoryList = categories.slice(0, 2);
	}

	/**Setting TEAMSIZE according to the selecte (event,categort) */
	if (category === "Cat 1") {
		teamsizeList = teamsizes.slice(0, 3);
		// setSize(teamsizeList[0]);
	}
	else if (category === "Cat 2") {
		teamsizeList = teamsizes;
		// setSize(teamsizeList[0]);
	}
	else if (category === "Cat 3") {
		teamsizeList = teamsizes.slice(1);
		// setSize(teamsizeList[0]);
	}
	else if (category === "Cat 4") {
		teamsizeList = teamsizes.slice(2);
		// setSize(teamsizeList[0]);
	}

	/** If "Type" is null or undefined then options will be null, 
	* otherwise it will create a options iterable based on our array 
	*/
	if (categoryList) {
		// if(categoryOptions == null)
		// size.current = 0;
		categoryOptions = categoryList.map((el) => <option key={el}>{el}</option>);
		categoryOptions = [<option selected={true}>choose...</option>, ...categoryOptions];
		inputdataOptions = null;
		flag = true;
	}

	if (teamsizeList) {
		teamsizeOptions = teamsizeList.map((i) => <option>{i}</option>)
		teamsizeOptions = [<option selected={true}>choose...</option>, ...teamsizeOptions];
		flag = false;
	}
	else
		teamsizeOptions = null;
	
	if(inputdataList.length > 0) {
		inputdataOptions = inputdataList.map(
			(i, x)=> 
					<div key={i.id}>
						<input
							type="text"
							value={i.name}
							placeholder="Name"
							onChange={(e) =>handleNameChange(e,x)}/>
						<input
							type="email"
							value={i.email}
							placeholder="Email"
							onChange={(e) =>handleEmailChange(e,x)}/>
					</div>);
		inputdataOptions.push(<div>Eveny = {event} <br/> Category = {category} <br/> Teamsize = {size.current}</div>)
	}
	if(storeddataList.length> 0)
	{
		inputdataOptions = storeddataList.map((el, i) => {<p>{i}. Name = {el.name} Email = {el.email}<br/></p>})
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
							categoryOptions
						}
					</select>
				</div>
				<div>
					<select id="sizeSelect" onChange={handleSizechange}>
						{
							teamsizeOptions
						}
					</select>
				</div>
				<h2>Enter data</h2>
				{<button id="hit" onClick={loadForm} disabled={flag} style={{"visibility" : button_vsbl}} className="btn btn-primary">Click me</button>}
				{
					inputdataOptions
				}
				{inputdataOptions && <span> <button onClick={resetForm}>Reset</button> <span style={{'width' : '2rem'}}/> <button onClick={saveNcontinue}>Save and Continue</button></span>}
			</form>
		</div>
	);

};

export default SelectGroup;
