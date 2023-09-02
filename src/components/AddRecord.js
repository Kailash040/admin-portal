import React, { useState } from 'react';

import { MultiSelect } from "react-multi-select-component";
function AddRecord() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dob,setDob] =useState("");
  const [gender,setGender]=useState("");
  const  [houseNo,setHouseNo]=useState('');
  const  [nearBy,setNearBy] =useState("")
  const [phoneNo,setPhoneNo] =useState("")
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState('');
  const [fileInputKey, setFileInputKey] = useState(Date.now());
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
//  


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
    console.log(selectedImage);
  };
// 
  const handleSubmit = event => {
    event.preventDefault();

    const newPost = {
      name: name,
      description: description,
      dob:dob,
      gender:gender,
      selected:selected,
      houseNo:houseNo,
      nearBy:nearBy,
      phoneNo:phoneNo,
      selectedImage:selectedImage
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
       setHouseNo("");
       setNearBy("");
       setPhoneNo("")
       setSelectedImage(null)
       setFileInputKey(Date.now());
      })
      .catch(error => {
        console.error('Error adding new post:', error);
      });
  };

  return (
    <div>
      <h2>Create a New User</h2>
      <form onSubmit={handleSubmit}>
        <div className='position-relative'>


      <input type="file" accept="image/*" onChange={handleImageChange}  key={fileInputKey} />

  
 

       {selectedImage && (
        <img
        className='rounded-5'
        src={selectedImage}
        alt="Selected"
        style={{ width: '150px',
      height:"200px"  }}
        />
        )}
    
        </div>
        <div className='row'>
<div className='col-lg-6 col-sm-12'>

      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input  type="text"
            id="name"
            value={name}
            onChange={handleNameChange} className="form-control"  aria-describedby="emailHelp"/>
   
  </div>
</div>
<div className='col-lg-6 col-sm-12'>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
    <input type="text"  id="exampleInputPassword1"
            value={description}
            onChange={handleDescriptionChange} className="form-control" />
  </div>
 
</div>
        </div>
      <div className='row'>
        <div className='col-lg-6 col-sm-12'>
        <label htmlFor="dob" className="form-label">Date of birth</label>
        <input type="date" value={dob} id='dob' onChange={handleDobChange} aria-describedby="emailHelp" className='col-lg-12 form-control'  />
        </div>
        <div className='col-lg-6 col-sm-12'>
       
       <label htmlFor="exampleInputEmail1" className="form-label">Gender</label>
        <select className="form-select"  value={gender} id='gender'  onChange={handleGenderChange} aria-label="Default select example">
 
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>

</div>
      </div>
      <div className='row'>
        <div className='col-lg-12 col-sm-12'>
      <label htmlFor="exampleInputEmail1" className="form-label">Skills</label>
        <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
        isCreatable={true}
      />

        </div>
        <div className='col-lg-12 col-sm-12 py-2' >
        <label htmlFor="address" className="form-label">Address :</label>
        <div className='row' >
        <div className='col-lg-4'>
        <label htmlFor="houseno" className="form-label">House No:</label>
          <input  type="text"
            id="houseno" 
            className="form-control" onChange={(e)=>setHouseNo(e.target.value)} value={houseNo}  aria-describedby="emailHelp"/>
            </div> 
            <div className='col-lg-4'>
            <label htmlFor="nearby" className="form-label">Nearby:</label>
              <input  type="text"
            id="nearby"  onChange={(e)=>setNearBy(e.target.value)} value={nearBy}
            className="form-control"  aria-describedby="emailHelp"/>
            </div> 
            <div className='col-lg-4'>
            <label htmlFor="phoneno" className="form-label">Phone Number:</label>
              <input  type="text"
            id="phoneno" onChange={(e)=>setPhoneNo(e.target.value)} value={phoneNo}
            className="form-control"  aria-describedby="emailHelp"/>
            </div> 
            </div>
</div>

      </div>
        <button type="submit" className="btn btn-primary" >Save</button>
      </form>
    </div>
  );
}

export default AddRecord;