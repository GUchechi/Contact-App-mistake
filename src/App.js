import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import { useEffect } from 'react';
import ContactDetails from './components/ContactDetails';
import api from "../src/api/Contacts";


function App() {
   const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([])

  // Retrieve contacts
  const retriveContacts = async () => {
    const response = await api.get("/Contacts")
    return response.data;
  }

    // Add contacts
  const addContactHandler = async (contact) => {
      const request = {
        id: uuidv4(),
        ...contact,
      }

      const response = await api.post("/Contacts", request);
    setContacts([...contacts, response.data]);
  }

  const removeContactHandler = async (id) => { 
    await api.delete(`/Contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })

    setContacts(newContactList)
  }

    // Get Element
   useEffect(() => {
    //  const retriveContacts = JSON.parse(localStorage.getItem('contacts'));
    //  if (retriveContacts) {
    //   setContacts(retriveContacts)
    //  };

    const  getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) setContacts(allContacts);
    }
      getAllContacts()
  }, []);


  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
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
