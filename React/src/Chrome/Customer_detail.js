import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Modal } from 'react-responsive-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Customer_blacklist_whitlist_table from './Table/Customer_blacklist_whitlist_table';
//import Customer_compliance_team_table from './'
import Customer_compliance_team_table from './Table_new/Customer_compliance_team_table';

import{useState,useEffect } from 'react';
import axios from 'axios';

function Customer_detail() {

  const attech_document ="attech_document";
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const[doc_name,setDoc_name] = useState('');


  const [orgInfo, setOrgInfo] = useState(
            {"cus_id": '',"name": "jk com","org_code": "","mobile": '',"email": "",
              "address": "","pin_code":'' ,"city": "","country": "","black_white_list": '',
              "time": "","date": ""});
  

const org_dtl = async () =>{

  let cus_code = localStorage.getItem('cus_code');
  const options = { headers:{"Content-type": "application/json" }};
  var formData =  {"cus_code" : cus_code};
    
  
  console.log('NEW REQ == ');
  console.log(formData);
  const getData = async (formData) => 
              {  try{
                  let response = await axios.post('/oneCustomer',formData,options);
                
                  return   response.data;
                 } catch(err){ console.error(err); toast.error('some errror'); return false;  }
             }  
        let     serverData = await getData(formData); 
                
        
            console.log('oneCustomer call == ' );  
            console.log(serverData);  
 
             let sum = { "cus_id": serverData[0].cus_id,
             "name": serverData[0].name,
             "org_code": serverData[0].org_code,
             "cus_code": serverData[0].cus_code,
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
            
            useEffect(() => {
              console.log('final round ==');         
                  console.log(orgInfo); 
            },[]);       
  
  
      const orgStatusUp = async(cus_id,type,status) => {
            console.log('cus_id == ', cus_id ); 
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
         var formData = [setcol, {"cus_id" : cus_id} ];
                
              try{
                  let response = await axios.put('/cutStatusUp',formData,options_2);
                   console.log(response);
                   console.log('api status == '+response.data.status );
                  if(response.data.status){
                   // toast.success(type+' Update  successfully');
                    toast.success('Status Update  successfully');
                  }else{
                    toast.error( 'something went wrong please try again..');
                  }
                
                  return   response.data;
                } catch(err){ console.error(err); toast.error('2 something went wrong please try again'); return false;  }
                      

            
       
          }
          const [bw_list,setBw_list] = useState([]);
    const bw_fun = async () =>{
      try{
        let response = await axios.get('/getBW_list');
                
        setBw_list( response.data );
      } catch(err){ console.error(err); toast.error('some errror'); return false;  }
        }  



        useEffect(() =>{
          bw_fun();
        },[]);


        console.log('bw fun call==');
        console.log(bw_list);


      


const md_form = async (e)=>{
  e.preventDefault() ;
  let formdata = new FormData(document.querySelector("#mdF"));
 
    console.log('md_form');
    
    console.log(formdata);
    try {
      
      let options1 = { headers:{"Content-type": "application/json" }};
      let response = await axios.post('/c_user_doc_adds',formdata,options1);
      
      if(response)
      {  setOpen(false);
         toast.success('Document Add Successfully');
           
        }else{
          toast.error( 'something went wrong please try again..');
        }

      console.log(response); 

    } catch(error) {
      console.log(error)
    }
  
    return false; 
}

    return (
        <div>
          <Header />
        
<section className="organization d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up" className=""><span><b>Customer Details</b></span></h1>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-down" data-aos-delay="400">
        <Link to="/Home">Dashboard</Link> - <span>Customer Details</span>
      </div>
    </div>
  </div>
</section>

<main id="main" className="card-section">

  <section className="organizationList detail_organization" data-aos="fade-up" data-aos-delay="200">
    <div className="container" data-aos="fade-in" data-aos-delay="400">
      <div className="section-title">
        <h1>Customer Details</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-12 mt-4 mb-3">
          <form>
            <div className="row row-sm">
              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="100">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control"
                   value= {orgInfo.name} readonly=""/>
                  <label for="floatingInput">Customer Name</label>
                </div>
              </div>
              <div className="col-md-4 mb-2" data-aos="fade-down" data-aos-delay="200">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control"
                      readonly="" value= {orgInfo.cus_code}  />
                  <label for="floatingInput">Customer Code</label>
                </div>
              </div>
              <div className="col-md-4 mb-2" data-aos="fade-down" data-aos-delay="200">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control"
                     readonly="" value= {orgInfo.org_code}  />
                  <label for="floatingInput">org Code</label>
                </div>
              </div>
              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="300">
                <div className="form-floating mb-3">
                  <i className="fa fa-calendar-o calendor-s" aria-hidden="true"></i>
                  <input type="text" className="form-control" 
                           value= {orgInfo.date.substring(0, 10).split("-").reverse().join("-")}  />
                  <label for="datepicker">Joining Date</label>
                </div>
              </div>

              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="400">
                <div className="form-floating mb-3">
                  <input type="number" className="form-control" 
                     value= {orgInfo.mobile} readonly=""/>
                  <label for="floatingInput">Phone Number</label>
                </div>
              </div>
              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="500">
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" 
                       value= {orgInfo.email} readonly=""/>
                  <label for="floatingInput">Email address</label>
                </div>
              </div>
              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="600">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" 
                        value= {orgInfo.address}  readonly=""/>
                  <label for="floatingInput">Address</label>
                </div>

              </div>
              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="600">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control"  
                       value= {orgInfo.pin_code}  readonly=""/>
                  <label for="floatingInput">Area/Post code</label>
                </div>

              </div>

              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="600">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" 
                      value= {orgInfo.city} readonly=""/>
                  <label for="floatingInput">City</label>
                </div>
              </div>

              <div className="col-md-4  mb-2" data-aos="fade-down" data-aos-delay="600">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control"
                       value= {orgInfo.country} readonly=""/>
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
          <select id="dropdownId" onChange={(e)=> orgStatusUp(orgInfo.cus_id,'Risk_Assessment',e.target.value) } className="form-control">
      {console.log("DDDDDD =  "+orgInfo.risk_status )}
     { (orgInfo.risk_status == 0) ? <option value = '0' selected >High</option> : <option value = '0'>High</option> }
     { (orgInfo.risk_status == 1) ? <option value = '1' selected >Medium</option> : <option value = '1' >Medium</option> }
     { (orgInfo.risk_status == 2) ? <option value = '2' selected >Low</option> : <option value = '2'>Low</option> }
   
    </select>
        </div>
        <div className="col-lg-6">
          <label>Blacklist/Whitelist Customer </label>
          <select className="select-drowp"  onChange={(e)=> orgStatusUp(orgInfo.cus_id,'Blacklist/Whitelist Customer ',e.target.value) }  >
    
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
        <h1>Customer Verification Online</h1>
        <button type="button" className="btn btn-primary btn_veri my-2 btn-icon-text">Verify Identity</button>
      </div>
     
      </div>
  </section>

 <section className="organizationList pt-0"  data-aos="fade-down"  style = {{'display':'none'}} data-aos-delay="400">
    <div className="container card-sm" data-aos="fade-down" data-aos-delay="600">
      <div className="section-title">
        <h1>Customer Transaction History</h1>
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
                      <th><span>Customer<br/> Name</span></th>
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

  
 <section className="card-section pt-0">
    <div className="container">
       {/* <Customer_blacklist_whitlist_table /> */}
   
       <div> {
              (bw_list.length>0)? < Customer_blacklist_whitlist_table 
               tbl_rows = {bw_list}  sendDataToParent= {bw_fun} /> : '' 
           }               
          </div>
   
     </div>
  </section>


  <section className="card-section organizationList  pt-0">
    <div className="container card-sm " data-aos="fade-down" data-aos-delay="400">
      <div className="section-title">
        <h1>Attached Cstomer Documents</h1>
         <button type="button" className="btn btn-primary btn_veri btn-icon-text" onClick={onOpenModal}><i className="fe fe-plus"></i> Attach Document</button> 
      </div>
      <div className="row justify-content-center mt-4">
       <h3 className="card-title-none">No documents have been attached</h3>
      </div>
        
  </div>
</section>

<section className="card-section pt-0">
    <div className="container" >
      <div className="row justify-content-center mt-4">
        <div className="col-lg-12">
          <Customer_compliance_team_table />
            </div>
          </div>
      </div>
  </section>

</main>

<Modal open={open} onClose={onCloseModal} center classNames={attech_document}>
<form onSubmit={(e)=>md_form(e)} encType= 'multipart/form-data' id = 'mdF'   >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Attach Customer Documents</h5>
       
      </div>
      <div className="modal-body">

     <div className="row">
            <div className="col-lg-12 mb-3">
              <label>Documents:</label>
              <select className="select-controler form-control" onChange={(e)=> setDoc_name(e.target.value) }  >
              <option selected="">Please select...</option>
               <option value="PASSPORT">Passport</option>
                <option value="DRIVING_LICENSE">Driving License</option>
                <option value="NATIONAL_ID_CARD">National ID Card</option>
                <option value="VOTE_CARD">Vote Card</option>
                <option value="ADDRESS_PROOF">Proof of address</option>
                <option value="SOURCE_OF_INCOME_PROOF">Proof for the source of income</option>
                <option value="INVOICE">Service invoice</option>
                <option value="OTHER_OFFICIAL_DOCUMENT">Other Official Document</option>
                <option value="PROOF_OF_PAYMENT_DOCUMENT">Proof Of Payment</option>
                <option value="EXPRESS_DEPOSIT_DOCUMENT">Direct Debit Mandate Document</option>
                <option value="CUSTOMER_DECLARATION_FORM">Customer declaration form</option>
                <option value="NOTARIZED_SHAREHOLDERS_ID">Notarized copies of Beneficial Owner(s) / Shareholders ID</option>
                <option value="NOTARIZED_SHAREHOLDERS_PROOF_OF_ADDRESS">Notarized copy of Beneficial Owner(s) / shareholders proof of address (less than three months old)</option>
                <option value="CERTIFICATE_OF_REGULATOR">Certificate of Regulator to supply Financial Services (if applicable)</option>
                <option value="COMPANY_PROOF_OF_ADDRESS">Company proof of address (not less than three months old)</option>
                <option value="COPY_OF_AML">Copy of AML/CFT Manual</option>
                <option value="LATEST_ANNUAL_ACCOUNTS">Latest Annual Accounts</option>
                <option value="ORGANIZATIONAL_CHART">Organisational chart (if available)</option>
                <option value="AML_SUPERVISION_CERTIFICATE">AML Supervision certificate (if applicable)</option>
                <option value="BUSINESS_REGISTRATION">Certificate of Incorporation</option>
                <option value="TAX_CERTIFICATE">Valid Business Licence/Tax Certificate</option>
                <option value="ARTICLES_OF_INCORPORATION">Articles of Incorporation / Memorandum of Association</option>
                <option value="DIRECTORS_PASSPORT">Passport or other identification documents of directors</option>
                <option value="REGULATORY_APPROVAL">Regulatory Approval/License/Registration to engage in Remittance/Money Transfer</option>
                <option value="AUDITED_FINANCIAL_STATEMENTS">Last 3 years audited financial statements</option>
                <option value="PHOTOGRAPH_OF_THE_OUTLET">Photograph of the outlet</option>
                <option value="COMPLIANCE_POLICIES">Compliance policies for Anti-money laundering and counter terrorism financing</option>
                <option value="KYC_QUESTIONNAIRES">Complete AML/CFT and KYC Questionnaires for Remittance Tie-Up</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-3">
             <label>ID Name:</label>
             <input className="form-control ht-47" name="id_name" type="text" readonly="" value= {doc_name} />
             <input  name="user_code" type="hidden" value= { localStorage.getItem("cus_code")} />
            
            </div>
             <div className="col-lg-6 mb-3">
              <label>Issue Date:</label>
              <i className="fa fa-calendar-o right-mobile" aria-hidden="true"></i>
              <input className="form-control ht-47" name="issue_data" type="date" />
            </div> 
            <div className="col-lg-6 mb-3">
              <label>ID No:</label>
              <input className="form-control ht-47" name="id_no" type="text"  />
            </div>
            <div className="col-lg-6 mb-3">
              <label>Expiry Date:</label>
              <i className="fa fa-calendar-o right-mobile" aria-hidden="true"></i>
              <input className="form-control ht-47" name="ex_date" type="date" />
            </div> 
            <div className="col-lg-6 mb-3">
              <label>Issue Country:</label>
            <select  className="select-controler form-control" name = 'Country'>
            <option value="" selected="selected">Please Select...</option>
                    <option value="Abkhazia">Abkhazia</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Aland">Aland</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Ascension">Ascension</option>
                    <option value="Ashmore and Cartier Islands">Ashmore and Cartier Islands</option>
                    <option value="Australia">Australia</option>
                    <option value="Australian Antarctic Territory">Australian Antarctic Territory</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Baker Island">Baker Island</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Antarctic Territory">British Antarctic Territory</option>
                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                    <option value="British Sovereign Base Areas">British Sovereign Base Areas</option>
                    <option value="British Virgin Islands">British Virgin Islands</option>
                    <option value="Brunei">Brunei</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Clipperton Island">Clipperton Island</option>
                    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Coral Sea Islands">Coral Sea Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands (Islas Malvinas)">Falkland Islands (Islas Malvinas)</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern and Antarctic Lands">French Southern and Antarctic Lands</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea Bissau">Guinea Bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Howland Island">Howland Island</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran">Iran</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Ivory Coast">Ivory Coast</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jarvis Island">Jarvis Island</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Johnston Atoll">Johnston Atoll</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kingman Reef">Kingman Reef</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Kosovo">Kosovo</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Laos">Laos</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libya">Libya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macau">Macau</option>
                    <option value="Macedonia">Macedonia</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia">Micronesia</option>
                    <option value="Midway Islands">Midway Islands</option>
                    <option value="Moldova">Moldova</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Nagorno-Karabakh">Nagorno-Karabakh</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Navassa Island">Navassa Island</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Cyprus">Northern Cyprus</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="North Korea">North Korea</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestine">Palestine</option>
                    <option value="Palmyra Atoll">Palmyra Atoll</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Peter I Island">Peter I Island</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn Islands">Pitcairn Islands</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Pridnestrovie (Transnistria)">Pridnestrovie (Transnistria)</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Queen Maud Land">Queen Maud Land</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Ross Dependency">Ross Dependency</option>
                    <option value="Russia">Russia</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Barthelemy">Saint Barthelemy</option>
                    <option value="Saint Helena">Saint Helena</option>
                    <option value="Saint Martin">Saint Martin</option>
                    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="Somaliland">Somaliland</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
                    <option value="South Korea">South Korea</option>
                    <option value="South Ossetia">South Ossetia</option>
                    <option value="South Sudan">South Sudan</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="St Kitts and Nevis">St Kitts and Nevis</option>
                    <option value="St Lucia">St Lucia</option>
                    <option value="St Vincent Grenadines">St Vincent Grenadines</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard">Svalbard</option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syria">Syria</option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Timor-Leste (East Timor)">Timor-Leste (East Timor)</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tristan da Cunha">Tristan da Cunha</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos">Turks and Caicos</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="U.S. Virgin Islands">U.S. Virgin Islands</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Vatican City">Vatican City</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Wake Island">Wake Island</option>
                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
              </select>
            </div>
              <div className="col-lg-6 mb-3">
             <label>Date Of Birth:</label>
             <i className="fa fa-calendar-o right-mobile" aria-hidden="true"></i>
              <input className="form-control ht-47" name="dob" type="date" />
            </div> 
             <div className="col-lg-12 mb-2">
             <label>Document ADD FIRST-SIDE:</label>
              <input className="form-control ht-47 pd-11" name="image_F" type="file"  />
            </div> 
             <div className="col-lg-12 mb-2">
             <label>Document ADD LEFT-SIDE:</label>
              <input className="form-control ht-47 pd-11" name="image_L" type="file"  />
            </div> 
           </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary btn_veri1">Submit</button>
          <button type="button" className="btn btn-secondary btn-reset" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </form>
      </Modal>
        <Footer /> 
        <ToastContainer  position="top-right"  />         
        </div>
    );
}

export default Customer_detail;