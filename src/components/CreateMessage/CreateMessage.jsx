import './CreateMessage.css';
import { useNavigate } from "react-router";
import { useEffect, useState } from 'react';

function CreateMessage( {url} ) {
  const[settings, setSettings]=useState(JSON.parse(localStorage.getItem('settings')));
  const[value, setValue]=useState({message: settings && settings.hasOwnProperty('inputText') ? settings.inputText : ''});
  const navigate = useNavigate();

  useEffect(() => {
    if(settings) localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const clearInputText = () => {
    if (settings && settings.hasOwnProperty('inputText')) {
      setSettings(Object.fromEntries(Object.entries(settings).reduce((result, item) => item[0] !== 'inputText' ? result.push(item) : '', [])))
    }
  };

  const handleClose = (e, value) => {
    if(value) setSettings((prevSettings) => ({...prevSettings, inputText: value}));
    else {
      clearInputText();
    };
    navigate("/");
  };

  const handleInput = e => {
    const {name, value} = e.target;
    if(value.length < 256) {
      setValue((prevForm) => ({...prevForm, [name]: value}));
    }
  };

  const handleSubmit = ((e, value) => {
    e.preventDefault();
    if(value.length > 0) {
      const payload = {
        "id": 0,
        "content": value.trim()
      }
      const opt = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(payload)
      }
      fetch(url + '/posts', opt)
        .then((response) => {
          if (response.status === 204) {
            clearInputText();
            navigate("/");
            return true;
          }
          return false;
        })
        .catch((response) => console.log(response));
    }
  });
  
  return (
    <div className="create-post">
      <div className="create-post-header" onClick={(e) => handleClose(e, value.message)}><span className="closer" >&#128473;</span></div>
      <form className='form'>
        <textarea className='inputText' id="message" name="message" value={value.message} onInput={handleInput} placeholder='Не более 255 символов...' />
        <input className='submit' type="submit" value="Опубликовать" onClick={(e) => handleSubmit(e, value.message)} />
      </form>
    </div>
  )
}

export default CreateMessage;