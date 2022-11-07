import React from 'react'
import user from '../images/user.png'

const ContactList = ({contacts}) => {
    const renderContact = contacts.map((contact, index) => {
        return (
            <div className="item" key={index}>
                <img src={user} alt="user" className="ui avatar image" />
                <div className="content" >
                    <div className="header">{contact.name}</div>
                    <div>{contact.email}</div>
                </div>
                <i 
                    className="trash alternate outline icon"
                    style={{color: 'red', marginTop:'7px'}}
                    ></i>
            </div>
        )
    })
  return (
    <div className='ui celled list'>
       {renderContact}
    </div>
  )
}

export default ContactList  