import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import Sidebar from "./Sidebar";
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';

export default function Add_admin_document() {


    const [Adddocument, setAdddocument] = useState([])
    let { id } = useParams();
    console.log(id);
    const userlist = async () => {
        const orgID = id;
        await axios.get(`/vieworg/${orgID}`)
            .then(resp => {
                let data = resp.data.data
                setAdddocument(data)
                console.log("==========>>>>>>>>>>>", data);


            })
    }
    useEffect(() => {
        userlist()
    }, [])


    // form data api 

const handlersubmitform = (e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const Formvlaues = Object.fromEntries(data.entries());
    const formData =  Formvlaues
    const orgID = id;
    let dataToSend2 = new FormData();
    dataToSend2.append('document', Formvlaues.document);
   console.log(formData)
        axios.post(`/addOrgDocument/${orgID}`,dataToSend2)
        .then(resp =>{
            if(resp.status){
                const data = resp.data;
            console.log("=====>>>>>>>>>>",data);
            if(data.status){
              toast.success(data.msg);
           
            }else{
              toast.error(data.msg);
            }
            }
            
            
    
           
        })
        



}



    return (
        <>
            <Sidebar />
            <Header/>
            <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                <div className="content d-flex flex-column flex-column-fluid" id="kt_content">

                    <div className="container-xxl" id="kt_content_container">
                        <div className="row g-5 g-xl-8">
                           

                            <div className="col-lg-12">

                                <div className="card card-xxl-stretch mb-5 mb-xl-8">

                                    <div className="card-header border-0 pt-5">
                                        <h3 className="card-title align-items-start flex-column">
                                            <span className="card-label fw-bold fs-3 mb-1">Add Admin Document</span>
                                            <span className="text-muted mt-1 fw-semibold fs-7"></span>
                                        </h3>

                                    </div>

                                    <div className="card-body py-3">
                                    <div className="container">
                <div className="container rounded bg-white mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-3 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                <img className="rounded-circle mt-5" width="120px" height="120" src={Adddocument.logo} /><span className="font-weight-bold"><strong>{Adddocument.name}</strong></span><span className="text-black-50">{Adddocument.email}</span><span> </span></div>
                        </div>
                       
                        <div className="col-md-7 border-right">
                        <form onSubmit={(e) => handlersubmitform (e)}>
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Profile Settings</h4>
                                </div>
                               
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <label className="labels">Mobile Number</label>
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>

                                    </div>
                                    <div className="col-md-12 my-2">


                                        <label for="formFileMultiple" className="form-label">Multiple files input example</label>
                                        <input className="form-control" type="file" id="formFileMultiple" name='document'/>

                                    </div>
                                    {/* <div className="col-md-12 my-2">

                                        <label for="formFileMultiple" className="form-label">Multiple files input example</label>
                                        <input className="form-control" type="file" id="formFileMultiple"  />



                                    </div>
                                    <div className="col-md-12 my-2">


                                    <label for="formFileMultiple" className="form-label">Multiple files input example</label>
                                        <input className="form-control" type="file" id="formFileMultiple"  />
                                    </div>

                                    <div className="col-md-12 my-2">
                                    <label for="formFileMultiple" className="form-label">Multiple files input example</label>
                                        <input className="form-control" type="file" id="formFileMultiple" />
                                    </div>

*/}
                                   
                                </div> 
                                
                                <div className="mt-5 text-right"><button className="btn btn-primary profile-button" type="submit">Upload Document</button></div>
                            </div>
                            </form>
                        </div>
                       
                    </div>
                </div>
                <ToastContainer/>
            </div>
                                       



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
