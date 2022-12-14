import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Todocard from '../components/Todocard';
import { useNavigate } from 'react-router-dom';

export default function Todo() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    var token = JSON.parse(localStorage.getItem("token"));
    axios.get("https://pre-onboarding-selection-task.shop/todos",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log('response:', res);
        setTodoList(res.data);
      });
  }, [todoList]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace('http://localhost:3000/')
  }
  
  const handleChangeInput = (e) => {
    setTodo(e.target.value);
  }

  const handleAddtodo = () => {
    var token = JSON.parse(localStorage.getItem("token"));
    axios.post("https://pre-onboarding-selection-task.shop/todos",
      {
        todo: todo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        // console.log('response:', res)
      });
    setTodo('');
  }

  return (
    <div>
      <div className='background darkColor' >
        <div className='viewer darkview"'> 
          <div className='topbar'>
            <li>Todo List</li>
            <button
              className='rounded-xl bg-orange-300 p-4 hover:bg-orange-400 text-lg'
              onClick={handleLogout}
            >logout</button>
          </div>

          

          <div className='bottombar'>
            <input
              type="text"
              className='write'
              value={todo}
              onChange={ handleChangeInput }
              placeholder='Add Todo'/>
            <button
              className='add'
              onClick={ handleAddtodo }
            >
                Add</button>
          </div>
          
          <div className='wraper'>
            <section className='todoList'>
              {
                todoList.map((item) => (
                  <Todocard
                    key={item.id}
                    item={item}
                  />
                ))
              }
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}