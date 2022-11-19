import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Logout = () => {

     let   email =   localStorage.getItem('email');

       if(email == ''){ window.location.href = '/';  }else{
        localStorage.clear(); 
        toast.success('Logout successfully');   
        window.location.href = '/';
       }

return (
    <ToastContainer  position="top-right"  />     
);

}

export default Logout;