import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import { useEffect } from 'react';
import ContactDetails from './components/ContactDetails';


function App() {
   const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([])

  const addContactHandler = (contact) => {
    console.log(contact)
    setContacts([...contacts, { id: uuidv4(), ...contact }]);
  }

  const removeContactHandler = (id) => { 
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })

    setContacts(newContactList)
  }

   useEffect(() => {
     const retriveContacts = JSON.parse(localStorage.getItem('contacts'));
     if (retriveContacts) {
      setContacts(retriveContacts)
     };
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  },[contacts])

  return (
    <div className="ui container">
    <Header />
      <Router>     
          <Routes>
            <Route 
              exact 
              path='/' 
              element={<ContactList contacts={contacts} 
              getContactId={removeContactHandler} />} 
            />
            <Route 
              path='/add' 
              element={<AddContact 
              addContactHandler={addContactHandler}/>} 
            />
            <Route 
              exact 
              path='/contact/:id' 
              element={<ContactDetails contacts={contacts} />} 
            />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
