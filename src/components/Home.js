// import MainSection from "./components/MainSection";
// import SideBar from "./components/SideBar";
import SideBar from "./SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import { Link } from "react-router-dom";
import AddRecord from "./AddRecord";
const Home = () => {
  const [selectedItem, setSelectedItem] = useState([]);
  const [data, setData] = useState([]);
  const [id, setId] = useState();

  const [value, setValue] = useState({
    name: "",
    description: "",
  });

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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/employees/${id}`, value)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    //
  };
  //
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-sm-12">
            <div
              id=""
              style={{
                overflowY: "scroll",
                height: "480px",
                cursor: "pointer",
              }}
            >
              {data.map((value, id) => {
                return (
                  <a
                    key={value.id}
                    // href={value.id}
                    onClick={() => onItemClick(value, id)}
                    class="list"
                  >
                    <div className="d-flex align-items-center py-1">
                      {/* Home */}
                      <img
                        src={value.base64Image}
                        alt="img"
                        style={{
                          width: "40px",
                          borderRadius: "50%",
                          height: "40px",
                        }}
                      />
                      <span className="text-truncate">
                        {value.name} {value.description} {value.gender}{" "}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
          <div className="col-lg-9 col-sm-12">
            {/* <MainSection /> */}
            {/* <AddRecord /> */}
            {/* edit modal */}
            <div class="d-flex justify-content-between p-4">
              <button
                type="button"
                class="btn btn-primary"
              
              >
                <Link  style={{color:"white","textDecoration":"none"}} to={`/${selectedItem.id}`}
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
                      >
                        Close
                      </button>
                      {/* <button type="button" class="btn btn-primary">Understood</button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* edit modal end */}
            {/* */}
            {selectedItem && (
              <div>
                <div className="row">
                  <div className="col-lg-3">
                    <img
                      className=""
                      style={{ width: "200px", height: "200px" }}
                      src={selectedItem.base64Image}
                    />
                  </div>
                  <div className="col-lg-9">
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

                {/* Add more item details as needed */}
              </div>
            )}
            {/* edit operation */}
            <div>
              <h2>Edit Resource</h2>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Field 1:
                  <input
                    type="text"
                    name="field1"
                    value={value.name}
                    onChange={(e) =>
                      setValue({ ...value, name: e.target.value })
                    }
                  />
                </label>
                <label>
                  Field 2:
                  <input
                    type="text"
                    name="field2"
                    value={value.description}
                    onChange={(e) =>
                      setValue({ ...value, description: e.target.value })
                    }
                  />
                </label>
                <button type="submit">Update</button>
              </form>
            </div>
            {/*  */}
            {/* {selectedItem.selected && selectedItem.selected.length > 0 && (
              <div>
                <h2>Skills</h2>
                <ul>
                  {selectedItem.selected.map((item, index) => (
                    <li key={index}>{item.value}</li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
