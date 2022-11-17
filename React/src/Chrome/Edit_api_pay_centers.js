import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import Check_box_malti from './sub_com/Check_box_malti';
import { toast,ToastContainer } from 'react-toastify';
const attech_document ="attech_document";



function Edit_api_pay_centers() {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
 
  ///////////////////////////////////   
          
    const [mystate, setMystate] = useState(
                {"name" : "","country": "","org_code": "","Phone":"","ag_code":"","email":"",
                  "serial_no_prefix":"","add_one" : "","serial_no_len":"","add_two":"",
                  "debit_ac":"","city": "","post_code": "","ag_id" :""});
    
    
    const handleChange = (e) => {
              let value = e.target.value;
              setMystate({ ...mystate, [e.target.name]: value });
            }
  //////////////////////////////////////////  
const [tbl_list,setTbl_list] = useState({});
const md_form = async ()=>{
     let agent_info = localStorage.getItem('agent_info');
      let formdata = {"agent_code" :agent_info };
    console.log(formdata);
      try {
            let options1 = { headers:{"Content-type": "application/json" }};
            let response = await axios.get('/getAll_agent',formdata,options1);
           // demo_fun( response.data );
          let sum =    response.data.filter( (Item) => agent_info == Item.agent_code )
            setTbl_list(sum[0]);
            let updemo =   {"name" : sum[0].name,"country": sum[0].country,"org_code": sum[0].org_code,"Phone": sum[0].mobile,"ag_code": sum[0].agent_code ,"email":sum[0].email,
            "serial_no_prefix":sum[0].serial_no_prefix,"add_one" : sum[0].address_one,"serial_no_len": sum[0].serial_no_length,"add_two":sum[0].address_two,
            "debit_ac":sum[0].debit_ac,"city": sum[0].city ,"post_code":sum[0].post_code,
            "ag_id" : sum[0].ag_id} 	;
                 setMystate(updemo);
       } catch(error) {
        console.log(error);
      }
   
     
     
  }
    
  useEffect(() =>{
    md_form();
  },[]);


  console.log('======mystate=========');
  console.log(mystate);


  ///////////////////////////////////////////////
  
 const [agt_per, setAgt_per]  = useState([]);  
  const getData2 = async () => 
  {    let options = { headers:{"Content-type": "application/json" }};
        let agent_info = localStorage.getItem('agent_info');
        let formData   = {"user_code": agent_info}; 
       try{
      let response = await axios.post('/get_agent_permission',formData,options );
        setAgt_per(response.data);
    } catch(err){ console.error(err); toast.error('some errror'); return false;  }
 }  
 useEffect(() =>{ getData2();  },[]);

  /////////////////////////////////////////////////////////////
  
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
 ////////////////////////
 
  
 const Edit_form = async (e)=>{
  e.preventDefault() ;

  let formdata = new FormData(document.querySelector("#mdF"));
 
    console.log('md_form');
    
    console.log(formdata);
    try {
      
      let options1 = { headers:{"Content-type": "application/json" }};
      let response = await axios.post('/agentUpdate',formdata,options1);
      
      if(response.data.status)
      { 
         toast.success( response.data.msg);
           
        }else{
          toast.error( response.data.msg);
        }
   } catch(error) {
      console.log(error)
    }
  
    return false; 
}



///////////////////////////////

    return (
        <div>
  <Header /> 
  <section className="organization d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
      <h1 className='aos-init aos-animate'><span><b> Partners / Agents <br /> Branches</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Partners / Agents Branches</span>
      </div>
    </div>
  </div>
</section>


<main id="main">
<section className="bulk_sms pb-0 setting_manger">
  <div className="container">
    <div className="row justify-content-center filter-box">
      <div className="col-lg-12 mb-4">
        <div className="title-head">
          <h5 className="mb-2">Edit API Details</h5>
          <p>Provide setup details for API (External System Integration). <br />This is normally supplied by API provider.</p>
        </div>
        <form onSubmit={(e)=>Edit_form(e)} encType= 'multipart/form-data' id = 'mdF' >
          <div className="row">

          <div className="col-lg-6 mb-4" >
              <label>Agent Name <span className="requrd">*</span></label>
              <input className="form-control ht-46" name = 'name' type="search" 
               value = {(mystate.name)? mystate.name : '' } onChange={handleChange}  />
            </div>

            <div className="col-lg-6 mb-4">
              <label>Country<span className="requrd">*</span></label>
              <select className="select-controler form-control" name = 'country' >
                <option >Abkhazia</option>
                <option >Afghanistan</option>
                <option >Aland</option>
                <option >Albania</option>
                <option >Algeria</option>
                <option >American Samoa</option>
                <option >Andorra</option>
                <option >Angola</option>
                <option >Anguilla</option>
                <option >Antarctica</option>
                <option >Antigua and Barbuda</option>
                <option >Argentina</option>
                <option >Armenia</option>
                <option >Aruba</option>
                <option >Ascension</option>
                <option >Ashmore and Cartier Islands</option>
                <option >Australia</option>
                <option >Australian Antarctic Territory</option>
                <option >Austria</option>
                <option >Azerbaijan</option>
                <option >Bahamas</option>
                <option >Bahrain</option>
                <option >Baker Island</option>
                <option >Bangladesh</option>
                <option >Barbados</option>
                <option >Belarus</option>
                <option >Belgium</option>
                <option >Belize</option>
                <option >Benin</option>
                <option >Bermuda</option>
                <option >Bhutan</option>
                <option >Bolivia</option>
                <option >Bosnia and Herzegovina</option>
                <option >Botswana</option>
                <option >Bouvet Island</option>
                <option >Brazil</option>
                <option >British Antarctic Territory</option>
                <option >British Indian Ocean Territory</option>
                <option >British Sovereign Base Areas</option>
                <option >British Virgin Islands</option>
                <option >Brunei</option>
                <option >Bulgaria</option>
                <option >Burkina Faso</option>
                <option >Burundi</option>
                <option >Cambodia</option>
              </select>
            </div>

            <div className="col-lg-6 mb-4" >
            <label>Select Organization(optional) </label>  
             
             <select className="form-control ht-47 "  name = 'org_code'>
               <option value= '' >All Organization</option>
               {(org_list.length >0)? org_list.map((item,index)=>{

                  return     ( mystate.org_code == item.org_code)? 
                      <option key = {index} value={item.org_code} selected  >{item.name}</option> :
                      <option key = {index} value={item.org_code}  >{item.name}</option>
                      }) :''}
              </select>
            </div>

            <div className="col-lg-6 mb-2" >
              
                  <label>Phone <span className="requrd">*</span> <i className="fa fa-question-circle curser-tool" aria-hidden="true" data-toggle="tooltip" title="" data-placement="top" data-original-title="Please provide phone in format (eg: +44020 7473 3562)"></i> </label>
                  <input className="form-control ht-46" name ="Phone" type="number" 
                   value = {(mystate.Phone)? mystate.Phone : '' } onChange={handleChange} />
              </div>

             <div className="col-lg-6 mb-4" >
              <label>Agent Code *<span className="requrd">*</span></label>
              <input className="form-control ht-46" name="ag_code" type="text" readOnly = ''
               value = {(mystate.ag_code)? mystate.ag_code : '' }  />
            </div> 

            <div className="col-lg-6 mb-4" >
              <label>Email <span className="requrd">*</span></label>
              <input className="form-control ht-46" name="email" type="email"
                value = {(mystate.email)? mystate.email : '' }  onChange={handleChange}   />
            </div>

            <div className="col-lg-6 mb-4" >
              <label>Serial Number Prefix<span className="requrd">*</span></label>
              <input className="form-control ht-46" name="serial_no_prefix" type="text"
               maxlength="7"   value = {(mystate.serial_no_prefix)? mystate.serial_no_prefix : '' } 
               onChange={handleChange}   />
            </div>

            <div className="col-lg-6 mb-4" >
              <label>Address line 1 <span className="requrd">*</span></label>
              <input className="form-control ht-46" name="add_one" type="text" 
               value = {(mystate.add_one)? mystate.add_one : '' } 
               onChange={handleChange}   />
            </div>

            <div className="col-lg-6 mb-4" >
              <label>Serial Number Length<span className="requrd">*</span></label>
              <input className="form-control ht-46" name="serial_no_len" type="text" 
              maxlength="2" value = {(mystate.serial_no_len)? mystate.serial_no_len : '' }
              onChange={handleChange}   /> 
            </div>

            <div className="col-lg-6 mb-4" >
              <label>Address line 2</label>
              <input className="form-control ht-46" name="add_two" type="text"
               value = {(mystate.add_two)? mystate.add_two : '' }
               onChange={handleChange}   />
            </div>

            <div className="col-lg-6 mb-4" >
              <label>Debiting Account<span className="requrd">*</span></label>
              <input className="form-control ht-46" name="debit_ac" type="text" 
                value = {(mystate.debit_ac)? mystate.debit_ac : '' } 
                onChange={handleChange}   />
            </div>

            <div className="col-lg-6 mb-4" >
              <label>City<span className="requrd">*</span></label>
              <input className="form-control ht-46" name="city" type="text" 
               value = {(mystate.city)? mystate.city : '' }
               onChange={handleChange}   />
            </div>

             <div className="col-lg-6 mb-4" >
              <label>Area/Post code<span className="requrd">*</span></label>
              <input className="form-control ht-46" name="post_code" type="text" 
               value = {(mystate.post_code)? mystate.post_code : '' }
               onChange={handleChange}   />
            </div>
              
            <input name="agent_id" type="hidden" 
               value = {(mystate.ag_id)? mystate.ag_id : '' }  />
           
                  
            
            <div className="col-lg-6 mb-4" >
              <label>Merchant Identification Number<span className="requrd">*</span></label>
              <input className="form-control ht-46" placeholder="" type="text" readOnly value="abc61a98-0603-40be-9836-5df49b578c54" />
            </div>

        {(agt_per.length>0)? agt_per.map((item,index) =>{
              return <Check_box_malti item_name = {item.permission_name} id = {item.agent_per_id}  myselect = {item.permission_id}   key = {index} /> 
        }) : "" }

     
          <div className="col-lg-12 mt-4">
             <button type="sumit" className="btn btn-primary btn_veri1  mb-1">Update</button>
             <button type="reset" className="btn btn-secondary btn-reset  mb-1">Reset</button>
          </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<section className="organizationList pt-0">
    <div className="container card-sm">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="col-lg-12">
                <h1 className="sub-title mb-3">ATTACH AGENT/BRANCH DOCUMENTS</h1>
                <p>No documents have been attached</p>
              </div>
              <div className="col-lg-12">
                <button type="button" className="btn btn-primary btn_veri btn-icon-text" onClick={onOpenModal}><i class="fe fe-plus"></i> Attach Document</button>
              </div>
         </div>
       </div>
     </div>
   </section>

</main>

<Modal open={open} onClose={onCloseModal} center classNames={attech_document}>
<div class="modal-dialog exchange_list">
<form>
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Attach Agent/Branch Documents</h5>
       
      </div>
      <div className="modal-body">

     <div className="row">
            <div className="col-lg-12 mb-3">
              <label>Documents:</label>
              <select className="select-controler form-control">
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
             <input className="form-control ht-47" placeholder="" type="text" readonly="" value="Passport" />
             </div>
             <div className="col-lg-6 mb-3">
              <label>Issue Date:</label>
              <i className="fa fa-calendar-o right-mobile" aria-hidden="true"></i>
              <input className="form-control ht-47" placeholder="" type="date" />
            </div> 
            <div className="col-lg-6 mb-3">
              <label>ID No:</label>
              <input className="form-control ht-47" placeholder="" type="text" readonly="" />
            </div>
            <div className="col-lg-6 mb-3">
              <label>Expiry Date:</label>
              <i className="fa fa-calendar-o right-mobile" aria-hidden="true"></i>
              <input className="form-control ht-47" placeholder="" type="date" />
            </div> 
            <div className="col-lg-6 mb-3">
              <label>Issue Country:</label>
            <select  className="select-controler form-control">
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
              <input className="form-control ht-47" placeholder="" type="date" />
            </div> 
             <div className="col-lg-12 mb-2">
              <input className="form-control ht-47 pd-11" placeholder="" type="file"  />
            </div> 
           </div>
        </div>
       


        <div className="modal-footer">
          <button type="submit" className="btn btn-primary btn_veri1">Submit</button>
          <button type="button" className="btn btn-secondary btn-reset" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </form>
    </div>
      </Modal>
  <Footer /> 
  <ToastContainer  position="top-right"  />        
        </div>
    );
}

export default Edit_api_pay_centers;