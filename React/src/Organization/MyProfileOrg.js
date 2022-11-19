import React, { useState, useEffect} from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import axios from 'axios';
import Jwt from "jsonwebtoken"
import { toast, ToastContainer } from 'react-toastify';

function MyProfileOrg() {
    const [data, setData] = useState([])
     let token = localStorage.getItem('token')
      var decode1 = Jwt.decode(token)
      let orgID =decode1.OrganisationID
      console.log(orgID);

      const UpdateFormData = async (e) =>{
        e.preventDefault();

        const data = new FormData(e.target);
        const FormValues = Object.fromEntries(data.entries());
        console.log(FormValues);
        let dataToSend2 = new FormData();
        dataToSend2.append('logo',FormValues.logo);
        dataToSend2.append('name', FormValues.name)
        dataToSend2.append('phone', FormValues.phone)
        dataToSend2.append('email', FormValues.email)
        dataToSend2.append('country', FormValues.country)
        dataToSend2.append('city', FormValues.city)
        dataToSend2.append('address', FormValues.address)
        dataToSend2.append('postCode', FormValues.postCode)
        dataToSend2.append('password', FormValues.password)

        axios.post(`/org_update/${orgID}`,dataToSend2)
        .then(resp =>{
            if(resp.status){
                let data = resp.data
                if(data.status){
                    toast.success(data.msg)
                    setData(data);
                    window.location ="/organization"

                }else{
                    toast.error(data.msg)
                }
            }else{
                toast.error(data.msg)
            }
        })
        
      }


    const userlist = async () =>{
        await axios.get(`/vieworg/${orgID}`)
        .then(resp =>{
            let data =resp.data.data
            setData(data);
            console.log(data);
        })
    }

    useEffect(() => {
      userlist();
    }, [])
    
  return (
    <div>
        <ToastContainer />
        <Header/>
        <Sidebar/>
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
                                <form onSubmit={(e) => UpdateFormData (e)} id="kt_account_profile_details_form" className="form" >
                                    <div className="card-body border-top p-9">
                                        <div className="row mb-6 ">
                                      
                                        <label className="col-form-label fw-semibold fs-6 " style={{paddingLeft:"15%"}}>Profile</label>
                                            <div className="col-lg-4 text-center">
                                           
                                                <div className="image-input image-input-outline" data-kt-image-input="true" style={{backgroundImage: "url('/metronic8/demo4/assets/media/svg/avatars/blank.svg')"}}>
                                                    <div className="image-input-wrapper w-125px h-125px" style={{ backgroundImage: "url(/metronic8/demo4/assets/media/avatars/300-1.jpg)"}}></div>
                                                    <img src={data.logo} alt="logo" className="w-125px h-125px my-logo" style={{marginTop:"-11rem"}}/>
                                                    <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Upload Image">
                                                        <i className="bi bi-pencil-fill fs-7"></i>
                                                       
                                                        <input type="file" name="logo"    />
                                                        {/* {/ <input type="hidden" name="avatar_remove" /> /} */}
                                                    </label>
                                                    <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="Cancel avatar">
                                                        <i className="bi bi-x fs-2"></i>
                                                    </span>
                                                    <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="Remove avatar">
                                                        <i className="bi bi-x fs-2"></i>
                                                    </span>
                                                </div>
                                                <div className="form-text">Allowed file types: png, jpg, jpeg.</div>
                                            </div>
                                       
                                            
                                            
                                         <div className="col-lg-8">
                                         <div className='row mb-6'>
                                        
                                           
                                           <div className="col-lg-6 fv-row mb-6">
                                               <label className="col-form-label required fw-semibold fs-6">First Name</label>
                                               <input type="text" name="name" defaultValue={data.name} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Full Name"  />
                                           </div>
                                           {/* <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">Last Name </label>
                                                <input type="text" name="lastname"  className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Last Name" />
                                            </div> */}
                                            <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">Email </label>
                                                <input type="email" name="email" defaultValue={data.email} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Email Address" />
                                            </div>
                                           
                                            <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">Phone</label>
                                                <input type="number" name="phone" defaultValue={data.phoneNo}  className="form-control form-control-lg form-control-solid fs-6 mb-lg-0" placeholder="Phone" />
                                            </div>
                                            <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">Addres</label>
                                                <input type="text" name="address" defaultValue={data.address} className="form-control form-control-lg form-control-solid fs-6 mb-lg-0" placeholder="Addres" />
                                            </div>
                                            <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">Country</label>
                                                <input type="text" name="country" defaultValue={data.country} className="form-control form-control-lg form-control-solid fs-6 mb-lg-0" placeholder="Country" />
                                            </div>
                                            {/* <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">State</label>
                                                <input type="text" name="state"  className="form-control form-control-lg form-control-solid fs-6 mb-lg-0" placeholder="State" />
                                            </div> */}
                                            <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">City</label>
                                                <input type="text" name="city" defaultValue={data.city} className="form-control form-control-lg form-control-solid fs-6 mb-lg-0" placeholder="City" />
                                            </div>
                                            <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">Post Code</label>
                                                <input type="number" name="postCode" defaultValue={data.postCode}  className="form-control form-control-lg form-control-solid fs-6 mb-lg-0" placeholder="Post Code" />
                                            </div>
                                            <div className="col-lg-6 fv-row mb-6">
                                                <label className=" col-form-label fw-semibold fs-6">Password </label>
                                                <input type="password" name="password" defaultValue={data.password}  className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Password" />
                                            </div>

                                         </div>
                                        
                                         </div>
                                        
                                        </div>


                                        <div className="card-footer d-flex justify-content-end py-6 px-9">
                                           <button type="submit" className="btn btn-light  me-2" style={{backgroundColor:"#3c7f8c",color:"#fff"}}>Update</button>
                                       
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


export default MyProfileOrg