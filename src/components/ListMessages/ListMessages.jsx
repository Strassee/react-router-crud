import './ListMessages.css';
import Message from "../Message/Message";
import {Link} from 'react-router';

function ListMessages( {messages} ) {
  let result = Array.from(messages).reverse().map((message) => (
    <Link to={`/posts/${message.id}`} className="no-underline" key={message['id']}>
      <Message message={message} view={false}/>
    </Link>
  ));
  return (
    <div className="list-messages">
      {result}
    </div>
  )
}

export default ListMessages;