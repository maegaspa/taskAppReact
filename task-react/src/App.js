import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthDispatch } from './context/AuthContext';
import { DarkModeProvider } from './context/DarkModeContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserProfile from './components/Auth/UserProfile';
import CategoryForm from './components/Tasks/CategoryForm';
import TaskPage from './components/Tasks/TaskPage';
import TaskForm from './components/Tasks/TaskForm';
import Cookies from 'js-cookie';

const App = () => {
    const dispatch = useAuthDispatch();
    const initialToken = Cookies.get('token');

    useEffect(() => {
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
                <Route path="/tasks" exact element={<TaskPage/>} />
                <Route path="/tasks/create" element={<TaskForm/>} />
                <Route path="/category/create" element={<CategoryForm/>} />
              </Routes>
          </Router>
      </DarkModeProvider>
  );
};

export default App;
