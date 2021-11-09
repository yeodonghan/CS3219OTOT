import React, {useState} from "react";
import './App.css';
//Import Components
import ContactForm from "./components/ContactForm.js";
import FetchContacts from "./components/ContactList";
import EditForm from "./components/EditForm"
import {Modal} from 'react-bootstrap'

function App() {
  const [inputTextName, setInputTextName] = useState("");
  const [inputTextEmail, setInputTextEmail] = useState("");
  const [inputTextPhone, setInputTextPhone] = useState("");
  const [inputTextGender, setInputTextGender] = useState("");
  const [contactId, setContactId] = useState("");
  const [contacts, setContacts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="App">
      <header>
        <h1>My Contact List</h1>
      </header>
      <Modal show={modalIsOpen}>
        <EditForm 
        inputTextName={inputTextName} 
        setInputTextName={setInputTextName}
        inputTextEmail={inputTextEmail} 
        setInputTextEmail={setInputTextEmail}
        inputTextPhone={inputTextPhone} 
        setInputTextPhone={setInputTextPhone}
        inputTextGender={inputTextGender} 
        setInputTextGender={setInputTextGender}
        contacts={contacts} 
        setContacts={setContacts} 
        setModalIsOpen={setModalIsOpen}
        contactId={contactId} />
      </Modal>
      <ContactForm 
        inputTextName={inputTextName} 
        setInputTextName={setInputTextName}
        inputTextEmail={inputTextEmail} 
        setInputTextEmail={setInputTextEmail}
        inputTextPhone={inputTextPhone} 
        setInputTextPhone={setInputTextPhone}
        inputTextGender={inputTextGender} 
        setInputTextGender={setInputTextGender}
        contacts={contacts} 
        setContacts={setContacts}
        
        />
      <FetchContacts 
        setInputTextName={setInputTextName}
        setInputTextEmail={setInputTextEmail}
        setInputTextPhone={setInputTextPhone}
        setInputTextGender={setInputTextGender}
        contacts={contacts} 
        setModalIsOpen={setModalIsOpen}
        setContacts={setContacts} 
        setContactId={setContactId}/>
    </div>
  );
}

export default App;
