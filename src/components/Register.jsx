import { Link } from 'react-router-dom';
import { React, useState } from 'react';
import axios from 'axios'

export default function Register(){
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/api/users/register', {email, password})
      .then(result => {
        console.log("Imprimiendo resultado:")
        console.log(result)})
      .catch(error => console.log(error))
  }


    return(
        <div className="w-1/3 h-auto bg-gradient-to-r from-gray-50 to-purple-50  border-[0.5px] rounded-md shadow-lg p-4 mx-auto">
          <h1 className="font-bold text-xl lg:text-2xl text-center mt-2">Hi, please create an account</h1>
          <form onSubmit={handleSubmit} className="flex flex-col max-w-sm mx-auto">
            <div className="mt-5">
              <label htmlFor="email" className="block mb-2 text-md font-semibold text-gray-900">
                Email
              </label>
              <div className="relative w-auto">
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="fill-gray-400 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </span>
                <input type="email" id="email" className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-200 focus:border-purple-300 w-full p-2.5" 
                       placeholder="example@gmail.com" 
                       onChange={(e) => setEmail(e.target.value)}
                       required /> 
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="password" className="block mb-2 text-md font-semibold text-gray-900">Password</label>
              <div className="relative w-auto">
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="fill-gray-400 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm3 8V7a3 3 0 00-6 0v3h6zM9 14a1 1 0 012 0v2a1 1 0 11-2 0v-2z" clipRule="evenodd" />
                  </svg>
                  </span>
                <input type="password" className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-200 focus:border-purple-300 w-full p-2.5" 
                       placeholder="*********" 
                       onChange={(e) => setPassword(e.target.value)}
                       required/>
              </div>
            </div>

            <div className="self-center">
              <button type="submit" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 
                            hover:bg-gradient-to-br 
                            focus:ring-2 
                            focus:outline-none 
                            focus:ring-purple-700 
                            shadow-lg 
                            shadow-purple-500/50 
                            font-medium 
                            rounded-lg 
                            text-sm
                            w-max 
                            lg:w-64
                            px-5 
                            py-2.5
                            mt-5 
                            text-center
                            transform 
                            active:scale-x-75 
                            active:scale-y-50
                            transition-transform 
                            mx-5">Register
                      

                </button>
            </div>
            <div className="mt-10 mb-5 text-center">
              <p className="text-md">Have an account?</p>
              <Link to={'/'} className='italic text-sm text-blue-400 underline'>Click here to log in</Link>
            </div>
          </form>
      </div>
    )
}