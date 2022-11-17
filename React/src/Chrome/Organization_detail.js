import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerTbl from './Table/CustomerTbl';


import{useState,useEffect } from 'react';
import axios from 'axios';

function Organization_detail() {




  const [orgInfo, setOrgInfo] = useState(
            {"org_id": '',"name": "jk com","org_code": "","mobile": '',"email": "",
              "address": "","pin_code":'' ,"city": "","country": "","black_white_list": '',
              "time": "","date": ""});

const org_dtl = async () =>{

  let org_code = localStorage.getItem('org_code');
  let options = { headers:{"Content-type": "application/json" }};
  var formData =  {"org_code" : org_code};
    
  
  console.log('NEW REQ == ');
  console.log(formData);
  const getData = async (formData) => 
              {  try{
                  let response = await axios.post('/get_org_id',formData,options);
                
                  return   response.data;
                 } catch(err){ console.error(err); toast.error('some errror'); return false;  }
             }  
        let     serverData = await getData(formData); 

 
             let sum = { "org_id": serverData[0].org_id,
             "name": serverData[0].name,
             "org_code": serverData[0].org_code,
             "mobile": serverData[0].mobile,
             "email": serverData[0].email,
             "address": serverData[0].address,
             "pin_code":serverData[0].pin_code,
             "city": serverData[0].city,
             "country": serverData[0].country,
             "black_white_list":serverData[0].black_white_list,
             "risk_status":serverData[0].risk_status,
             "time":serverData[0].time,
             "date": serverData[0].date   };
             
             setOrgInfo(sum);

        // if(serverData.length>0){setOrgInfo = serverData;
        //       }
            }

            useEffect(() => {
              org_dtl();
            },[]);    
   const[orgCustomers,setOrgCustomers] = useState([]);
  const getOrgUsers = async() =>{
   
       let org_code = localStorage.getItem('org_code');
        let options = { headers:{"Content-type": "application/json" }};
       let formData =  {"org_code" : org_code ,"delete_status": '0'};
      try{
      let response = await axios.post('/oneCustomer',formData,options);
    
           setOrgCustomers(response.data);
       } catch(err){ console.error(err); toast.error('some errror'); return false; }
 
      }
      
      useEffect(() => {
        getOrgUsers();
      },[]);  
      
     console.log('orgCustomers calling == '); 
     console.log(orgCustomers); 
  
      const orgStatusUp = async(org_id,type,status) => {
            console.log('org_id == ', org_id ); 
            console.log('type == ', type ); 
        
            console.log('status == ', status ); 
            let setcol,whr;
            if(type == 'Risk_Assessment')
            {
              setcol = {'risk_status':status };
            }else{
              setcol = {'black_white_list':status };
              
                  }
       const options_2 = { headers:{"Content-type": "application/json" }};
         var formData = [setcol, {"org_id" : org_id} ];
                
              try{
                  let response = await axios.put('/edit_org',formData,options_2);
                   console.log(response);
                   console.log('api status == '+response.data.status );
                  if(response.data.status){
                    toast.success(type+' Update  successfully');
                  }else{
                    toast.error( '1 something went wrong please try again..');
                  }
                
                  return   response.data;
                } catch(err){ console.error(err); toast.error('2 something went wrong please try again'); return false;  }
                      

            
       
          }
          
    return (
        <div>
          <Header />
        
<section className="organization d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up" className=""><span><b>Organization Details</b></span></h1>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-down" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Organization Details</span>
      </div>
    </div>
  </div>
</section>

<main id="main" className="card-section">

  <section className="organizationList detail_organization" data-aos="fade-up" data-aos-delay="200">
    <div className="container" data-aos="fade-in" data-aos-delay="400">
      <div className="section-title">
        <h1>Organization Details</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-12 mt-4 mb-3">
          <form>
            <div className="row row-sm">
              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="100">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control"
                   placeholder="name@example.com" value= {orgInfo.name} readonly=""/>
                  <label for="floatingInput">Organization Name</label>
                </div>
              </div>
              <div className="col-md-4 mb-2" data-aos="fade-down" data-aos-delay="200">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control"
                   placeholder="name@example.com" readonly="" value= {orgInfo.org_code}  />
                  <label for="floatingInput">Code</label>
                </div>
              </div>
              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="300">
                <div className="form-floating mb-3">
                  <i className="fa fa-calendar-o calendor-s" aria-hidden="true"></i>
                  <input type="date" className="form-control" 
                  placeholder="name@example.com" value= {orgInfo.date}   />
                  <label for="datepicker">Joining Date </label>
                </div>
              </div>

              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="400">
                <div className="form-floating mb-3">
                  <input type="number" className="form-control" 
                  placeholder="name@example.com" value= {orgInfo.mobile} readonly=""/>
                  <label for="floatingInput">Phone Number</label>
                </div>
              </div>
              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="500">
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" 
                  placeholder="name@example.com" value= {orgInfo.email} readonly=""/>
                  <label for="floatingInput">Email address</label>
                </div>
              </div>
              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="600">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" 
                  placeholder="name@example.com" value= {orgInfo.address}  readonly=""/>
                  <label for="floatingInput">Address</label>
                </div>

              </div>
              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="600">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control"  
                   placeholder="name@example.com" value= {orgInfo.pin_code}  readonly=""/>
                  <label for="floatingInput">Area/Post code</label>
                </div>

              </div>

              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="600">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" 
                  placeholder="name@example.com" value= {orgInfo.city} readonly=""/>
                  <label for="floatingInput">City</label>
                </div>
              </div>

              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="600">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control"
                   placeholder="name@example.com" value= {orgInfo.country} readonly=""/>
                  <label for="floatingInput">Country</label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
  </section>
  <section className="organizationList pt-0 mmt-40">
    <div className="container card-sm" data-aos="fade-down" data-aos-delay="400">
      <div className="section-title mb-3">
        <h1>Risk Assessment</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-6 mm-3">
          <label>Risk Assessment</label>
          <select id="dropdownId" onChange={(e)=> orgStatusUp(orgInfo.org_id,'Risk_Assessment',e.target.value) } className="form-control">
      {console.log("DDDDDD =  "+orgInfo.risk_status )}
     { (orgInfo.risk_status == 0) ? <option value = '0' selected  >High</option> : <option value = '0'>High</option> }
     { (orgInfo.risk_status == 1) ? <option value = '1' selected   >Medium</option> : <option value = '1' >Medium</option> }
     { (orgInfo.risk_status == 2) ? <option value = '2' selected  >Low</option> : <option value = '2'>Low</option> }
   
    </select>
        </div>
        <div className="col-lg-6">
          <label>Blacklist/Whitelist Organization </label>
          <select className="select-drowp"  onChange={(e)=> orgStatusUp(orgInfo.org_id,'Blacklist/Whitelist Organization ',e.target.value) }  >
    
     { (orgInfo.black_white_list == 3) ? <option value = '3' selected  >Whitelisted</option> : <option value = '3'>Whitelisted</option> }
     { (orgInfo.black_white_list == 5) ? <option value = '5' selected  >Recommend for blacklist</option> : <option value = '5'>Recommend for blacklist</option> }
     { (orgInfo.black_white_list == 4) ? <option value = '4' selected  >Blacklisted</option> : <option value = '4'>Blacklisted</option> }
      
    </select>
        </div>
      </div>
    </div>
  </section>
  <section className="organizationList pt-0" style = {{'display':'none'}} >
    <div className="container card-sm" data-aos="fade-down" data-aos-delay="500">
      <div className="section-title">
        <h1>Organization Verification Online</h1>
        <button type="button" className="btn btn-primary btn_veri my-2 btn-icon-text">Verify Identity</button>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table id="example3" className="table text-center table-bordered border-t0 key-buttons text-nowrap w-100">
                  <thead>
                    <tr>
                      <th className="">Organization Name</th>
                      <th className="">Type</th>
                      <th className="">File </th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Chromepay</td>
                      <td>License</td>
                      <td><img src="../assets/images/sample-pan-card-front.jpg" width="60px" onclick="openModal();currentSlide(1)" className="hover-shadow cursor"/></td>
                    </tr>
                    <tr>
                      <td>Chromepay</td>
                      <td>License</td>
                      <td><img src="../assets/images/sample-pan-card-front.jpg" width="60px" onclick="openModal();currentSlide(1)" className="hover-shadow cursor"/></td>
                    </tr>

                  </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  </section>

 <section className="organizationList pt-0"  data-aos="fade-down"  style = {{'display':'none'}} data-aos-delay="400">
    <div className="container card-sm" data-aos="fade-down" data-aos-delay="600">
      <div className="section-title">
        <h1>Organization Transaction History</h1>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table id="exportexample" className="table text-center table-bordered border-t0 key-buttons text-nowrap w-100">
                  <thead>
                    <tr className="trans_th">
                      <th>Created Date</th>
                      <th><span>Organization<br/> Name</span></th>
                      <th>Order No</th>
                      <th>PCN</th>
                      <th>Receiver</th>
                      <th><span>Receiving <br/> Country</span></th>
                      <th><span>Sending <br/> Amount</span></th>
                      <th><span>Receiving <br/> Amount</span></th>
                      <th>Relationship</th>
                      <th>Status</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>12/08/2021</td>
                      <td>Chromepay</td>
                      <td>AS123SD</td>
                      <td></td>
                      <td>Nigeria</td>
                      <td>Nigeria</td>
                      <td>3400</td>
                      <td>3400</td>
                      <td></td>
                      <td>success</td>
                    </tr>
                    <tr>
                      <td>14/08/2021</td>
                      <td>Chromepay</td>
                      <td>AS123SD</td>
                      <td></td>
                      <td>Nigeria</td>
                      <td>Nigeria</td>
                      <td>3400</td>
                      <td>3400</td>
                      <td></td>
                      <td>success</td>
                    </tr>
                    <tr>
                      <td>28/08/2021</td>
                      <td>Chromepay</td>
                      <td>AS123SD</td>
                      <td></td>
                      <td>Nigeria</td>
                      <td>Nigeria</td>
                      <td>3400</td>
                      <td>3400</td>
                      <td></td>
                      <td>success</td>
                    </tr>
                    <tr>
                      <td>29/08/2021</td>
                      <td>Chromepay</td>
                      <td>AS123SD</td>
                      <td></td>
                      <td>Nigeria</td>
                      <td>Nigeria</td>
                      <td>3400</td>
                      <td>3400</td>
                      <td></td>
                      <td>success</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  </section>
       <div> {
              (orgCustomers.length>0)? < CustomerTbl  tbl_rows = {orgCustomers}  sendDataToParent= {getOrgUsers} /> : '' 
           }               
          </div>
</main>
        <Footer /> 
        <ToastContainer  position="top-right"  />         
        </div>
    );
}

export default Organization_detail;