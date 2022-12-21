import React, { useState } from 'react';
import axios from 'axios';

export default function Todocard({item}) {
  const { id, todo, isCompleted } = item;
  const [update, setUpdate] = useState(false);
  const [newtodo, setNewtodo] = useState({ todo, isCompleted });
  

  const handelChangeCheck = (e) => {
    setNewtodo({ ...newtodo, isCompleted: e.target.checked });
   // console.log(newtodo);
    updateData(todo, newtodo.isCompleted);
  }

  const updateData = async (newTodo, changeCompleted) => {
    var token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.put(`https://pre-onboarding-selection-task.shop/todos/${id}`,
      {
        todo: (newTodo || todo),
        isCompleted: (changeCompleted || isCompleted),
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
  }

  const handleDlete = async () => {
    var token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.delete(`https://pre-onboarding-selection-task.shop/todos/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log('response:', res)
      });
  }

  const handleUpdate = () => {
    setUpdate((prev) => !prev);
    updateData(newtodo.todo);
  }

  const handelUpdatetext = (e) => {
    setNewtodo({...newtodo, todo : e.target.value});
  }

  return (
    <div className='p-1 m-1 bg-slate-300 bg-opacity-30 flex justify-between'>
      <div className='align-middle'>
        <input
          type="checkbox"
          className='flex-1'
          onChange={handelChangeCheck}
          defaultChecked={isCompleted} />
        {!update && <span>&nbsp;&nbsp;{todo}</span>}
        {update && (
          <div className='flex w-full h-10'>
            <input
              type="text"
              onChange={handelUpdatetext}
              defaultValue={todo}
              className='w-full' />
          </div>
        )}
      </div>

      <div>
        <button
          onClick={handleUpdate}
          className='p-1 m-1 bg-orange-400 rounded-md text-slate-200'
        >수정</button>
        <button
          onClick={handleDlete}
          className='p-1 bg-blue-400 rounded-md text-slate-200'
          >삭제</button>
      </div>
    </div>
  );
}

