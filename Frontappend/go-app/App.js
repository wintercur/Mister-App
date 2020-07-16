import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../button';
import './App.css';

const App = () =>{
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/notes/all')
    .then((response) => {
      console.log(response);
      return setNotes(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [ ]); 
  console.log(notes,"notes");
  return (
    <div className="App">
    {JSON.stringify(notes)}
    <Button label="Click" icon="pi pi-check" />
    </div>
  );
}

export default App;
