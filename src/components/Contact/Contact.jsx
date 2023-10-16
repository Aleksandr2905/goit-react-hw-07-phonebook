import { nanoid } from 'nanoid';
import style from './Contact.module.css';

export const Contact = ({ contacts, handleDeleteContact }) => (
  <>
    <ul className={style.contactTitle}>
      {contacts.map(({ id, name, phone }) => (
        <li className={style.contactItem} key={nanoid()}>
          {name} : {phone}
          <button
            className={style.btnDelete}
            type="button"
            onClick={() => handleDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </>
);
