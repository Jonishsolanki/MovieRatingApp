import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import * as serviceWorker from 'serviceworker';
import {Route,BrowserRouter,Routes} from 'react-router-dom';
import Auth from './components/Auth';
import {CookiesProvider} from 'react-cookie'

// const TokenContext = createContext(null);
// const TOKEN = "aca4635f4bc1decff97ff6e9998d6b5f3a5def00"

function Router(){

  const routing =(
    <BrowserRouter>
      <CookiesProvider>
        <Routes>
          <Route path='/' Component={Auth}></Route>
          <Route path='/app' Component={App}></Route>
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
    
  );
  return routing;
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Router />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();