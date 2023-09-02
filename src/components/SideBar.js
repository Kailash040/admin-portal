import React, { useState, useEffect } from "react";

const SideBar = (record) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Fetch data when the component mounts
    fetch("http://localhost:3001/employees") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log(data);
  return (
    <div>
      <div id="" style={{ overflowY: "scroll", height: "480px" }}>
        {data.map((value,id) => {
          return (
            <div key={id}>
              <p>{value.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
