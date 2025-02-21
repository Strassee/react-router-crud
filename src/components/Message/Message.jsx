import './Message.css';
import avatar from'./avatar.png';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { compile } from 'path-to-regexp';
 


function Message( {url, message, view} ) {
  const [editMessage, setEditMessage] = useState(false);
  const[value, setValue]=useState({message: message.content});
  const navigate = useNavigate();

  const toPath = compile('/posts/:id');

  const handleDelete = ((e) => {
    fetch(url + toPath({ id: String(message.id) }), {method: "DELETE"})
      .then((response) => {
        if (response.status === 204) {
          navigate("/");
          return true;
        }
        return false;
      })
      .catch((response) => console.log(response));
  })

  const handleClose = ((e) => {
    setValue({message: message.content});
    setEditMessage(false);
  })

  const handleSubmit = ((e) => {
    e.preventDefault();
    if(value.message.length > 0) {
      const payload = {
        "id": message.id,
        "content": value.message.trim()
      }
      const opt = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(payload)
      }
      fetch(url + toPath({ id: String(message.id) }), opt)
        .then((response) => {
          if (response.status === 204) {
            setEditMessage(false);
            return true;
          }
          return false;
        })
        .catch((response) => console.log(response));
    }
  })

  const handleInput = ((e) => {
    const {name, value} = e.target;
    if(value.length < 256) {
      setValue((prevForm) => ({...prevForm, [name]: value}));
    }
  })

  return (
    <div className='message'>
      <div className="message-header">
        <div className="message-id" >Пост #{message.id}</div>
        <div className="message-created">{moment(message.created).format('DD.MM.YYYY HH:mm')}
          {view && <span className="message-header-close" onClick={(e) => navigate("/")}>&#128473;</span>}
        </div>
      </div>
      <div className="message-author">
        <div className="message-author-img" ><img src={avatar} key={message['id']} /></div>
        <div className="message-author-name">Evgeniy Filkin</div>
      </div>
      {!editMessage && <>
        <div className="content">{value.message}</div></>
      }

      {editMessage && <>
        <div className="edit-post-header">
          <span className="edit-post-title">Редактировать публикацию</span>
          <span className="closer" onClick={(e) => handleClose(e)}>&#128473;</span>
        </div>
        <form className='form'>
          <textarea className='inputText' id="message" name="message" value={value.message} onInput={handleInput} placeholder='Не более 255 символов...' />
          <input className='submit' type="submit" value="Сохранить" onClick={(e) => handleSubmit(e)} />
        </form></>
      }
      {view && !editMessage &&
        <div className="buttons-manage">
            <input type="button" className="edit-post-btn" value="Изменить" onClick={(e) => setEditMessage(true)} />
            <input type="button" className="delete-post-btn" value="Удалить" onClick={(e) => handleDelete(e)} />
        </div>
      }
    </div>

  )
}

export default Message;