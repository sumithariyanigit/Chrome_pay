import React from 'react';
import{useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Organization_table from './Table/Organization_table';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
function Organization() {
 const [user_list , setUse_list] = useState([]);  
const AllData = async () =>
    {
     
     // var formData = {} ; //  {"email" : email,'pass' :pass };
  
      const getData = async (formData) => 
       {
        const options = { headers:{"Content-type": "application/json" }};            
                    
                    try{
                      let response = await axios.get('/get_org',formData,options);
                      return   response.data;
                    } catch(err){ console.error(err); return false;  }
                 }  
          let  serverData = await getData() ; 
                console.log(serverData); 
          if(serverData){ setUse_list(serverData); };
      };

      useEffect(() => {
        AllData({});
      },[]); 
   var m_list = [];   
      useEffect(() => {
        m_list = user_list ;  
      },[user_list]); 

      console.log(user_list); 
  const DtlFu = (org_code)=>{
    localStorage.setItem('org_code',org_code ); 
    window.location.href = 'organization_detail';
    return false;   

  }    
const searchFun = async (e)=>{
         e.preventDefault();

         const data = new FormData(e.target);

    let F_date =  data.get('F_date');
    let L_date =  data.get('L_date');
    
    let send_parms = {"F_date" : F_date, "L_date" :L_date };  
    
    let  getData2 = async (send_parms) => 
    {
     const options = { headers:{"Content-type": "application/json" }};            
          try{
                   let response = await axios.post('/search_orgDate',send_parms,options);
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
          <h1 data-aos="fade-up" className=""><span><b>Manage Organization</b></span></h1>
          <p data-aos="fade-up" className="">All List Organization </p>
          </div>
      </div>
      <div className="row">
        <div className="path2 " data-aos="fade-left" data-aos-delay="400">
          <Link to="/">Dashboard</Link> - <span>Organization list</span>
        </div>
      </div>
    </div>
</section>

<main id="main">

 <section className="organizationList">
  <div className="container" data-aos="fade-down" data-aos-delay="100">
    <div className="section-title">
      <h1 className="mb-h1">Filter Organization List</h1>
    </div>
     <div className="row justify-content-center">
       <div className="col-lg-12 mt-4 mb-3"> 
        <form onSubmit={(e)=> searchFun(e)}>  
        <div className="row mb-3 inputdate">
            <div className="col-lg-4"> 
              <label>Start Date</label>  
              <i className="fa fa-calendar-o calendor" aria-hidden="true"></i>
                <input type="date" className="form-control ht-47" name="F_date" required="required" placeholder=""/>
            </div>
              
            <div className="col-lg-4 " data-aos="fade-right">  
                 <label>End Date</label>  
                  <i className="fa fa-calendar-o calendor" aria-hidden="true"></i>
                <input type="date" className="form-control ht-47" name="L_date" required="required"  placeholder=""/>
                 </div>   
               <div className="col-lg-2 " data-aos="fade-right">  
              <div className="">
              <button type="submit" className="btn serach mt-30">Search</button>
             </div>
               </div>
           <div className="col-lg-2 " data-aos="fade-right">  
           <div className="mt-30">
                <Link to="add-organization"  >
                <button className="btn serach">Add-Org</button></Link>
           
            </div>
            </div>
             </div>
         </form>
          </div>
       <div className="container" data-aos="fade-down" data-aos-delay="200">
        <div className="row">
          <div className="col-lg-12">
           {
              (user_list.length>0)? < Organization_table  tbl_rows = {user_list} 
              sendDataToParent = {AllData} /> : '' 
           }               



        
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

export default Organization;