import React,{useState,useEffect} from 'react';
import { Link,useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import Check_box_malti from './sub_com/Check_box_malti';
import { ToastContainer, toast } from 'react-toastify';

function Aaa_jk(){
  const history = useHistory(); 
const [countryList,setCountryList] = useState([]);
     
    const get_country_list = async () => 
        {
            let options = { headers:{"Content-type": "application/json" }};
            try{
            let response = await axios.get('/getCountryList',{},options);
                 console.log('=====get_country_list ====');   
                    console.log(response);  
                    setCountryList( response.data) ;
           // return   response.data;
        } catch(err){ console.error(err); toast.error('some errror'); return false;  }
    }  
  

    useEffect(() => {  get_country_list(); },[]); 

///////////////////////////////////////////////////////////

    const [agt_per, setAgt_per]  = useState([]);  
    const getData2 = async () => 
    {    let options = { headers:{"Content-type": "application/json" }};
         let formData   = {}; 
         try{
        let response = await axios.post('/get_agent_permission',formData,options );
          setAgt_per(response.data);
      } catch(err){ console.error(err); toast.error('some errror'); return false;  }
   }  
   useEffect(() =>{ getData2();  },[]);
  

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
        let response = await axios.post('/agent_add_second',formdata,options1);
          
        if(response.data.status)
        {  //setOpen(false);
           toast.success( response.data.msg);
          //  setTimeout(() => {
            history.push('/manage_partner_centers');
          // },2000);  
          }else{
            toast.error( response.data.msg);
          }
     } catch(error) {
        console.log(error)
      }
    
      return false; 
  }
const [con_list, setCon_list] = useState([]); 
const addCountry = (e) =>{
        let name = document.getElementsByClassName('Scoun')[0].value;
     // let name = e.target.value;
        //  let arr =  con_list;
        //  arr.push(name);
        if(!con_list.includes(name)){
        setCon_list([...con_list,name]);
        }

      }
console.log('========con_list=============');
console.log(con_list);
const remo_country_item = (myItem)=>{
  
  let sum =    con_list.filter(function(item) { 
                         return item !== myItem });
     setCon_list(sum);
}

const ag_ids =  sessionStorage.getItem("agent_id");



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
            
            <div className="col-lg-12">
              <h1 className="sub-title">DELEGATE TRANSACTION CONFIRMATION</h1>
            </div>

            <div className="col-lg-6 mb-4">
              <label>Set auto-confirm transactions</label>
              <select className="select-controler form-control Scoun" >
             
                { (countryList.length >0)? countryList.map((item,index)=>{
                     return<option value ={ item.code} key = {index} >{item.code}</option>
                }) : ""}
              </select>
            </div>
            <div className="col-lg-4 top-6 mb-4 ">
              <button type="button" className="btn w-100 btn-shows mt-2" onClick={addCountry}>Add currency</button>
            </div>
            <div className="col-lg-8 mb-4">
              <div className="table-responsive">
                <table className="table text-center table-bordered border-t0 key-buttons text-nowrap w-100">
                  <thead>
                    <th>Currency</th>
                    <th>Maximum Auto-confirm Amount</th>
                    <th>Action</th>
                  </thead>
                  <tbody className="emtyp">
                  
                 { (con_list.length >0)? con_list.map((item,index)=>{
                     return <tr className="currency_add" key={ index}>
                      <td>{item}
                          <input type ='hidden' name= "country_names[]" multiple value={item} />
                      </td>
                      <td><input type="text" name="curr[]" multiple className="form-control" /></td>
                      <td> <button onClick={ (e)=>{ remo_country_item(item);}}>Remove</button> </td>
                   
                    </tr>}) : ''}
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
                      <input className="coupon_question" name = 'admin_add' type="checkbox" value="1" />
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
                <input className="form-control ht-46" name="Fname" type="text"    />
              </div>

              <div className="col-lg-4 mb-4" >
                <label>Last Name <span className="requrd">*</span></label>
                <input className="form-control ht-46" name="Lname" type="text"   />
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
        
{(agt_per.length>0)? agt_per.map((item,index) =>{
              return <Check_box_malti item_name = {item.permission_name} id = {item.agent_per_id}  myselect = {item.permission_id}   key = {index} /> 
        }) : "" }


            </div>
         <div className="col-lg-12 mt-4">
                <input type='hidden' name = 'aget_ids' value ={ag_ids} />
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

export default Aaa_jk;
