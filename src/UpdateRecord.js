import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";

const UpdateRecord = () => {
  const [value, setValue] = useState({
    name: "",
    description: "",
    dob: "",
    gender: "",
    houseNo: "",
    nearBy: "",
    phoneNo: "",
    selectedImage: null,
    base64Image: null,
    selected: [],
    options: [
      { label: "Html", value: "Html" },
      { label: "Css ", value: "Css" },
      { label: "Python ", value: "Python" },
      { label: "Javascript ", value: "Javascript" },

      { label: "Nextjs ", value: "Nextjs" },
      { label: "Django ", value: "Django" },
    ],
  });
  const options = [
    { label: "Html", value: "Html" },
    { label: "Css ", value: "Css" },
    { label: "Python ", value: "Python" },
    { label: "Javascript ", value: "Javascript" },

    { label: "Nextjs ", value: "Nextjs" },
    { label: "Django ", value: "Django" },
  ];
  //

  //
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // setSelectedImage(file);
        // setValue.base64Image(reader.result); // Base64-encoded image data
        setValue({ ...value, base64Image: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };
  //

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:3001/employees/" + id)
      .then((res) => {
        setValue(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/employees/${id}`, value)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
    //
  };
  const handleUserDelete = (event) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:3001/employees/${id}`, value)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
    //
  };
  console.log(value);
  return (
    <div className="py-1">
      {/* <form onSubmit={handleUserDelete}>
<button type="submit" className="btn btn-primary">Delete User</button>
      </form> */}
      <div>
        <form onSubmit={handleFormSubmit}>
          <div className="container">
            <div className="position-relative">
              <label htmlFor="files">

              
              <input
                type="file"
                accept="image/*"
                id="files"
                style={{"visibility":"hidden","position":"absolute"}}
                onChange={handleImageChange}
              />

              {value.base64Image && (
                <img
                  className=""
                  src={value.base64Image}
                  alt="Selected"
                  id="files"
                  style={{ width: "150px", height: "200px" ,borderRadius: "50%" }}
                />
              )}
              </label>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={value.name}
                    onChange={(e) =>
                      setValue({ ...value, name: e.target.value })
                    }
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    id="exampleInputPassword1"
                    value={value.description}
                    onChange={(e) =>
                      setValue({ ...value, description: e.target.value })
                    }
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <label htmlFor="dob" className="form-label">
                  Date of birth
                </label>
                <input
                  type="date"
                  value={value.dob}
                  id="dob"
                  onChange={(e) => setValue({ ...value, dob: e.target.value })}
                  aria-describedby="emailHelp"
                  className="col-lg-12 form-control"
                />
              </div>
              <div className="col-lg-6 col-sm-12">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Gender
                </label>
                <select
                  className="form-select"
                  value={value.gender}
                  onChange={(e) =>
                    setValue({ ...value, gender: e.target.value })
                  }
                  id="gender"
                  aria-label="Default select example"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Skills
                </label>
                <MultiSelect
                  options={options}
                  value={value.selected}
                  onChange={(e) =>
                    setValue({ ...value, options: e.target.value })
                  }
                  labelledBy={"Select"}
                  isCreatable={true}
                />
              </div>
              <div className="col-lg-12 col-sm-12 py-2">
                <label htmlFor="address" className="form-label">
                  Address :
                </label>
                <div className="row">
                  <div className="col-lg-4">
                    <label htmlFor="houseno" className="form-label">
                      House No:
                    </label>
                    <input
                      type="text"
                      id="houseno"
                      className="form-control"
                      value={value.houseNo}
                      onChange={(e) =>
                        setValue({ ...value, houseNo: e.target.value })
                      }
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="col-lg-4">
                    <label htmlFor="nearby" className="form-label">
                      Nearby:
                    </label>
                    <input
                      type="text"
                      id="nearby"
                      value={value.nearBy}
                      onChange={(e) =>
                        setValue({ ...value, nearBy: e.target.value })
                      }
                      className="form-control"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="col-lg-4">
                    <label htmlFor="phoneno" className="form-label">
                      Phone Number:
                    </label>
                    <input
                      type="text"
                      id="phoneno"
                      value={value.phoneNo}
                      onChange={(e) =>
                        setValue({ ...value, phoneNo: e.target.value })
                      }
                      className="form-control"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecord;
