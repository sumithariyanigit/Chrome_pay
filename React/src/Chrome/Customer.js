import React from 'react';
import{useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomerTbl from './Table/CustomerTbl';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
function Customer() {
 const [user_list , setUse_list] = useState([]);  
const AllData = async () =>
    {
   
      const getData = async (formData) => 
       {
        const options = { headers:{"Content-type": "application/json" }};            
                    
                    try{
                      let response = await axios.get('/all_customer',formData,options);
                     
                     
                      return   response.data;
                    } catch(err){ console.error(err); return false;  }
                 }  
          let  serverData = await getData({}) ; 
                console.log(serverData); 
          if(serverData){ setUse_list(serverData); };
      };

      useEffect(() => {
        AllData({});
     
      },[]); 
  

      console.log(user_list); 
   


  const [org_list, setOrg_list] = useState([]);

const org_dtl = async () =>{

 
  const options = { headers:{"Content-type": "application/json" }};
   
  const getData = async (formData) => 
              {  try{
                  let response = await axios.get('/org_code_list',formData,options);
                   
                  return   response.data;
                } catch(err){ console.error(err); toast.error('some errror'); return false;  }
             }  
            
             let res = await getData({}); 
          
             
             setOrg_list(res);

            }


useEffect(() => {  org_dtl(); },[]); 



const searchFun = async (e)=>{
         e.preventDefault();

         const data = new FormData(e.target);

    let F_date =  data.get('F_date');
    let L_date =  data.get('L_date');
    let org_code =  data.get('org_code');
    
    let send_parms =  {"F_date" : F_date, "L_date" :L_date,"org_code":org_code } ;  
    
    let  getData2 = async (send_parms) => 
    {
      const options = { headers:{"Content-type": "application/json" }};            
          try{
                   let response = await axios.post('/custListBy_Date',send_parms,options);
                   return   response.data;
                 } catch(err){ console.error(err); return false;  }
              }  
       let  serverData = await getData2(send_parms) ; 
             console.log(serverData); 
       if(serverData){ setUse_list(serverData); };


        }
      

    return (
        <div>
             <Header />  
<section className="organization d-flex align-items-center">
 <div className="container">
      <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
        <div className="col-lg-12 d-flex flex-column justify-content-center">
          <h1 data-aos="fade-up" className=""><span><b>Manage Customers</b></span></h1>
          <p data-aos="fade-up" className="">All List Customers </p>
          </div>
      </div>
      <div className="row">
        <div className="path2 " data-aos="fade-left" data-aos-delay="400">
          <Link to="/">Dashboard</Link> - <span>Customers list</span>
        </div>
      </div>
    </div>
</section>

<main id="main">

 <section className="organizationList">
  <div className="container" data-aos="fade-down" data-aos-delay="100">
    <div className="section-title">
      <h1 className="mb-h1">Filter Customers List</h1>
    </div>
     <div className="row justify-content-center">
     <div className="col-lg-12 mt-4 mb-3"> 
        <form onSubmit={(e)=> searchFun(e)}>  
        <div className="row mb-3 inputdate">
            <div className="col-lg-3"> 
              <label>Select Organization(optional) </label>  
             
                <select className="form-control ht-47 "  name = 'org_code'>
                  <option value= '' >All Organization</option>
                  {(org_list.length >0)? org_list.map((item,index)=>{
                          return<option key = {index} value={item.org_code}>{item.name}</option>}) :''}
                 </select>
            </div>
              
            <div className="col-lg-3 " data-aos="fade-right">  
                 <label>Start Date</label>  
                  <i className="fa fa-calendar-o calendor" aria-hidden="true"></i>
                <input type="date" className="form-control ht-47" name="F_date" />
                 </div>  
                 
            <div className="col-lg-3 " data-aos="fade-right">  
                 <label>End Date</label>  
                  <i className="fa fa-calendar-o calendor" aria-hidden="true"></i>
                <input type="date" className="form-control ht-47" name="L_date" />
                 </div>  


               <div className="col-lg-2 " data-aos="fade-right">  
              <div className="">
              <button type="submit" className="btn serach mt-30">Search</button>
             </div>
               </div>
           <div className="col-lg-12 " data-aos="fade-right">  
           <div className="mt-30">
           <Link to="add-customer"  >
                <span className="btn serach">Add-customer</span></Link>
           
            </div>
            </div>
             </div>
         </form>
          </div>       


       <div className="container" data-aos="fade-down" data-aos-delay="200">
        <div className="row">
          <div className="col-lg-12">
          
            <div> {
              (user_list.length>0)? < CustomerTbl  tbl_rows = {user_list}  sendDataToParent= {AllData} /> : '' 
           }               
          </div>
          </div>
        </div>
      </div>
      </div>
      </div>
</section>
</main>    
       <Footer />        
        </div>
    );
}

export default Customer;