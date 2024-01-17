import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthDispatch } from './context/AuthContext';
import { DarkModeProvider } from './context/DarkModeContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserProfile from './components/Auth/UserProfile';
import TaskList from './components/Tasks/TaskList';
import TaskForm from './components/Tasks/TaskForm';
import Cookies from 'js-cookie';

const App = () => {
    const dispatch = useAuthDispatch();
    const initialToken = Cookies.get('token');

    useEffect(() => {
        // Vérifiez si un token existe au démarrage de l'application
        dispatch({ type: 'CHECK_TOKEN', payload: { token: initialToken } });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

  return (
      <DarkModeProvider>
          <Router>
              <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/user-profile" element={<UserProfile/>} />
                <Route path="/tasks" exact element={<TaskList/>} />
                <Route path="/tasks/create" element={<TaskForm/>} />
              </Routes>
          </Router>
      </DarkModeProvider>
  );
};

export default App;
