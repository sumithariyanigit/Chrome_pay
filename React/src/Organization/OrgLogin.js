//import React from "react";
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
///Login
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
var jwt = require("jsonwebtoken");

export default function OrgLogin() {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
  

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


 //-------model---------------///
 function handleShow() {
    setShow(true);
    
  }
     
       
      const AddFormData = async (e) =>{
            e.preventDefault();
            let token = localStorage.getItem('token')
        var decode1 = jwt.decode(token);
        let agentID = decode1.agentID
  
            const data = new FormData(e.target);
            const Formvlaues = Object.fromEntries(data.entries());
            const formData = Formvlaues;
            console.log(Formvlaues);
  
            axios.post(`/orgforgotpassword`,formData)
            .then(resp =>{
              const data = resp.data;
              console.log(data);
              if(data.status){
                toast.success(data.msg);
             setShow1(true);
              }else{
                toast.error(data.msg);
              }
  
            })
      }
  
      ///-------------------------------------////
  
      const AddFormData1 = async (e) =>{
        e.preventDefault();
        let token = localStorage.getItem('token')
    var decode1 = jwt.decode(token);
    let agentID = decode1.agentID
  
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        const formData = Formvlaues;
        console.log(Formvlaues);
  
        axios.post(`/orgchangePasswordotp`,formData)
        .then(resp =>{
          const data = resp.data;
          console.log(data);
          if(data.status){
            toast.success(data.msg);
         
          }else{
            toast.error(data.msg);
          }
  
        })
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
                                            <span className="ml-auto"><h6><a href='#' onClick={() => handleShow()}>Furget Password ?</a></h6></span>
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
            {/* <!-- Modal --> */}
    <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) =>AddFormData(e)}>
        <Modal.Body>
             <div className="col-lg-12 ">
                      <label className="mb-2">Email</label>
                      <input className="form-control" placeholder="Enter your email"  type="email" name="email" value={email}
                      onChange={ (e)=>setEmail(e.target.value) }/>
                    </div>
       
         
          
         
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={() => setShow(false)}>
             Close
          </Button>
          <Button variant="primary" type="submit" onClick={() => setShow(false)}>  Save Changes
          </Button>
        </Modal.Footer>
        </form>
      </Modal>

      {/* //--------------------------- */}
      <Modal show={show1} onHide={() => setShow1(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) =>AddFormData1(e)}>
        <Modal.Body>
             <div className="col-lg-12 ">
                      <label className="mb-2">Email</label>
                      <input className="form-control" placeholder="Enter your email"  type="email" name="email" value={email}
            onChange={ (e)=>setEmail(e.target.value) }/>
                    </div>
       
         
                   <div className="col-lg-12 mt-3 ">
                      <label className="mb-2"  style={{float:"left"}}>New Password</label>
                      <input className="form-control" type="password" placeholder="Enter your password" name='newPassword' />
                    </div>
                    <div className="col-lg-12 mt-3 ">
                      <label className="mb-2"  style={{float:"left"}}> Con-Password</label>
                      <input className="form-control" type="password" placeholder="Enter your password" name='confirmPassword'  />
                    </div>  
                    <div className="col-lg-12 mt-3 ">
                      <label className="mb-2"  style={{float:"left"}}>OTP</label>
                      <input className="form-control" type="password" placeholder="Enter your password"  name='otp' />
                    </div>   
                  
          
         
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={() => setShow1(false)}>
             Close
          </Button>
          <Button variant="primary" type="submit" onClick={() => setShow1(false)}>  Save Changes
          </Button>
        </Modal.Footer>
        </form>
      </Modal>   
        </>

    );

}