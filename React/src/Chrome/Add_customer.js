import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import{useState,useEffect } from 'react';
import axios from 'axios';
import Chackbox from './Checkbox';


function Add_customer() {


   // features_tbl

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

            useEffect(() => {
              org_dtl();
            },[]);    
            
              
          console.log(org_list);      
  
    
     
          
         // input  e.target.value 
const[inputValue ,setInputValue] = useState(); 
         function handleInputChange(event) {
            setInputValue(event.target.value);
        }
/////////////////////////////////////////////////////////////
      const hendalSubmit = async(e) => {
          e.preventDefault();
      console.log(' hendalSubmit call arr == '); 
        
       const data = new FormData(e.target);
      let Formvlaues = Object.fromEntries(data.entries());  
                      //  console.log(Formvlaues);
            try{
              let response = await axios.post('/add-customer',Formvlaues,{ headers:{"Content-type": "application/json" }});
           
             // console.log(response.data);
            if(response.data.status === true)
            {
              toast.success(response.data.msg); 
              document.getElementById("FormID").reset();
            }else{
              toast.error(response.data.msg);
            }

            } catch(err){ 
                 toast.error('something went wrong please try again'); return false;  }
        
     
          return false; 
      }

const RestartFom = ()=>{
  document.getElementById("FormID").reset();
  return false; 
}

    return (
        <div>
          <Header />
        
          <section className="organization d-flex align-items-center">
 <div className="container">
      <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
        <div className="col-lg-12 d-flex flex-column justify-content-center">
          <h1 data-aos="fade-up" className=""><span><b>Add Customer</b></span></h1>
        </div>
      </div>
      <div className="row">
        <div className="path2 " data-aos="fade-left" data-aos-delay="400">
          <Link to="Home">Dashboard</Link> - <span>Add Customer</span>
        </div>
      </div>
    </div>
</section>
<main id="main">
  <section className="organizationList pt-0">
    <div className="container">
      
            <div className="row justify-content-center filter-box profile-text" data-aos="fade-down"  data-aos-delay="400" >
        <div className="col-lg-12 mb-3">
          <div className="table-title">
            <h5 className="mb-4"> Basic Details</h5>
          </div>
          <form id = 'FormID' onSubmit={(e)=>hendalSubmit(e)}>
            <div className="row row-sm">
              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="100">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" name = 'name' />
                  <label for="floatingInput">Customer Name</label>
                </div>
              </div>
              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="300">
                <div className="form-floating mb-3">
                  <i className="fa fa-calendar-o calendor-s" aria-hidden="true"></i>
                  <input type="date" className="form-control" name ="join_date" />
                  <label for="datepicker">Joining Date </label>
                </div>
              </div>

              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="400">
                <div className="form-floating mb-3">
                  <input type="number" className="form-control" name = 'phone' />
                  <label for="floatingInput">Phone Number</label>
                </div>
              </div>
              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="500">
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" name = 'email' />
                  <label for="floatingInput">Email address</label>
                </div>
              </div>


              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="600">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" name = 'country' />
                  <label for="floatingInput">Country</label>
                </div>
              </div>

              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="600">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" name = 'state' />
                  <label for="floatingInput">State</label>
                </div>
              </div>  

              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="600">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" name = 'city'  />
                  <label for="floatingInput">City</label>
                </div>
              </div>

               <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="600">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" name = 'pin_code' />
                  <label for="floatingInput">Area/Post code</label>
                </div>
                </div>

              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="600">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control"  name = "address" />
                  <label for="floatingInput">Address</label>
                </div>
              </div>
          
          
              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="600">
                <div className="form-floating mb-3">
                 <select className='form-control' name = "org_code">
                     <option value={''} >chormpay</option>   
                     {org_list.map((item,index)=>{
                          return<option key = {index} value={item.org_code}>{item.name}</option>})}
                 </select>
                  <label for="floatingInput">Select Organization</label>
                </div>
              </div>
           
              </div>



              <div className="col-lg-12 mt-1 p-0">
                          <button type="sumit" className="btn btn-primary btn_veri1  mb-3">Submit</button>
                          <button type="reset" className="btn btn-secondary btn-reset  mb-3" onClick={RestartFom} >Reset</button>
                        </div>
          </form>
        </div>
      </div>
    </div>
  </section>

</main>
        <Footer /> 
        <ToastContainer  position="top-right"  />         
        </div>
    );
}

export default Add_customer;