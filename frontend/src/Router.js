import React from 'react';
import App from './App';
import Authentication from './components/Authentication';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

// Using Token Authentication
// export const TokenContext = createContext(null);

function Router() {
    // Using Token Authentication
    // const [token, setToken] = useState('');

    return (
        <React.StrictMode>
            {/* Using Token Authentication */}
            {/* <TokenContext.Provider value={{token, setToken}}> */}
            {/* Using Cookie Authentication */}
            <CookiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route exact path='/' element={<Authentication/>} />
                        <Route exact path='/movies' element={<App/>} />
                    </Routes>
                </BrowserRouter>
            </CookiesProvider>
            {/* </TokenContext.Provider> */}
        </React.StrictMode>
    );
}


export default Router;