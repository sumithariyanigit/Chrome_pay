import React,{useEffect} from 'react';
import { useHistory } from 'react-router-dom/';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const  Protected = (props)=>{
    let Cmp = props.cmp;
  
  useEffect( () =>{
    let   email =   localStorage.getItem('email');
     if(email == ''){ 
         toast.error('Invalide User');   
              useHistory.push('/');
        }

 },[] );

      return(
            <>
            <Cmp />
          </>
      );           
}

export default Protected ;