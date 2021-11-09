import React from 'react';
//Import Components
import Contact from './Contact'
import axios from 'axios';
import {Button} from 'react-bootstrap'

export default class FetchContacts extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

        this.reloadData = this.reloadData.bind(this);
    }
      

    async componentDidMount(){
        const url = "http://localhost:8080/api/contacts/";
        
        axios.get(url)
            .then(response => {
                console.log(response.data);
                this.props.setContacts(response.data.data);
                this.setState({loading: false});
            })
            .catch(err => {
                console.log(err);
            })
    }

    async reloadData() {
        const url = "http://localhost:8080/api/contacts/";
        
        axios.get(url)
            .then(response => {
                console.log(response.data);
                this.setState({loading: false});
                this.props.setContacts(response.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        if(this.state.loading) {
            return <div>loading...</div>;
        }

        if(!this.props.contacts) {
            return <div>Contact list is empty</div>;
        }

        return (
            <div className="todo-container">
                <ul className="todo-list">
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" onClick={this.reloadData}>
                            Refresh
                        </Button> 
                    </div>
                    &nbsp;
                    {this.props.contacts.map(contact=> (
                        <Contact 
                            key={contact._id} 
                            name={contact.name} 
                            phone={contact.phone}
                            email={contact.email}
                            gender={contact.gender}
                            id={contact._id}
                            setContacts={this.props.setContacts}
                            setModalIsOpen={this.props.setModalIsOpen}
                            setInputTextName={this.props.setInputTextName}
                            setInputTextEmail={this.props.setInputTextEmail}
                            setInputTextPhone={this.props.setInputTextPhone}
                            setInputTextGender={this.props.setInputTextGender}
                            setContactId={this.props.setContactId}
                        />
                    ))}
                </ul>
            </div> 
        )  
    }
}

/*
const ContactList = ({contacts, setContacts}) => {
    console.log(contacts);
    return(
        <div className="todo-container">
            <ul className="todo-list">
                {contacts.map(contact => (
                    <Contact 
                        setContacts={setContacts} 
                        contacts={contacts} 
                        key={contact.name} 
                        contact={contact}
                        name={contact.name} 
                    />
                ))}
            </ul>
        </div>
    );
}

export default ContactList;
*/