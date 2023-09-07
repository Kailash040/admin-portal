import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import axios from 'axios';
const SideBar = ( ) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const onItemClick = (item) => {
    setSelectedItem(item);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    // Fetch data when the component mounts
   
      axios.get('http://localhost:3001/employees')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  console.log(data);
  return (
    <div>
      
      <div id="" style={{ overflowY: "scroll", height: "480px" }}>
        {data.map((value,id) => {
          return (
               <a key={id}
                // href={value.id}
                 onClick={() => onItemClick(value)}
                 class="list" >
            <div className="d-flex align-items-center py-1">
            {/* Home */}
              <img src={value.base64Image} alt="img" style={{width:"40px",borderRadius:"50%","height":"40px"}}/>
              <span className="text-truncate">{value.name} {value.description} {value.gender} </span> 
            
            </div>
          </a>
          );
        })}
      </div>
        {selectedItem && (
        <div>
          <h2>{selectedItem.name} Details:</h2>
          <p>Description: {selectedItem.description}</p>
          <p>Price: ${selectedItem.price}</p>
          {/* Add more item details as needed */}
        </div>
      )}
    </div>
  );
};

export default SideBar;
