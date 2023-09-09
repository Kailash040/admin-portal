// import MainSection from "./components/MainSection";
// import SideBar from "./components/SideBar";
// import SideBar from "./SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import { Link } from "react-router-dom";
import AddRecord from "./AddRecord";
import logo from '../images/logo.webp'
import moment from 'moment';
const Home = () => {
  const refresh = () => window.location.reload(true);

  const [selectedItem, setSelectedItem] = useState([]);
  const [data, setData] = useState([]);

  const onItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    // Fetch data when the component mounts

    axios
      .get("http://localhost:3001/employees")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(data);

  useEffect(() => {
    axios
      .get("http://localhost:3001/employees/" + selectedItem)
      .then((res) => {
        setSelectedItem(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // edit

  return (
    <div>
      <div className="d-flex justify-content-between p-4">
        
          <div className="left_section">

          
           
              {data.map((value, id) => {
                return (
                  <a
                    key={value.id}
                    // href={value.id}
                    onClick={() => onItemClick(value, id)}
                    class="list"
                  >
                    <div className=" left_item_grid ">
                      {/* Home */}
                      <img
                        src={value.base64Image}
                        alt="img"
                        style={{
                          width: "70px",
                          borderRadius: "50%",
                          height: "60px",
                        }}
                      />
                    <div className="left_section_item ">
                      <div className="left_section_item_name_description">

                       <p>Name : {value.name}</p>
                       <p>Description : {value.description.slice(0,5)}..</p>
                       
                      </div>
                    </div>
                      <div className="left_section_item_data_skill">
                      <p>DOB : {moment(value.dob).format("MMM Do YY")}</p>
                      <p>Skills : {value.selected
.length}</p>
                      </div>
                     
                    </div>
                  </a>
                );
              })}
         
         </div>
         <div className="right_section">

         
            <div class="d-flex justify-content-between p-4">
              <button type="button" class="btn btn-primary">
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={`/${selectedItem.id}`}
                >
                  Edit {selectedItem.id}
                </Link>
              </button>

              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Add User
              </button>

              <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">
                        Add User
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <AddRecord />
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={refresh}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* edit modal end */}
            {/* */}
            {selectedItem && (
              <div>
              
                
                    {
                      selectedItem.base64Image ? <img
                      className=""
                      style={{ width: "200px", height: "200px" ,"borderRadius":"50%" }}
                      src={selectedItem.base64Image}
                    /> :<img
                    className=""
                    style={{ width: "200px", height: "200px" ,"borderRadius":"50%" }}
                    src={logo}
                  />
                    }
                    
                 
                  <div className="">
                    <h2>Details : {selectedItem.name} </h2>
                    <h3>Description : {selectedItem.description}</h3>
                    <h4>Gender : {selectedItem.gender}</h4>
                    <p>
                      {" "}
                      <b>Date Of Birth : </b>
                      {selectedItem.dob}
                    </p>
                    <p>
                      <b>Address : </b> :<b>House No : </b>{" "}
                      {selectedItem.houseNo} <b>Nearby : </b>
                      {selectedItem.nearBy} <b>PhoneNo : </b>
                      {selectedItem.phoneNo}{" "}
                    </p>
                  </div>
                
              </div>
            )}

            {selectedItem.selected && selectedItem.selected.length > 0 && (
              <div>
                <h2>Skills</h2>
                <ul>
                  {selectedItem.selected.map((item, index) => (
                    <li key={index}>{item.value}</li>
                  ))}
                </ul>
              </div>
            )}
         </div>
        </div>
      </div>
  
  );
};

export default Home;
