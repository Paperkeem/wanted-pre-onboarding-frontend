import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({ email: '', password: '' });
  const [isok, setIsok] = useState({ isemail: false, ispass: false });
  
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      navigate('/todo');
    }
  }, [navigate]);

  const handleEmail = (e) => {
    var regEmail = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    setIsok({...isok, isemail: regEmail.test(e.target.value)});
    setInfo({ ...info, email: e.target.value });
  }

  const handlePassword = (e) => {
    var regPass = /^(?=.*[0-9]).{8,25}$/;
    setIsok({...isok, ispass: regPass.test(e.target.value)});
    setInfo({ ...info, password: e.target.value });
  }

  const handleSingUp = (e) => {
    if (!isok.isemail) {
      alert('이메일 형식을 지켜주세요');
      return
    }

    if (!isok.ispass) {
      alert('비밀번호는 8자리 이상입니다');
      return
    }

    axios.post("https://pre-onboarding-selection-task.shop/auth/signup",
      {
        email: info.email,
        password: info.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        // console.log('response:', res)
        alert('회원가입 성공!');
        setInfo({ email: '', password: '' });
      });
  }

  const handleSingIn = () => {
    axios.post("https://pre-onboarding-selection-task.shop/auth/signin",
      {
        email: info.email,
        password: info.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        // console.log('response:', res)

        var token = res.data.access_token;
        localStorage.setItem('token', JSON.stringify(token));
        navigate('/todo');
      });
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your TodoList
            </h2>

          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  onChange={handleEmail}
                  id="email-address"
                  name="email"
                  type="email"
                  value={info.email}
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={handlePassword}
                  id="password"
                  name="password"
                  type="password"
                  value={info.password}
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>


            <div>
              <button
                onClick={handleSingUp}
                type="button"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                </span>
                Sign up
              </button>
              <br />
              <button
                onClick={handleSingIn}
                type="button"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                </span>
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

