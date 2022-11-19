import React, { useState, useEffect} from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import axios from 'axios';
import Jwt from "jsonwebtoken"
import { toast, ToastContainer } from 'react-toastify';

function MyProfile() {
   const [data, setData] = useState([]);

   let token = localStorage.getItem('token')
   var decode1 = Jwt.decode(token);
  
   let adminID = decode1.admminID
   console.log(adminID)
   
   const UpdateFormData = async (e) =>{
    e.preventDefault();

    

    const data = new FormData(e.target)
    const FormValues = Object.fromEntries(data.entries());
    const formData = FormValues
    console.log(FormValues);

    axios.post(`/adminProfileUpdate/${adminID}`,formData)
    .then(resp =>{
        if(resp.status){
            let data = resp.data
            if(data.status){
                toast.success(data.msg);
                setData(data);
                console.log(data);
            }else{
                toast.error(data.msg);
            }
        }else{
            toast.error(data.msg)
        }
    })

   }


   const userlist = async () => {
    await axios.get(`/adminProfile/${adminID}`)
    .then(resp=>{
        const data =resp.data.data
        setData(data)
        console.log(data)
    })
   }
   useEffect(() => {
    userlist(); 

   }, [])
   

  return (
    <div>
        <ToastContainer />
        <Header />
        <Sidebar />
        <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="container-xxl" id="kt_content_container">
                <div className="row g-5 g-xl-8">
                    <div className="col-lg-12">
                        <div className="card mb-5 mb-xl-10">
                            <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                                <div className="card-title m-0">
                                    <h3 className="fw-bold m-0">My Prrofile</h3>
                                </div>
                            </div>
                            <div id="kt_account_settings_profile_details" className="collapse show">
                                <form onSubmit={(e) => UpdateFormData(e)} id="kt_account_profile_details_form" className="form" >
                                    <div className="card-body border-top p-9">
                                        <div className="row mb-6 justify-content-center">
                                       
                                         <div className="col-lg-9">
                                         <div className='row mb-6'>
                                        
                                           
                                           <div className="col-lg-6 fv-row mb-6">
                                               <label className="col-form-label required fw-semibold fs-6">First Name</label>
                                               <input type="text" name="Firstname" defaultValue={data.Firstname} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Full Name"  />
                                           </div>
                                           <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">Last Name </label>
                                                <input type="text" name="lastName" defaultValue={data.lastName}  className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Last Name" />
                                            </div>
                                            <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">Email </label>
                                                <input type="email" name="email" defaultValue={data.email}  className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Email Address" />
                                            </div>
                                            <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">Password </label>
                                                <input type="password" name="password" defaultValue={data.password} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Password" />
                                            </div>
                                            <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">Phone</label>
                                                <input type="number" name="phone" defaultValue={data.phone}  className="form-control form-control-lg form-control-solid fs-6 mb-lg-0" placeholder="Phone" />
                                            </div>
                                            <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">Addres</label>
                                                <input type="text" name="address" defaultValue={data.address}  className="form-control form-control-lg form-control-solid fs-6 mb-lg-0" placeholder="Addres" />
                                            </div>
                                            <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">Country</label>
                                                <input type="text" name="country" defaultValue={data.country}  className="form-control form-control-lg form-control-solid fs-6 mb-lg-0" placeholder="Country" />
                                            </div>
                                            <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">State</label>
                                                <input type="text" name="state" defaultValue={data.state}  className="form-control form-control-lg form-control-solid fs-6 mb-lg-0" placeholder="State" />
                                            </div>
                                            <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">City</label>
                                                <input type="text" name="city" defaultValue={data.city}  className="form-control form-control-lg form-control-solid fs-6 mb-lg-0" placeholder="City" />
                                            </div>
                                            <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">Post Code</label>
                                                <input type="number" name="postCode" defaultValue={data.postCode}  className="form-control form-control-lg form-control-solid fs-6 mb-lg-0" placeholder="Post Code" />
                                            </div>
                                            

                                         </div>
                                        
                                         </div>
                                        
                                        </div>


                                        <div className="card-footer d-flex justify-content-end py-6 px-9">
                                           <button type="submit" className="btn btn-light btn-active-light-primary me-2" style={{backgroundColor:"#3c7f8c",color:"#fff"}}>Update</button>
                                       
                                        </div>


                                        

                                       
                                        
                                        


                                        
                                      
                                       
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        </div>
    </div>
  )
}

export default MyProfile