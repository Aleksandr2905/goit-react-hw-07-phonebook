import { Form } from './Form/Form';
import { nanoid } from 'nanoid';
import { Contact } from './Contact/Contact';
import { Filter } from './Filter/Filter';
import style from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, changeFilter, deleteContact } from './redux/phonebookReducer';

export const App = () => {
  const contacts = useSelector((state) => state.phonebook.contacts);
  const filter = useSelector((state) => state.phonebook.filter);

  const dispatch = useDispatch();


  const handleAddContact = data => {
    const { name, number } = data;
    if (
      contacts.find(
        contact => contact.name === name && contact.number === number
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(addContact({
      id: nanoid(),
      name,
      number,
    })
    )
  };

  const handleFilterChange = event => {
    const inputFilter = event.target.value;
    dispatch(changeFilter(inputFilter))
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId))
  };

  const filterContacts = contacts.filter(contact => {
    return (
      contact.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
      contact.number.includes(filter)
    );
  });

  return (
    <div className={style.wrap}>
      <h1 className={style.title}>Phonebook</h1>
      <Form handleAddContact={handleAddContact} />
      <h2 className={style.titleContact}>Contacts</h2>
      <Filter onChange={handleFilterChange} value={filter} />
      <Contact
        contacts={filterContacts}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
