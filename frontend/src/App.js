import {React,useState} from 'react';
import './App.css';
import ContentList from './Components/ContentList/ContentList';
import TableContent from './Components/TableContent/TableContent';
import UserSearch from './Components/UserSearch/UserSearch';

function App() {
  const [show,setShow] = useState(true);
  return (
    <div className="App">
      <header className="App-header">
        KO Metarank Demo
        {/* <button className='app_switcher' onClick={()=>setShow(!show)}>
          {show?'TableView':'CardsView'}
        </button>
        {show ? <ContentList /> : <TableContent />} */}
        <UserSearch />
      </header>
    </div>
  );
}

export default App;
