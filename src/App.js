import "./App.css";
import AllRoutes from './Routes';
import LoginContextProvider from './contexts/LoginContext';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <LoginContextProvider>
      <div className="App">
        <AllRoutes />
      </div>
    </LoginContextProvider>
  );
}

export default App;
