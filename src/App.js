import { useState } from 'react';
import './App.css';
import { AppRoutes } from './Component/AppRoutes';
import { Topbar } from './Layout/Topbar/Topbar';
import { routeConstantsService } from './Routes/Routes';

function App() {
  const [currentKey, setCurrentKey] = useState(
    routeConstantsService.Routes.viewProfile
  );
  return (
    <>
      <Topbar
        currentKey={currentKey}
        setCurrentKey={(value) => setCurrentKey(value)}>
        <AppRoutes />
      </Topbar>
    </>
  );
}

export default App;
