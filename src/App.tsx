import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom"
import "@fontsource/poppins";
import "@fontsource/playfair-display";
import React from 'react';
import MyStatusBar from './Components/MyStatusBar';
import ToastContext, { ToastContextProps } from './Contexts/ToastContext';
import HomePage from './Pages/HomePage';
import ElementaryRoute from './routes/ElementaryRoute';
import LoadingContext from './Contexts/LoadingContext';
import LoadingScreen from './Components/LoadingScreen';
import CountdownPage from './Pages/CountdownPage';
import GameRoute from './routes/GameRoute';

function App(){

  const [successOpen, setSuccessOpen] = React.useState<boolean>(false);
  const [successMessage, setSuccessMessage] = React.useState<string>('');
  const [errorOpen, setErrorOpen] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSuccessclose = ()=>{
      setSuccessOpen(false);
  }
  const handleErrorclose = ()=>{
      setErrorOpen(false);
  }

  // Context values
  const toastValue: ToastContextProps = {
    openSuccess: (message)=>{
        setSuccessMessage(message);
        setSuccessOpen(true);
    },

    openError: (message)=>{
        setErrorMessage(message);
        setErrorOpen(true);
    },
  }

  return (
    <>
    { loading && <LoadingScreen/>}
    <LoadingContext.Provider value={{loading, setLoading }}>
      <ToastContext.Provider value={toastValue}>
      <Router>
        <MyStatusBar
          successOpen={successOpen} successMessage={successMessage} 
          onSuccessClose={handleSuccessclose}
          errOpen={errorOpen} errMessage={errorMessage} 
          onErrClose={handleErrorclose}
        />
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/elementary" component={ElementaryRoute}/>
          <Route path="/ready" component={CountdownPage}/>
          <Route path="/game" component={GameRoute}/>
          {/* <Route path="/setup" exact component={AdminSetUpScreen}/>
          <Route path="/login" component={LoginScreen}/>
          <Route path="/home" component={HomeScreen}/>
          <Route path="/settings" component={Settings}/>
          <Route path="/elementary" component={ElementaryRoute}/>
          <Route path="/secondary" component={MiddleRoute}/>
          <Route path="/high" component={HighRoute}/>
          <Route path="/game" component={GameRoute}/>
          <Route path="/leaderboard" component={LeaderboardScreen}/>
          <Route path="/roundleaderboard" component={RoundLeaderboardScreen}/> */}
        </Switch>
      </Router>
      </ToastContext.Provider>
    </LoadingContext.Provider>
    </>
  );
}

export default App;
