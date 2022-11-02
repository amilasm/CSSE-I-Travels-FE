import './App.scss';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Blank from './pages/Blank';
import Charts from './pages/Charts';
import Addshedule from './pages/Addshedule';
import ViewFares from './pages/ViewFares';
import ViewShedule from './pages/ViewShedule';
import Reports from './pages/Reports';
import Register from './pages/Register';
import Login from './pages/Login';
import Viewuser from './pages/Viewuser';
function App() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Register/>} />

                <Route path='/t' element={<AppLayout />}>
                    <Route index element={<Charts />} />
                    <Route path='/t/started' element={<Charts />} />
                    <Route path='/t/Shedule' element={<Addshedule />} />
                    <Route path='/t/viewshedule' element={<ViewShedule />} />
                    <Route path='/t/Fares' element={<ViewFares />} />
                    <Route path='/t/Report' element={<Reports/>} />
                    <Route path='/t/user' element={<Viewuser/>} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
