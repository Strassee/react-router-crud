import './ViewMessage.css';
import Message from "../Message/Message";
import { useParams } from 'react-router';
import useJsonFetch from "../useJsonFetch";

function ViewMessage( {url} ) {
  let {id} = useParams();
  const {data} = useJsonFetch(`${url}/posts/${id}`, {method: 'GET'} );
  return (
    <>
      {data && <Message url={url} message={data.post} view={true}/>}
    </>
  )
}

export default ViewMessage;