import React from 'react'
import user from '../images/user.png'
import { Link } from 'react-router-dom'

const ContactList = ({contacts, getContactId}) => {
    const deleteContacts = () => {
        getContactId()
    }

    // const contacts = [
    //     {
    //         id: '1',
    //         name: 'Godswill',
    //         email: 'godswill@gmail.com',
    //     },
    //     {
    //         id: '2',
    //         name: 'Godswill',
    //         email: 'godswill@gmail.com',
    //     }
    // ]

    const renderContact = contacts.map((contact,id) => {
        return (
            <div className="item" key={contact.id}>
                <img src={user} alt="user" className="ui avatar image" />
                <div className="content" >
                   <Link to={`/contact/${contact.id}`}>
                      <div className="header">{contact.name}</div>
                      <div>{contact.email}</div>
                   </Link>
                </div>
                <i 
                    className="trash alternate outline icon"
                    style={{color: 'red', marginTop:'7px'}}
                    onClick={() => deleteContacts(id)}
                    ></i>
            </div>
        )
    })
  return (
   <div className="main">
    <h2 style={{marginTop:'80px'}}>Contact List
        <Link to='/add' >
            <button className='ui button blue right' style={{marginLeft:'62rem'}}>Add Contact</button>
        </Link>
    </h2>
    <div className='ui celled list'>
       {renderContact}
    </div>
   </div>
  )
}

export default ContactList  