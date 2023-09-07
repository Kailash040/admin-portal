import { useParams } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
const MainSection = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  useEffect(() => {
    // Fetch the item data based on the itemId parameter
    axios.get(`http://localhost:3001/employees/${id}`)
      .then(response => {
        setItem(response.data);
      })
      .catch(error => {
        console.error('Error fetching item:', error);
      });
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }
  return (
    <div>
       <p>Name: {item.name}</p>
    </div>
  )
}

export default MainSection
