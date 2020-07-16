import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import moment from 'moment';
import { getAllNotes, deleteNote} from './api';
import './index.css';
import './App.css';
import Post from './Post';

const App = () => {
  const [notes, setNotes] = useState([]);
  //const [displayModal, setDisplayModal] = useState(false);
  //const [update, updateNote] = useState();

  useEffect(() => { readNotes() }, []);
  const readNotes = () => getAllNotes().then(data => setNotes(data));

  //TODO: event = e. 

  const handelDeleteNote = (id) => {
    deleteNote(id)
      .then(() => {
        readNotes();
      })
  }

  // const hanUpNote = (id) => {
  //   updateNote(id)
  //     .then(() => {
  //       readNotes();
  //     })
  // }
  //----------------------------------------------------------------------------------------
  //const onClick = (stateMethod) => { stateMethod(true);}
  //const onHide = (stateMethod) => { stateMethod(false); }
  //----------------------------------------------------------------------------------------
  // const renderFooter = (stateMethod) => {
  //   return (
  //     <div className="p-button-secondary">
  //       <Button label="Close" icon="pi pi-times" className="p-button-warning" onClick={() => onHide(stateMethod)} />
  //       <Button label="Update" icon="pi pi-times" visible={displayModal} className="p-button-warning" onClick={() => upNote(onHide(stateMethod))} />
  //     </div>
  //   );
  // }
//------------------------------------------------------------------------------------------
  return (
    <div className="App">
      <Post updateData={readNotes}
        // displayModal = {displayModal}
        // setDisplayModal = {setDisplayModal}
        //update ={hanUpNote}
      />
      {
        notes.map(({ text, title, rating, _id, date }) => (
          <Card id="card" className="child" key={_id}>
            <Rating className="first" value={rating} cancel={false} />
            <div className="text-1">{title}</div>
            <div className="text">{text}</div>
            <div className="text-2">{moment(date).format("MMMM Do YYYY")}</div>
            {/* onClick={() => onClick(setDisplayModal)} */}
            <Button icon='pi pi-refresh' id="button" label="Update" className="p-button-raised p-button-info"/>
            <Button icon='pi pi-times' id="button" label="Delete" className="p-button-raised p-button-danger" onClick={() => handelDeleteNote(_id)} />
          </Card>
        ))}
    </div>
  );
}
export default App;