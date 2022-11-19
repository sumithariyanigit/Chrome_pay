import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import Sidebar from '../Sidebar';
import Header from '../Header';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function OrgCustLink() {
  const phone = localStorage.getItem('phone');
  let token = localStorage.getItem('token')
const [show, setShow] = useState(false);


    const OtpFormData = async (e) =>{
        e.preventDefault();

        const data = new FormData(e.target);
        const FormValues = Object.fromEntries(data.entries());
        const formData = FormValues;
        console.log(FormValues);

        axios.post(`/Cust_Linked_Srevice_send_OTP`,formData)
        .then(resp=>{
         if(resp.status){
           let data =resp.data
           if(data.status){
             toast.success(data.msg);
            //  window.location = "/agent-customer-list";
           }else{
             toast.error(data.msg)
           }
         }else{
           toast.error(data.msg)
         }
        })

        
  }

  function handleShow() {
    setShow(true);
    
  }
  const AddFormData = async (e) =>{
    e.preventDefault();


    const data = new FormData(e.target);
    const Formvlaues = Object.fromEntries(data.entries());
    const formData = Formvlaues;
    console.log(Formvlaues);

    axios.post(`/Cust_Linked_Srevice_Org/${token}`,formData)
    .then(resp =>{
      const data = resp.data;
      console.log(data);
      if(data.status){
        toast.success(data.msg);
        window.location ="/customer-list"
      }else{
        toast.error(data.msg);
      }

    })
}
 

   return (
       <div>
           <ToastContainer position="top-right"  />
           <Header/>
           <Sidebar/>
           <section className="bg-gradient position-relative h-100vh p-0" style={{marginTop:"5rem"}}>
     <div className="home-table">
       <div className="home-table-center">
         <div className="container">
           <div className="row justify-content-center">
             <div className="col-lg-5 mt-5">
               <div className="text-center">
               </div>
               <div className="account_box bg-gradient">
                 <div className="text-center">
                   <a href="https://chromepay.io/" className="d-inline-block">
                     <img src="assets/img/logo.png" alt="" className="img-fluid mx-auto d-block login-logo boot" style={{width:"250px"}}/>
                   </a>
                 </div>
                 {/* <h5>Operator Enter OTP</h5> */}
                 <p id = 'errors' style = {{"color":"red"}} > </p>
                 <form onSubmit={(e) => OtpFormData(e)}>
                  
                   <div className="col-lg-12 mt-5">
                     <label className="mb-2">Phone</label>
                     <input className="form-control" placeholder="Enter your Phone" type="number" name="Phone" value={phone}  />
                   </div>
                   
                   
                   <div className="col-lg-12 mt-5 mb-5 bottom-space">
                     <button type="submit" onClick={() => handleShow()} className="btn ripple btn-success w-100 mt-3" >Send OTP</button>
                   </div>
                 </form>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section> 
   <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Link Bank</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) =>AddFormData(e)}>
        <Modal.Body>
             <div className="col-lg-12 ">
                <label className="mb-2">Phone</label>
                <input className="form-control" placeholder="Enter your Number"  type="number" name="Phone" value={phone}/>
            </div>
            
            <div className="col-lg-12 ">
                <label className="mb-2">OTP</label>
                <input className="form-control" placeholder="Enter your Otp"  type="number" name="otp"/>
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
       </div>
   );
      
}  
export default OrgCustLink