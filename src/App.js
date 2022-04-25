import { Helmet } from 'react-helmet';

import "./App.css";
import AllRoutes from './Routes';
import LoginContextProvider from './contexts/LoginContext';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <LoginContextProvider>
        <div className="App">
          <Helmet>
            <style>{'body { background-color: #463932}'}</style>
          </Helmet>

          <AllRoutes />
        </div>
      </LoginContextProvider>
    </>


  );
}

export default App;
