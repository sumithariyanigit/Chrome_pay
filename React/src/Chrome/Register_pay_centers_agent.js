import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'

function Register_pay_centers_agent() {

  const history = useHistory()

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

  const md_form = async (e)=>{
    e.preventDefault() ;

    let formdata = new FormData(document.querySelector("#mdF"));
   
      console.log('md_form');
      
      console.log(formdata);
      try {
        
        let options1 = { headers:{"Content-type": "application/json" }};
        let response = await axios.post('/addAgent',formdata,options1);
        
        if(response.data.status)
        {  //setOpen(false);
          sessionStorage.setItem("agent_id", response.data.body);
          toast.success( response.data.msg);
          history.push('/Aaa_jk'); 
          }else{
            toast.error( response.data.msg);
          }
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
      <div className="row text-center">
        <div className="col-lg-12 d-flex flex-column justify-content-center">
          <h1 className=''><span><b> Partners / Agents <br /> Branches</b></span></h1>
          <p></p>
        </div>
      </div>
      <div className="row">
        <div className="path2">
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
          <h5 className="mb-2">Register Agent/Branch</h5>
          <p>Provide details of the Agent you wish to register.</p>
        </div>
        <form onSubmit={(e)=>md_form(e)} encType= 'multipart/form-data' id = 'mdF'   >
          <div className="row">

            <div className="col-lg-6 mb-4" >
              <label>Agent Name <span className="requrd">*</span></label>
              <input className="form-control ht-46" name = 'name' type="search"  />
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
                       return<option key = {index} value={item.org_code}>{item.name}</option>}) :''}
              </select>
            </div>

            <div className="col-lg-6 mb-2" >
              <div className="row">
                <div className="col-lg-4 mb-4">
                  <label>Country Dialing Code</label>
                  <select className="select-controler form-control" name = 'dialing_code' >
                    <option value="DZ">Algeria (+213) </option>
                    <option value="AD">Andorra (+376) </option>
                    <option value="AO">Angola (+244) </option>
                    <option value="AI">Anguilla (+1264) </option>
                    <option value="AG">Antigua &amp; Barbuda (+1268) </option>
                    <option value="AR">Argentina (+54) </option>
                    <option value="AM">Armenia (+374) </option>
                    <option value="AW">Aruba (+297) </option>
                    <option value="AU">Australia (+61) </option>
                    <option value="AT">Austria (+43) </option>
                    <option value="AZ">Azerbaijan (+994) </option>
                    <option value="BS">Bahamas (+1242) </option>
                    <option value="BH">Bahrain (+973) </option>
                    <option value="BD">Bangladesh (+880) </option>
                    <option value="BB">Barbados (+1246) </option>
                    <option value="BY">Belarus (+375) </option>
                    <option value="BE">Belgium (+32) </option>
                    <option value="BZ">Belize (+501) </option>
                    <option value="BJ">Benin (+229) </option>
                    <option value="BM">Bermuda (+1441) </option>
                    <option value="BT">Bhutan (+975) </option>
                    <option value="BO">Bolivia (+591) </option>
                    <option value="BA">Bosnia Herzegovina (+387) </option>
                    <option value="BW">Botswana (+267) </option>
                    <option value="BR">Brazil (+55) </option>
                    <option value="BN">Brunei (+673) </option>
                    <option value="BG">Bulgaria (+359) </option>
                    <option value="BF">Burkina Faso (+226) </option>
                    <option value="BI">Burundi (+257) </option>
                    <option value="KH">Cambodia (+855) </option>
                    <option value="CM">Cameroon (+237) </option>
                    <option value="CA">Canada (+1) </option>
                    <option value="CV">Cape Verde Islands (+238) </option>
                    <option value="KY">Cayman Islands (+1345) </option>
                    <option value="CF">Central African Republic (+236) </option>
                    <option value="CL">Chile (+56) </option>
                    <option value="CN">China (+86) </option>
                    <option value="CO">Colombia (+57) </option>
                    <option value="KM">Comoros (+269) </option>
                    <option value="CG">Congo (+242) </option>
                    <option value="CK">Cook Islands (+682) </option>
                    <option value="CR">Costa Rica (+506) </option>
                    <option value="HR">Croatia (+385) </option>
                    <option value="CU">Cuba (+53) </option>
                    <option value="CY">Cyprus North (+90392) </option>
                    <option value="CY">Cyprus South (+357) </option>
                    <option value="CZ">Czech Republic (+42) </option>
                    <option value="DK">Denmark (+45) </option>
                    <option value="DJ">Djibouti (+253) </option>
                    <option value="DM">Dominica (+1809) </option>
                    <option value="DO">Dominican Republic (+1809) </option>
                    <option value="EC">Ecuador (+593) </option>
                    <option value="EG">Egypt (+20) </option>
                    <option value="SV">El Salvador (+503) </option>
                    <option value="GQ">Equatorial Guinea (+240) </option>
                    <option value="ER">Eritrea (+291) </option>
                    <option value="EE">Estonia (+372) </option>
                    <option value="ET">Ethiopia (+251) </option>
                    <option value="FK">Falkland Islands (+500) </option>
                    <option value="FO">Faroe Islands (+298) </option>
                    <option value="FJ">Fiji (+679) </option>
                    <option value="FI">Finland (+358) </option>
                    <option value="FR">France (+33) </option>
                    <option value="GF">French Guiana (+594) </option>
                    <option value="PF">French Polynesia (+689) </option>
                    <option value="GA">Gabon (+241) </option>
                    <option value="GM">Gambia (+220) </option>
                    <option value="GE">Georgia (+995) </option>
                    <option value="DE">Germany (+49) </option>
                    <option value="GH">Ghana (+233) </option>
                    <option value="GI">Gibraltar (+350) </option>
                    <option value="GR">Greece (+30) </option>
                    <option value="GL">Greenland (+299) </option>
                    <option value="GD">Grenada (+1473) </option>
                    <option value="GP">Guadeloupe (+590) </option>
                    <option value="GU">Guam (+671) </option>
                    <option value="GT">Guatemala (+502) </option>
                    <option value="GN">Guinea (+224) </option>
                    <option value="GW">Guinea - Bissau (+245) </option>
                    <option value="GY">Guyana (+592) </option>
                    <option value="HT">Haiti (+509) </option>
                    <option value="HN">Honduras (+504) </option>
                    <option value="HK">Hong Kong (+852) </option>
                    <option value="HU">Hungary (+36) </option>
                    <option value="IS">Iceland (+354) </option>
                    <option value="IN" selected="selected">India (+91) </option>
                    <option value="ID">Indonesia (+62) </option>
                    <option value="IR">Iran (+98) </option>
                    <option value="IQ">Iraq (+964) </option>
                    <option value="IE">Ireland (+353) </option>
                    <option value="IL">Israel (+972) </option>
                    <option value="IT">Italy (+39) </option>
                    <option value="JM">Jamaica (+1876) </option>
                    <option value="JP">Japan (+81) </option>
                    <option value="JO">Jordan (+962) </option>
                    <option value="KZ">Kazakhstan (+7) </option>
                    <option value="KE">Kenya (+254) </option>
                    <option value="KI">Kiribati (+686) </option>
                    <option value="KP">Korea North (+850) </option>
                    <option value="KR">Korea South (+82) </option>
                    <option value="KW">Kuwait (+965) </option>
                    <option value="KG">Kyrgyzstan (+996) </option>
                    <option value="LA">Laos (+856) </option>
                    <option value="LV">Latvia (+371) </option>
                    <option value="LB">Lebanon (+961) </option>
                    <option value="LS">Lesotho (+266) </option>
                    <option value="LR">Liberia (+231) </option>
                    <option value="LY">Libya (+218) </option>
                    <option value="LI">Liechtenstein (+417) </option>
                    <option value="LT">Lithuania (+370) </option>
                    <option value="LU">Luxembourg (+352) </option>
                    <option value="MO">Macao (+853) </option>
                    <option value="MK">Macedonia (+389) </option>
                    <option value="MG">Madagascar (+261) </option>
                    <option value="MW">Malawi (+265) </option>
                    <option value="MY">Malaysia (+60) </option>
                    <option value="MV">Maldives (+960) </option>
                    <option value="ML">Mali (+223) </option>
                    <option value="MT">Malta (+356) </option>
                    <option value="MH">Marshall Islands (+692) </option>
                    <option value="MQ">Martinique (+596) </option>
                    <option value="MR">Mauritania (+222) </option>
                    <option value="YT">Mayotte (+269) </option>
                    <option value="MX">Mexico (+52) </option>
                    <option value="FM">Micronesia (+691) </option>
                    <option value="MD">Moldova (+373) </option>
                    <option value="MC">Monaco (+377) </option>
                    <option value="MN">Mongolia (+976) </option>
                    <option value="MS">Montserrat (+1664) </option>
                    <option value="MA">Morocco (+212) </option>
                    <option value="MZ">Mozambique (+258) </option>
                    <option value="MN">Myanmar (+95) </option>
                    <option value="NA">Namibia (+264) </option>
                    <option value="NR">Nauru (+674) </option>
                    <option value="NP">Nepal (+977) </option>
                    <option value="NL">Netherlands (+31) </option>
                    <option value="NC">New Caledonia (+687) </option>
                    <option value="NZ">New Zealand (+64) </option>
                    <option value="NI">Nicaragua (+505) </option>
                    <option value="NE">Niger (+227) </option>
                    <option value="NG">Nigeria (+234) </option>
                    <option value="NU">Niue (+683) </option>
                    <option value="NF">Norfolk Islands (+672) </option>
                    <option value="NP">Northern Marianas (+670) </option>
                    <option value="NO">Norway (+47) </option>
                    <option value="OM">Oman (+968) </option>
                    <option value="PW">Palau (+680) </option>
                    <option value="PA">Panama (+507) </option>
                    <option value="PG">Papua New Guinea (+675) </option>
                    <option value="PY">Paraguay (+595) </option>
                    <option value="PE">Peru (+51) </option>
                    <option value="PH">Philippines (+63) </option>
                    <option value="PL">Poland (+48) </option>
                    <option value="PT">Portugal (+351) </option>
                    <option value="PR">Puerto Rico (+1787) </option>
                    <option value="QA">Qatar (+974) </option>
                    <option value="RE">Reunion (+262) </option>
                    <option value="RO">Romania (+40) </option>
                    <option value="RU">Russia (+7) </option>
                    <option value="RW">Rwanda (+250) </option>
                    <option value="SM">San Marino (+378) </option>
                    <option value="ST">Sao Tome &amp; Principe (+239) </option>
                    <option value="SA">Saudi Arabia (+966) </option>
                    <option value="SN">Senegal (+221) </option>
                    <option value="CS">Serbia (+381) </option>
                    <option value="SC">Seychelles (+248) </option>
                    <option value="SL">Sierra Leone (+232) </option>
                    <option value="SG">Singapore (+65) </option>
                    <option value="SK">Slovak Republic (+421) </option>
                    <option value="SI">Slovenia (+386) </option>
                    <option value="SB">Solomon Islands (+677) </option>
                    <option value="SO">Somalia (+252) </option>
                    <option value="ZA">South Africa (+27) </option>
                    <option value="ES">Spain (+34) </option>
                    <option value="LK">Sri Lanka (+94) </option>
                    <option value="SH">St. Helena (+290) </option>
                    <option value="KN">St. Kitts (+1869) </option>
                    <option value="SC">St. Lucia (+1758) </option>
                    <option value="SD">Sudan (+249) </option>
                    <option value="SR">Suriname (+597) </option>
                    <option value="SZ">Swaziland (+268) </option>
                    <option value="SE">Sweden (+46) </option>
                    <option value="CH">Switzerland (+41) </option>
                    <option value="SI">Syria (+963) </option>
                    <option value="TW">Taiwan (+886) </option>
                    <option value="TJ">Tajikstan (+7) </option>
                    <option value="TH">Thailand (+66) </option>
                    <option value="TG">Togo (+228) </option>
                    <option value="TO">Tonga (+676) </option>
                    <option value="TT">Trinidad &amp; Tobago (+1868) </option>
                    <option value="TN">Tunisia (+216) </option>
                    <option value="TR">Turkey (+90) </option>
                    <option value="TM">Turkmenistan (+7) </option>
                    <option value="TM">Turkmenistan (+993) </option>
                    <option value="TC">Turks &amp; Caicos Islands (+1649) </option>
                    <option value="TV">Tuvalu (+688) </option>
                    <option value="UG">Uganda (+256) </option>
                    <option value="GB">UK (+44) </option>
                    <option value="UA">Ukraine (+380) </option>
                    <option value="AE">United Arab Emirates (+971) </option>
                    <option value="UY">Uruguay (+598) </option>
                    <option value="US">USA (+1) </option>
                    <option value="UZ">Uzbekistan (+7) </option>
                    <option value="VU">Vanuatu (+678) </option>
                    <option value="VA">Vatican City (+379) </option>
                    <option value="VE">Venezuela (+58) </option>
                    <option value="VN">Vietnam (+84) </option>
                    <option value="VG">Virgin Islands - British (+1284) </option>
                    <option value="VI">Virgin Islands - US (+1340) </option>
                    <option value="WF">Wallis &amp; Futuna (+681) </option>
                    <option value="YE">Yemen (North)(+969) </option>
                    <option value="YE">Yemen (South)(+967) </option>
                    <option value="ZM">Zambia (+260) </option>
                    <option value="ZW">Zimbabwe (+263) </option>
                  </select>
                </div>
                <div className="col-lg-8 mb-4">
                  <label>Phone <span className="requrd">*</span> <i className="fa fa-question-circle curser-tool" aria-hidden="true" data-toggle="tooltip" title="" data-placement="top" data-original-title="Please provide phone in format (eg: +44020 7473 3562)"></i> </label>
                  <input className="form-control ht-46" name ="Phone" type="number"  />
                </div>
              </div>
            </div>

            {/* <div className="col-lg-6 mb-4" >
              <label>Agent Code *<span className="requrd">*</span></label>
              <input className="form-control ht-46" name="ag_code" type="text"    />
            </div> */}

            <div className="col-lg-6 mb-4" >
              <label>Email <span className="requrd">*</span></label>
              <input className="form-control ht-46" name="email" type="email" />
            </div>

            <div className="col-lg-6 mb-4" >
              <label>Serial Number Prefix<span className="requrd">*</span></label>
              <input className="form-control ht-46" name="serial_no_prefix" type="text" maxlength="7" />
            </div>

            <div className="col-lg-6 mb-4" >
              <label>Address line 1 <span className="requrd">*</span></label>
              <input className="form-control ht-46" name="add_one" type="text"   />
            </div>

            <div className="col-lg-6 mb-4" >
              <label>Serial Number Length<span className="requrd">*</span></label>
              <input className="form-control ht-46" name="serial_no_len" type="text" maxlength="2" /> 
            </div>

            <div className="col-lg-6 mb-4" >
              <label>Address line 2</label>
              <input className="form-control ht-46" name="add_two" type="text" />
            </div>

            <div className="col-lg-6 mb-4" >
              <label>Debiting Account<span className="requrd">*</span></label>
              <input className="form-control ht-46" name="debit_ac" type="text"  />
            </div>

            <div className="col-lg-6 mb-4" >
              <label>City<span className="requrd">*</span></label>
              <input className="form-control ht-46" name="city" type="text"  />
            </div>

             <div className="col-lg-6 mb-4" >
              <label>Area/Post code<span className="requrd">*</span></label>
              <input className="form-control ht-46" name="post_code" type="text"  />
            </div>



            <div className="col-lg-12">
              <h1 className="sub-title">DELEGATE TRANSACTION CONFIRMATION</h1>
            </div>

            <div className="col-lg-6 mb-4">
              <label>Set auto-confirm transactions</label>
              <select className="select-controler form-control" >
                <option >NGN</option>
              </select>
            </div>
            <div className="col-lg-4 top-6 mb-4 ">
              <button type="button" className="btn w-100 btn-shows mt-2">Add currency</button>
            </div>
            <div className="col-lg-8 mb-4">
              <div className="table-responsive">
                <table className="table text-center table-bordered border-t0 key-buttons text-nowrap w-100">
                  <thead>
                    <th>Currency</th>
                    <th>Maximum Auto-confirm Amount</th>
                  </thead>
                  <tbody className="emtyp">
                    <tr className="currency_add">
                      <td>NGN</td>
                      <td><input type="number" name="" className="form-control" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-lg-6 email-settings">
              <div className="card-detail ">
                <div className="switch-toggle bg-white">
                  <label>
                    <h6>I want to assign an admin to this Agent</h6>
                    <div className="switch">
                      <input className="coupon_question" type="checkbox" value="1" />
                      <span className="slider round"></span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="row div_open">
              <div className="col-lg-12 mb-2">
                <h1 className="sub-title">AGENT/BRANCH ADMIN CREDENTIALS</h1>
              </div>


              <div className="col-lg-4 mb-4" >
                <label>First Name <span className="requrd">*</span></label>
                <input className="form-control ht-46" placeholder="" type="text"    />
              </div>

              <div className="col-lg-4 mb-4" >
                <label>Last Name <span className="requrd">*</span></label>
                <input className="form-control ht-46" placeholder="" type="text"   />
              </div>

              <div className="col-lg-4 mb-4" >
                <label>Staff ID <span className="requrd">*</span></label>
                <input className="form-control ht-46" placeholder="" type="text"    />
              </div>

            </div>

            <div className="col-lg-12 mb-2">
              <h1 className="sub-title">AGENT/BRANCH PERMISSION</h1>
            </div>
            <div className="row email-settings">
             <div className="col-lg-6">
             <div className="card-customer bg-white">
                 <div className="label-text" style={{'width' : '60%' }}>Bureau De Change Enabled<span className="requrd">*</span></div>
                  <div className="d-flex">
                   <label className="coustom_radio mr-3">
                    <input type="radio" name="radio"/>
                    <span>True</span>
                  </label>  

                  <label className="coustom_radio">
                    <input type="radio" name="radio" checked/>
                    <span>False</span>
                  </label>
                  </div>
                </div>                                
                </div>

              <div className="col-lg-6">
                <div className="card-detail">
                  <div className="switch-toggle bg-white">
                    <label>
                      <h6> Is this Agent/branch allowed to act as a payment deposit point?</h6>
                      <div className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card-detail">
                  <div className="switch-toggle bg-white">
                    <label>
                      <h6> Is this Agent allowed to create a Sub Agent/Branches Network?</h6>
                      <div className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

               <div className="col-lg-6">
                <div className="card-detail">
                  <div className="switch-toggle bg-white">
                    <label>
                      <h6>  Is this Agent allowed to perform pay-out?</h6>
                      <div className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                      </div>
                    </label>
                  </div>
                </div>
              </div> 

               <div className="col-lg-6">
                <div className="card-detail">
                  <div className="switch-toggle bg-white">
                    <label>
                      <h6>  Set if Agent can cancel a transaction.</h6>
                      <div className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>   
              <div className="col-lg-6">
                <div className="card-detail">
                  <div className="switch-toggle bg-white">
                    <label>
                      <h6>Agent Admin must approve each transaction by Cashier/Teller (Maker Checker)</h6>
                      <div className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
                 <div className="col-lg-6">
                <div className="card-detail">
                  <div className="switch-toggle bg-white">
                    <label>
                      <h6>I want all Cashiers/Tellers to be forwarded to me for approval.</h6>
                      <div className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                      </div>
                    </label>
                  </div>
                </div>
              </div> 

            </div>
         <div className="col-lg-12 mt-4">
                        <button type="sumit" className="btn btn-primary btn_veri1  mb-1">Register</button>
                        <button type="reset" className="btn btn-secondary btn-reset  mb-1">Reset</button>
                      </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
</main>
    <Footer />
    <ToastContainer position = "top-right"  />        
 </div>
);
}

export default Register_pay_centers_agent;
