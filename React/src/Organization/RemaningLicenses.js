import React,{useRef,useState} from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import axios from "axios";
import  Jwt  from "jsonwebtoken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

function RemaningLicenses() {
    const [Paymentprocess,setPaymentprocess]=useState(false)
    const [licsenapply,setlicsenapply]=useState(false)
    const focusPoint = useRef(null);
    const addactive = ()=>{

        focusPoint.current.classList.toggle("processactive");
    }
    const focusPointpayment = useRef(null);
    const addactivepayment = ()=>{

        focusPoint.current.classList.toggle("processactivepayment");
    }


const currentFont = localStorage.getItem('liesenapply');
console.log("lllllllllll",currentFont);
    let token = localStorage.getItem('token')
    var decode1 = Jwt.decode(token);
    let orgID = decode1.OrganisationID
    // let agentID = decode1.agentID
    console.log(orgID)

    const AddFormData = async(e)=>{
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        const formData =Formvlaues;

        axios.post(`/applyUpdateLicenses/${orgID}`,formData)
        .then(resp=>{
            if(resp.status){
                let data = resp.data
               if(data.status){
                toast.success(data.msg);
                addactive();
                // setlicsenapply(true);
                localStorage.setItem("liesenapply","true");
               }else{
                toast.error(data.msg)
               }
            }else{
                toast.error(data.msg)
            }
            
        })
    }

// seconded api call



const Paymentprocessbank = async () =>{
    await axios.get(`/LicenseProcess/${orgID}`)
    .then(resp =>{
        let data =resp.data.status;
        setPaymentprocess(data);
        console.log("+++++++++++++++++++",data);
       
    })

}
useEffect(() => {
    Paymentprocessbank();
if(currentFont){
    addactive();  
} 

}, [])
useEffect(() => {

if(Paymentprocess){
    addactivepayment() 
} 

}, [Paymentprocess])

console.log("jjjjjjjjjjjjjjjjjjj",Paymentprocess);

  return (
    <>
    <div>
    
        <Sidebar/>
        <Header/>
 
     
      
        <ToastContainer />
        <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="container-xxl" id="kt_content_container">
                <div className="row g-5 g-xl-8">
                    <div className="col-lg-12">
                        <div className="card mb-5 mb-xl-10">
                            <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                                <div className="card-title m-0">
                                    <h3 className="fw-bold m-0">Add License</h3>
                                </div>
                            </div>
                            <div id="kt_account_settings_profile_details" className="collapse show">
                                <form onSubmit={(e)=>AddFormData(e)} id="kt_account_profile_details_form" className="form" >
                                    <div className="card-body border-top p-9">
                                       


                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">License</label>
                                            <div className="col-lg-6 fv-row">
                                                <input type="text" name="Licenses"  className="form-control form-control-lg form-control-solid" placeholder="License" />
                                            </div>
                                            <div className="col-lg-2 fv-row">
                                            <button type="submit"
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="send request for update Licence">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        {/* <i className="fad fa-eye fs-4"></i> */}
                                                                        <i className="fas fa-edit fs-4"></i>
                                                                    </span>

                                                                </button>
                                            </div>
                                        </div>
                                       
                                       
                                        
                                        
                                        
                                       

                                    </div>
                                    {/* <div className="card-footer d-flex justify-content-end py-6 px-9">
                                        <button  type="submit" className="btn btn-light btn-sub me-2">Submit</button>
                                       
                                    </div> */}
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-12">
                                <div className="card mb-5 mb-xxl-8">

                                    <div className="card-header align-items-center border-0 mt-4">
                                        <h3 className="card-title align-items-start flex-column">
                                            <span className="fw-bold mb-2 text-dark">Licenses Update Process</span>
                                            <span className="text-muted fw-semibold fs-7">4,500 Transaction</span>
                                        </h3>
                                        <div className="card-toolbar">

                                            <button type="button" className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">

                                                <span className="svg-icon svg-icon-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                            <rect x="5" y="5" width="5" height="5" rx="1" fill="currentColor" />
                                                            <rect x="14" y="5" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" />
                                                            <rect x="5" y="14" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" />
                                                            <rect x="14" y="14" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" />
                                                        </g>
                                                    </svg>
                                                </span>

                                            </button>

                                            <div className="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-kt-menu="true" id="kt_menu_62d4f2ee25eea">

                                                <div className="px-7 py-5">
                                                    <div className="fs-5 text-dark fw-bold">Filter Options</div>
                                                </div>


                                                <div className="separator border-gray-200"></div>

                                                {/* <!--begin::Form--> */}
                                                <div className="px-7 py-5">

                                                    <div className="mb-10">

                                                        <label className="form-label fw-semibold">Status:</label>

                                                        {/* <!--begin::Input--> */}
                                                        <div>
                                                            <select className="form-select form-select-solid" data-kt-select2="true" data-placeholder="Select option" data-dropdown-parent="#kt_menu_62d4f2ee25eea" data-allow-clear="true">
                                                                <option></option>
                                                                <option value="1">withdraw</option>
                                                                <option value="2">Pending</option>
                                                                <option value="2">In Process</option>
                                                                <option value="2">Deposit</option>
                                                            </select>
                                                        </div>

                                                    </div>

                                                    <div className="mb-10">

                                                        <label className="form-label fw-semibold">Notifications:</label>


                                                        <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                                            <input className="form-check-input" type="checkbox" value="" name="notifications" checked="checked" />
                                                            <label className="form-check-label">Enabled</label>
                                                        </div>

                                                    </div>


                                                    <div className="d-flex justify-content-end">
                                                        <button type="reset" className="btn btn-sm btn-light btn-active-light-primary me-2" data-kt-menu-dismiss="true">Reset</button>
                                                        <button type="submit" className="btn btn-sm btn-primary" data-kt-menu-dismiss="true">Apply</button>
                                                    </div>

                                                </div>

                                            </div>


                                        </div>
                                    </div>





                                    <div className="card-body pt-5" ref={focusPointpayment}>

                                        <div className="timeline-label" ref={focusPoint} >

                                            <div className="timeline-item" >

                                                <div className="timeline-label fw-bold text-gray-800 fs-6">08:42</div>


                                                <div className="timeline-badge" >
                                                    <i className="fa fa-genderless text-green fs-1"></i>
                                                </div>


                                                <div className="fw-mormal timeline-content text-green ps-3">Sending Requent</div>

                                            </div>


                                        

                                            <div className="timeline-item" >

                                                <div className="timeline-label fw-bold text-gray-800 fs-6">14:37</div>


                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-primary fs-1"></i>
                                                </div>


                                                <div className="timeline-content fw-bold text-gray-800 ps-3">Request Send
                                                    <a href="#" className="text-primary"></a></div>

                                            </div>


                                         






                                            <div className="timeline-item">

                                                <div className="timeline-label fw-bold text-gray-800 fs-6">15:03</div>


                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-primary fs-1"></i>
                                                </div>


                                                <div className="timeline-content fw-semibold text-gray-800 ps-3">Recired By Admin
                                                    <a href="#" className="text-primary"> </a></div>

                                            </div>


                                            <div className="timeline-item">

                                                <div className="timeline-label fw-bold text-gray-800 fs-6">16:50</div>


                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-green fs-1"></i>
                                                </div>


                                                <div className="timeline-content fw-mormal text-green ps-3">In Projress</div>

                                            </div>


                                            <div className="timeline-item">

                                                <div className="timeline-label fw-bold text-gray-800 fs-6">21:03</div>


                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-primary fs-1"></i>
                                                </div>


                                                <div className="timeline-content fw-semibold text-gray-800 ps-3">Licesss Added Sucessfully
                                                    <a href="#" className="text-primary"></a></div>

                                            </div>



{Paymentprocess?
                          <div>
                          <div className="alert alert-success" role="alert">
Your Remaning License successfully Update
</div></div>:""
}

                  

                                        </div>

                                    </div>

                                </div>
                            </div>
                
            </div>
            

        </div>
        </div>
    </div>
     







     {/* added new progess bar  */}


     
    </>
  )
}

export default RemaningLicenses