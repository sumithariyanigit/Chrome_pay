//import React from "react";
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
///Login


export default function OrgLogin() {

    useEffect(() => {
        const auth = localStorage.getItem('token')
        if (auth) {
          ///  history.push("/organization")
        }

    })

    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
  

    //let history = useHistory(toast);

    async function login() {
  
      let data = { email, password };
      let result = await fetch('/Login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
          "Accept" : "application/json",
        },
  
      });

      result = await result.json();
      if (result) {
        let data = result;
        console.log(data.msg)
        if (data.status) {

        localStorage.setItem('ID', result.ID);
        localStorage.setItem('token', result.token);
        window.location = "/organization"
         // history.push("/organization");
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      }
      else {
        toast.error(data.msg);
      }
            
    }






    return (

        <>
           <ToastContainer />
            <div className="content main-login">
                <div className="container">
                    <div className="row">

                        <div className="col-md-6 contents">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="mb-4 text-center">
                                        <img src="assets/images/logo.png" alt="logo" width="50px" className="mb-4" />
                                        <h3> Sign In </h3>
                                        <p className="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur
                                            adipisicing.</p>
                                    </div>
                                    <form >
                                        <div className="form-group first">
                                            <label for="username">Username</label>
                                            <input type="text" name='email'   className="form-control" id="username" 
                                            onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                        <div className="form-group last mb-4">
                                            <label for="password">Password</label>
                                            <input type="password"   name='password'  className="form-control" id="password"
                                            onChange={(e) => setPass(e.target.value)} />
                                        </div>
                                        <div className="d-flex mb-5 align-items-center">
                                            <label className="control control--checkbox mb-0"><span className="caption">Remember me</span>
                                                <input type="checkbox" checked />
                                                <div className="control__indicator"></div>
                                            </label>
                                            <span className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></span>
                                        </div>
                                        <input  type="button" onClick={login} value="Log In" className="btn btn-block btn-primary mt-5" />

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

}