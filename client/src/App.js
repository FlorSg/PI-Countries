import './App.css';
import {Route, BrowserRouter} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import SearchBar from './components/SearchBar/SearchBar';
import CreateActivity from './components/CreateActivity/CreateActivity'
import Details from './components/Details/Details';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route path='/home/:id' component={Details}/>
      <Route path='/home' component={SearchBar}/>
      <Route path='/home' component={Home}/>
      <Route exact path='/activities' component={CreateActivity}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
