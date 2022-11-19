import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import Moment from 'moment';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from "react-paginate";
import Modal from "react-responsive-modal";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

function LicensesOrganzation() {


    const [pageCount, setpageCount] = useState('');

    let ID = localStorage.getItem('ID')
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [catView, setCat] = useState([])
    const [orgID2, setorgID2] = useState("");

 const limit = 10;


 

const userlist = async () => {
        await axios.post(`/findlowLicenseOrganisattions`)
            .then(resp => {
                const data = resp.data.findorg;
                setData(data)
                const total = resp.data.totlaRow
                console.log(total);
                const totalPage = (Math.ceil(total / limit));
                setpageCount(totalPage);
            })
    }
    useEffect(() => {
        userlist()
    }, [])

    ///////////////pagenestion///////////////
    const fetchComments = async (page) => {
        const senData = { page: page }
        // const cosole = Fromvalue;
        // console.log(Fromvalue);
       axios.post(`/findlowLicenseOrganisattions`, senData)
            .then(resp => {
                const data = resp.data.findorg;
                setData(data);
            })
        return data;
    };

    const handlePageClick = async (data) => {
        // console.log(data.selected);
        const page = data.selected + 1;
        const commentsFormServer = await fetchComments(page);
        setData(commentsFormServer);
    };


    const onOpenModal = (orgID) => 
    {
        setOpen(true);
   
        console.log(orgID);
       
        setorgID2(orgID)
    
    }
    
    const onCloseModal = () => setOpen(false);  

const UpdateFormData = async (e)=>{
      e.preventDefault();

      const data = new FormData(e.target);
      const Formvlaues = Object.fromEntries(data.entries());
      const formData =Formvlaues;
   
    //   alert(orgID2);
      axios.post(`/add_Licenses/${orgID2}`,formData )
      .then(resp =>{
        // console.log("api is work hhhhhhhhhhhhhhhhhhhhhhhh",resp.data);
        let data1 = resp.data;
         if(data1.status){
            toast.success(data1.msg);
                setOpen(false);
                
            // let data = resp.data.update
            // if(data.status){
            //     toast.success(data.msg);
            //     setOpen(false);

            // }else{
            //     toast.error(data.msg);
            // }
         }else{
            toast.error(data1.msg);

        }
      }).catch(error=>console.log("api errrorllllllllllllllllllll",error));


}


    return (
        <>
            <Sidebar />
            <Header />
            <ToastContainer />
            <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                <div className="content d-flex flex-column flex-column-fluid" id="kt_content">

                    <div className="container-xxl" id="kt_content_container">
                        <div className="row g-5 g-xl-8">
                            <div className="col-lg-12">
                                <div className="card bg_card rounded-15 bgi-no-repeat bgi-position-x-end bgi-size-cover" style={{ marginTop: '2rem' }}>
                                    <div className="card-body container-xxl pt-10 pb-8">
                                        <div className="d-flex align-items-center">
                                            <h1 className="fw-semibold me-3 text-white">Licenses</h1>
                                            <span className="fw-semibold text-white opacity-50">Licenses list</span>
                                        </div>
                                        

                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-12">

                                <div className="card card-xxl-stretch mb-5 mb-xl-8">

                                    <div className="card-header border-0 pt-5">
                                        <h3 className="card-title align-items-start flex-column">
                                            <span className="card-label fw-bold fs-3 mb-1">Licenses List</span>
                                            <span className="text-muted mt-1 fw-semibold fs-7"></span>
                                        </h3>

                                    </div>

                                    <div className="card-body py-3">

                                        <div className="table-responsive">

                                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">

                                                <thead>

                                                    <tr className="fw-bold text-muted th-title">


                                                        <th className="min-w-125px">Image</th>
                                                        <th className="min-w-125px">D-ID</th>
                                                        <th className="min-w-125px">Name</th>
                                                        
                                                        <th className="min-w-100px">Total Licenses</th>
                                                        {/* <th className="min-w-100px ">Status</th> */}
                                                        <th className="min-w-100px text-end">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody>

                                                {data.map((item)=>

                                                    <tr>
                                                        <td><img src={item.OrganisationID.logo} width="100px" /></td>
                                                        <td>{item.OrganisationID._id}</td>
                                                        <td>{item.name}</td>
                                                        
                                                        <td className="text-start">{item.totalLicenses}</td>
                                                        {/* <td><span className="badge badge-light-info fs-5">{item.status}</span></td> */}
                                                        <td>
                                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                             
                                                            
                                                                
                                                                <button onClick={(e) =>{ onOpenModal(item.OrganisationID._id) }}
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Edit Detail">
                                                                    <span className="svg-icon svg-icon-3">
                                                                    <i class="fad fa-edit fs-4"></i>
                                                                        {/* <i className="fad fa-eye fs-4"></i> */}
                                                                    </span>

                                                                </button>
                                                               
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}

                                                    {/* <tr>
                                                        <td>##41e8bd3f3ca</td>
                                                        <td> Virendra Shilpkar </td>
                                                        <td> virendra@gmail.com </td>
                                                        <td><span>+221 123-456-7840</span> </td>
                                                        <td>05/06/1980</td>
                                                        <td>05/08/2020</td>
                                                        <td>Ethiopia</td>
                                                        <td>
                                                        <td><span className="badge badge-light-info fs-5">Verified</span></td> 
                                                        </td>
                                                        <td>
                                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                                <button
                                                                    className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Suspend ">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-minus-circle fs-4"></i>
                                                                    </span>
                                                                </a>
                                                                <button
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Password Reset ">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fas fa-repeat-alt"></i>
                                                                    </span>
                                                                </a>
                                                                <a href='organization_detail.html'
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="View Detail">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-eye fs-4"></i>
                                                                    </span>

                                                                </a>
                                                                <a href='#'
                                                                    className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Delete">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-trash-alt"></i>
                                                                    </span>

                                                                </a>
                                                                <a href='#'
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Disable OTP">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-eye-slash"></i>
                                                                    </span>

                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr> */}


                                                </tbody>

                                            </table>

                                        </div>

                                        <div className="col-lg-12 mt-2 text-end">
                                        <ReactPaginate
                                            previousLabel={"previous"}
                                            nextLabel={"next"}
                                            breakLabel={"..."}
                                            pageCount={pageCount}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={3}
                                            onPageChange={handlePageClick}
                                            containerClassName={"pagination justify-content-end"}
                                            pageClassName={"page-item"}
                                            pageLinkClassName={"page-link"}
                                            previousClassName={"page-item"}
                                            previousLinkClassName={"page-link pagestyle"}
                                            nextClassName={"page-item"}
                                            nextLinkClassName={"page-link"}
                                            breakClassName={"page-item"}
                                            breakLinkClassName={"page-link"}
                                            activeClassName={"active"}
                                        />
                                    </div>

                                    <Modal open={open} onClose={onCloseModal} center>
                                                      <h2 className="mb-4 text-white">Update Tips & Tricks</h2>
                                                    <div className="mx-500">
                                                        <form className="mt-3 w-100"  onSubmit={(e) => UpdateFormData(e)}>
                                                        <div className="form-group mb-4">

                                                        <label className="title-col"> Organisation </label>
                                                          {/* <input type="hidden" className="form-control" name="id" defaultValue={catView._id} /> */}
                                                
                                                          {/* <input type="text" autoComplete="off" className="form-control" name="tips_trick" defaultValue="" />  */}
                                                          </div>

                                                          <label className="title-col"> Add Licenses</label>
                                                          <input type="number" id="Licenses" autoComplete="off"  className="form-control mb-4" name="Licenses"
                                                       
                                                        />

                                                            <div className="mt-3 mb-3">
                                                             <Button type='submit' className="mr-3 btn-pd btnBg">Update</Button>
                                                                </div>
                                                        </form>
                                                    </div>
                                                </Modal>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>
               
            </div>

            
        </>
    );
}


export default LicensesOrganzation