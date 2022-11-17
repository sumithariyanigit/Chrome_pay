import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

var jwt = require("jsonwebtoken");

const LoginAgent = () => {
  
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  let history = useHistory ();

  const [email, setEmail]=useState('');
  const [password, setPass]=useState('');

  async function login() 
  {

  let data={email, password }; 
  let result= await fetch('/Agentlogin', {
    method : 'POST', 
    headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json",
        
    },
    body:JSON.stringify(data)
 });
     result = await result.json();

     if(result.status){
        localStorage.setItem('token',result.token );
        //localStorage.setItem('orgID',result.orgID );
        //localStorage.setItem('agentID',result.agentID );
        
       
        toast.success(result.msg);
        window.location = "/agent-dashbord"
        // history.push('/otp_login');
       /// navigate(`/otp_login`);
      //  if(email == email ){
       //history.push('otp_login');
      //  }
    }
    else{
        toast.error(result.msg);
    }
   
    
  }
//-------model---------------///
function handleShow1() {
 
  setShow1(true);
}
    //  async function handleShow(){

   
    //   // let token = localStorage.getItem('token')
    //   // var decode1 = jwt.decode(token);
    //   // let agentID = decode1.agentID

    //   let data ={email}
    //   let result = await fetch(`/forgotPassword`, {
    //     method : 'POST', 
    //     headers : {
    //         "Content-Type" : "application/json",
    //         "Accept" : "application/json",
            
    //     },
    //     body:JSON.stringify(data)
    //   })
    //     console.log(data)
    //     result = await result.json();
    //     if(result.status){
    //       toast.success(result.msg);
    //       setShow(true);
    //       // window.location ="/"
    //     }else{
    //       toast.error(result.msg)
    //     }
    //  }    
     
    const AddFormData = async (e) =>{
          e.preventDefault();
          let token = localStorage.getItem('token')
      var decode1 = jwt.decode(token);
      let agentID = decode1.agentID

          const data = new FormData(e.target);
          const Formvlaues = Object.fromEntries(data.entries());
          const formData = Formvlaues;
          console.log(Formvlaues);

          axios.put(`/changePassword`,formData)
          .then(resp =>{
            const data = resp.data;
            console.log(data);
          })
    }

    const AddFormData1 = async (e) =>{
      e.preventDefault();
      let token = localStorage.getItem('token')
  var decode1 = jwt.decode(token);
  let agentID = decode1.agentID

      const data = new FormData(e.target);
      const Formvlaues = Object.fromEntries(data.entries());
      const formData = Formvlaues;
      console.log(Formvlaues);

      axios.post(`/forgotPassword`,formData)
      .then(resp =>{
        const data = resp.data;
        console.log(data);
        if(data.status){
          
          toast.success(data.msg);
          setShow(true);
          // window.location ="/"
        }else{
          toast.error(data.msg)
        }
        
      })
}

    return (
        <div>
             <section className="bg-gradient position-relative h-100vh p-0">
      <div className="home-table">
        <div className="home-table-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="text-center">
                </div>
                <div className="account_box bg-gradient">
                  <div className="text-center">
                  <div className='formdetail'>
                    <a href="https://chromepay.io/" className="d-inline-block">
                      <img src="assets/img/logo.png" alt="" className="mx-auto d-block login-logo"/>
                    </a>
                   </div>
                  </div>          
                  {/* <h5>Operator Login</h5> */}
                  <p id = 'errors' style = {{"color":"red"}} > </p>
                 
                  <form>
                    <div className="col-lg-12 ">
                      <label className="mb-2">Email</label>
                      <input className="form-control" placeholder="Enter your email"  type="email" value={email}
                                                         onChange={ (e)=>setEmail(e.target.value) } />
                    </div>
                    <div className="col-lg-12 mt-3 ">
                      <label className="mb-2">Password</label>
                      <input className="form-control" placeholder="Enter your password" type="password" value={password}
                                                        onChange={ (e)=>setPass(e.target.value) } />
                    </div>
                   <div className="col-lg-12 ">
                    <div className='text-end mt-3'>
                       <h6><a href='#' onClick={() => handleShow1()}>Furget Password ?</a></h6>
                    </div>
                   </div>
                    <div className="col-lg-12 mt-5">
                      <button type="button"  className="btn ripple btn-success w-100 mt-3" onClick={login} >Sign In</button>
                    </div>
                    <div>
                      {/* <p className="mb-0 text-center mt-3"><a href="forgot.php" className="">Have you forgotten your password?</a></p> */}
                    </div>
                  </form>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ToastContainer  position="top-right"  />   

{/* 
    <!-- Button trigger modal --> */}
{/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button> */}

{/* <!-- Modal --> */}
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" style={{background: "rgb(63, 136, 145)"}}>
        <h5 class="modal-title text-white" id="staticBackdropLabel">Forget Password</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form>
      <div class="modal-body">
       
         <div className="col-lg-12 ">
            <label className="mb-2" style={{float:"left"}}>Email</label>
            <input className="form-control" placeholder="Enter your email"  type="email" value={email}
            onChange={ (e)=>setEmail(e.target.value) } />
          </div>
          
          
         
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        {/* <button type="button" class="btn btn-primary"   onClick={() => handleShow()}>Click</button> */}
      </div>
      </form>
    </div>
  </div>
</div>  
<Modal show={show1}  onHide={() => setShow1(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) =>AddFormData1(e)}>
        <Modal.Body>
             <div className="col-lg-12 ">
                      <label className="mb-2">Email</label>
                      <input className="form-control" placeholder="Enter your email"  type="email"  value={email}
                                                         onChange={ (e)=>setEmail(e.target.value) } />
                    </div>
       
         
                   
          
         
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={() => setShow1(false)}>
             Close
          </Button>
          <Button type="submit" className="btn btn-light btn-active-light-primary me-2"  onClick={() => setShow1(false)}>Submit</Button>
        </Modal.Footer>
        </form>
      </Modal>
{/* <!-- Modal Forget Password --> */}
{/* <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" style={{background: "rgb(63, 136, 145)"}}>
        <h5 class="modal-title text-white" id="staticBackdropLabel">Create Password</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={(e) =>AddFormData(e)}>
      <div class="modal-body">
                 <div className="col-lg-12 ">
                      <label className="mb-2">Email</label>
                      <input className="form-control" placeholder="Enter your email"  type="email" value={email}
                                                         onChange={ (e)=>setEmail(e.target.value) } />
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
          
         
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" >submit</button>
      </div>
      </form>
    </div>
  </div>
</div>   */}
 <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) =>AddFormData(e)}>
        <Modal.Body>
             <div className="col-lg-12 ">
                      <label className="mb-2">Email</label>
                      <input className="form-control" placeholder="Enter your email"  type="email" value={email}
                                                         onChange={ (e)=>setEmail(e.target.value) } />
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
          <Button variant="secondary"  onClick={() => setShow(false)}>
             Close
          </Button>
          <Button type="submit" className="btn btn-light btn-active-light-primary me-2"  onClick={() => setShow(false)}>Submit</Button>
        </Modal.Footer>
        </form>
      </Modal>
        </div>
    );
}


export default LoginAgent