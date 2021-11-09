import React from "react";
import {Card, Button} from "react-bootstrap";
import axios from "axios";

const Contact = ({name, email, phone, id, gender, setContacts, setModalIsOpen, 
    setInputTextName, setInputTextEmail, setInputTextPhone, 
    setContactId, setInputTextGender}) => {

    const deleteHandler = () => {
        let url = `http://localhost:8080/api/contacts/`;
        axios.delete(url + `${id}`)
            .then(res => {
                console.log(res)
                axios.get(url)
                    .then(res => {
                    const users = res.data;
                    setContacts(users.data);
                    console.log(users.data);
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    const editContactHandler = () =>{
        setInputTextName(name);
        setInputTextEmail(email);
        setInputTextPhone(phone);
        setInputTextGender(gender);
        setContactId(id);
        setModalIsOpen(true);
    }

    return(
      <Card>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{gender} {phone}</Card.Subtitle>
          <Card.Text>
            {email}
          </Card.Text>
          <Button variant="warning" size="sm" onClick={editContactHandler}>Edit</Button>
          <Button variant="danger" size="sm" onClick={deleteHandler}>Delete</Button>
        </Card.Body>
      </Card>
    );
}

export default Contact;