

import { Route, Routes } from 'react-router-dom';
import Profile from '../Pages/Profile';
import { UpdateProfile } from '../Pages/UpdateProfile';

export const AppRoutes = () => {
      /**
 * Here we are definig Routes for our application
 */
    return (
        <Routes>
            <Route path='/update-profile' element={<UpdateProfile />}  />
            <Route path='/' element={<Profile />}/>
        </Routes>
    );
}


