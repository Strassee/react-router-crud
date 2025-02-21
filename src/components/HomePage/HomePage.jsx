import './HomePage.css';
import { useNavigate } from "react-router";
import ListMessages from "../ListMessages/ListMessages";
import useJsonFetch from "../useJsonFetch";



function HomePage( {url} ) {

  const {data, loading, error} = useJsonFetch(url + '/posts', {method : 'GET'});
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <div className="homepage-create">
        <input type="button" className="create-post-btn" value="Создать пост" onClick={() => navigate("/posts/new")} />
      </div>
      {data && data.length > 0 && <ListMessages messages={data} />}
    </div>
  )
}

export default HomePage;