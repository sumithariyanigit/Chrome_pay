import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Jwt  from "jsonwebtoken";


function AdminSetting() {

    let token = localStorage.getItem('token')
    var decode1 = Jwt.decode(token);
    let adminID = decode1.admminID
    console.log(adminID)

     const [data, setData]= useState('')
     const [orgnization, setDataOID]= useState('')
     const [orgmenu, setOrgMenu] = useState([]);
     const AddFormData = async (e) =>{

        
        
        
       
         e.preventDefault();
         const data = new FormData(e.target);
         const Formvlaues = Object.fromEntries(data.entries());
         const foemData = Formvlaues;
         console.log(Formvlaues);

        axios.put(`/updatelimits/${adminID}`,foemData)
        .then(res =>{
            let data =res.data;
            setData(data);
            console.log(data)
            if(res.status){
            let data =res.data;
                if(data.status){
                    toast.success(data.msg)
                   
                }else{
                    toast.error(data.msg)
                  }
                 
            }
            else{
                toast.error(data.msg)
            }
        })


     }

     const subAdminlist = async () =>{
        await axios.post(`/subAdminRole/${adminID}`)
        .then(resp=>{
            let data = resp.data.find
            // console.log('@@@@@',data.customer.addCustomer)
            // setMenu(data.customer);
            setOrgMenu(data.Organisation)
            // setAgent(data.Agent)
            // setIP(data.IP)
        })

    }



    useEffect(() => {
        subAdminlist();
    }, [])


  return (
    <>
    <ToastContainer  position="top-right"  />
    <Sidebar />
        <Header />
        <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="container-xxl" id="kt_content_container">
                <div className="row g-5 g-xl-8">
                    <div className="col-lg-12">
                        <div className="card mb-5 mb-xl-10">
                            <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                                <div className="card-title m-0">
                                    <h3 className="fw-bold m-0">Block Limit</h3>
                                </div>
                            </div>
                            <div id="kt_account_settings_profile_details" className="collapse show">
                            <form onSubmit={(e) => AddFormData(e)} id="kt_account_profile_details_form" className="form" >
                                    <div className="card-body border-top p-9">
                                        

                                        <div className="row mb-8">
                                        <div className="mb-6">
                                          <h6 className="required fw-semibold fs-6">Password Limit</h6>
                                        </div>
                                           
                                            <div className="col-lg-4 mb-6">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label  fw-semibold fs-6">Admin Limit</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="AdminPassword" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="5 "  />
                                                    </div>
                                                </div>
                                            </div>
                                            {orgmenu.setOrgPasswordLimit == 1 ? <><div className="col-lg-4 mb-6">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label  fw-semibold fs-6">Organization Limit</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="orgPassword" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="5 "  />
                                                    </div>
                                                </div>
                                            </div></>:"" }
                                            
                                            
                                            <div className="col-lg-4 mb-6">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label  fw-semibold fs-6">Agent Limit</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="agentPassword" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="5 "  />
                                                    </div>
                                                </div>
                                            </div>
                                           
                                            
                                        
                                            
                                            
                                        <div className="mb-6">
                                          <h6 className="required fw-semibold fs-6">OTP Limit</h6>
                                        </div>
                                        <div className="col-lg-4 mb-6">
                                                <div className="row ">
                                                    <label className="col-lg-4 col-form-label fw-semibold fs-6">Admin Limit</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="AdminOTP"  className="form-control form-control-lg form-control-solid" placeholder="5" />
                                                    </div>
                                                </div>
                                           </div>
                                   {orgmenu.setOrgOptLimit == 1 ?<><div className="col-lg-4 mb-6">
                                                <div className="row ">
                                                    <label className="col-lg-4 col-form-label fw-semibold fs-6">Orgnization Limit</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="orgOTP"  className="form-control form-control-lg form-control-solid" placeholder="5" />
                                                    </div>
                                                </div>
                                           </div></>:""}
                                           

                                           <div className="col-lg-4 mb-6">
                                                <div className="row ">
                                                    <label className="col-lg-4 col-form-label fw-semibold fs-6">Agent Limit</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="agentOTP"  className="form-control form-control-lg form-control-solid" placeholder="5" />
                                                    </div>
                                                </div>
                                           </div>


                                        </div>
                                       
                                        

                                       
                                        
                                        
                                        
                                       


                                       
                                        
                                        

                                    </div>
                                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                                        <button type="submit" className="btn btn-light btn-active-light-primary me-2">Submit</button>
                                       
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        </div>
       </>
  )
}



export default AdminSetting