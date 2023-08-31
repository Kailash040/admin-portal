import React, { useState } from 'react';

import { MultiSelect } from "react-multi-select-component";
function AddRecord() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dob,setDob] =useState("");
  const [gender,setGender]=useState("");
  const [address,setAddress] =useState({

    houseNo:"",
    nearBy:"",
    phoneNo:""
  }
  )
  console.log(address.houseNo);
  const options = [
    { label: "Html", value: "Html" },
    { label: "Css ", value: "Css" },
    { label: "Python ", value: "Python" },
    { label: "Javascript ", value: "Javascript" },
   
    { label: "Nextjs ", value: "Nextjs" },
    { label: "Django ", value: "Django" }
  
  ];
  const [selected, setSelected] = useState([]);
  // console.log(selected)
  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
    
  };
  const handleDobChange=event=>{
    setDob(event.target.value);
    console.log(dob)
  }
  const handleGenderChange =event =>{
    setGender(event.target.value)
    console.log(gender)
  }
  const handleAddressChange =event=>{
    setAddress(event.target.value)
    console.log(address)
  }
  const handleSubmit = event => {
    event.preventDefault();

    const newPost = {
      name: name,
      description: description,
      dob:dob,
      gender:gender,
      selected:selected,
      address:{
        houseNo:address.houseNo,
        nearBy:address.nearBy,
        phoneNo:address.phoneNo
      }
    };

    fetch('http://localhost:3001/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
      
    })
      .then(response => response.json())
      .then(data => {
        console.log('New post added:', data);
        // Reset form fields
        setName('');
        setDescription('');
        setDob("")
        setGender("");
        setSelected([])
        setAddress({

          houseNo:"",
          nearBy:"",
          phoneNo:""
        })
      })
      .catch(error => {
        console.error('Error adding new post:', error);
      });
  };

  return (
    <div>
      <h2>Create a New User</h2>
      <form onSubmit={handleSubmit}>
        <div className='row'>
<div className='col-lg-6 col-sm-12'>

      <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input  type="text"
            id="name"
            value={name}
            onChange={handleNameChange} class="form-control"  aria-describedby="emailHelp"/>
   
  </div>
</div>
<div className='col-lg-6 col-sm-12'>

  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Description</label>
    <input type="text"  id="exampleInputPassword1"
            value={description}
            onChange={handleDescriptionChange} class="form-control" />
  </div>
 
</div>
        </div>
      <div className='row'>
        <div className='col-lg-6 col-sm-12'>
        <label for="dob" class="form-label">Date of birth</label>
        <input type="date" value={dob} id='dob' onChange={handleDobChange} aria-describedby="emailHelp" className='col-lg-12 form-control'  />
        </div>
        <div className='col-lg-6 col-sm-12'>
       
       <label for="exampleInputEmail1" class="form-label">Gender</label>
        <select class="form-select"  value={gender} id='gender'  onChange={handleGenderChange} aria-label="Default select example">
 
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>

</div>
      </div>
      <div className='row'>
        <div className='col-lg-12 col-sm-12'>
      <label for="exampleInputEmail1" class="form-label">Skills</label>
        <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
        isCreatable={true}
      />

        </div>
        <div className='col-lg-12 col-sm-12 py-2' >
        <label for="address" class="form-label">Address :</label>
        <div className='row' >
        <div className='col-lg-4'>
        <label for="houseno" class="form-label">House No:</label>
          <input  type="text"
            id="houseno" 
            class="form-control" onChange={handleAddressChange} value={address.houseNo}  aria-describedby="emailHelp"/>
            </div> 
            <div className='col-lg-4'>
            <label for="nearby" class="form-label">Nearby:</label>
              <input  type="text"
            id="nearby"  onChange={handleAddressChange} value={address.nearBy}
            class="form-control"  aria-describedby="emailHelp"/>
            </div> 
            <div className='col-lg-4'>
            <label for="phoneno" class="form-label">Phone Number:</label>
              <input  type="text"
            id="phoneno" onChange={handleAddressChange} value={address.phoneNo}
            class="form-control"  aria-describedby="emailHelp"/>
            </div> 
            </div>
</div>

      </div>
        <button type="submit" class="btn btn-primary" >Save</button>
      </form>
    </div>
  );
}

export default AddRecord;