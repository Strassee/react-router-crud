import './App.css';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router';

import HomePage from './components/HomePage/HomePage';
import CreateMessage from "./components/CreateMessage/CreateMessage";
import ViewMessage from "./components/ViewMessage/ViewMessage";

function App() {
  const url = ' http://localhost:7070';

  return (
    <div className="App">
      <BrowserRouter>
        <div>
            <div className="page">
            <Routes>
              <Route path="/" exact element={<HomePage url={url} />} />
              <Route path="/posts/new" exact element={<CreateMessage url={url} />} />
              <Route path="/posts/:id" exact element={<ViewMessage url={url} />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
