import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { Dialog } from 'primereact/dialog';
import { Rating } from 'primereact/rating';
import { Calendar } from 'primereact/calendar';
import { addNote } from './api';

import './App.css';
import './index.css';
//, displayModal, setDisplayModal, update
const Post = ({ updateData}) => {

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState();
  const [rating, setRating] = useState(0);
  const [displayModal, setDisplayModal] = useState(false);
  //const [id, setID] = useState("");

  const createNote = () => {
    addNote({ text, title, rating, date })
      .then(() => { updateData(); setTitle(); setText(); setRating(); setDate(); })
  }
//--------------------------------------------------------------------------------------
// const upNote = () => {
//   updateNote({ text, title, rating, date, id })
//     .then(() => { updateData(); setTitle(); setText(); setRating(); setDate(); })
// }
//--------------------------------------------------------------------------------------
  // const update = () => {
  //   updateNote({ text, title, rating, date })
  //     .then(() => { updateData() })
  // }

  // const handelUpdateNote = (id) => {
  //   updateNote(id)
  //     .then(() => {
  //     })
  // }
  
  // useEffect(() => {
  //   setVisibility(visible);
  // }, [visible]);

  // if (!isVisible) return null;


  const onClick = (stateMethod) => { stateMethod(true); }
  const onHide = (stateMethod) => { stateMethod(false); setTitle(); setText(); setRating(); setDate() }

  const renderFooter = (stateMethod) => {
    return (
      <div className="p-button-secondary">
        <Button label="Create" icon="pi pi-check" className="p-button-warning" onClick={() => createNote(onHide(stateMethod))} disabled={!text || !title || !date} />
        <Button label="Close" icon="pi pi-times" className="p-button-warning" onClick={() => onHide(stateMethod)} />
        {/* <Button label="Update" icon="pi pi-times" className="p-button-warning" value={id} onClick={() => upNote(onHide(stateMethod))} onChange={() => hanUpNote(id)} /> */}
      </div>
    );
  }

  return (
    <div className="App" >
      <div className="text-11" >Welcome to the Light Up Notes</div>
      <Fieldset className="description" legend="Tap to here if you want to hide this massage" toggleable={true}>
        Sticky Notes! is the ultimate application to quickly create sticky notes and reminders.</Fieldset>
      <Button label="Add new one" className="p-button-warning" icon="pi pi-plus" onClick={() => onClick(setDisplayModal)} />
      <Dialog className="modal" header="Create you're new note" visible={displayModal} onHide={() => onHide(setDisplayModal)} modal={true} footer={renderFooter(setDisplayModal)}>
        <div className="input">
          <InputText placeholder="I need to do..." tooltip="Enter your title here" value={title} onChange={e => setTitle(e.target.value)} />
          <InputText placeholder="Go to store and etc." tooltip="Enter your text here" value={text} onChange={e => setText(e.target.value)} /></div>
        <div className="cal-n-rat">
          <Calendar className="calendar" value={date} onChange={(e) => setDate(e.value)} appendTo={document.body} showButtonBar={true} showWeek={true} />
          <div className="rate">
            importance: {rating}
            <Rating className="rate" value={rating} cancel={false} onChange={(e) => setRating(e.value)} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
export default Post;

