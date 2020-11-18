import './App.css';
import ProjectList from './components/ProjectList';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className="App">
        <div className="list">
            <ProjectList></ProjectList>
        </div>
        <div className="control">
            <Button>Neues Projekt</Button>
        </div>
    </div>
  );
}

export default App;
