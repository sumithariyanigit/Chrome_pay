import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";
export default function LongApply() {
  const [listorg, setlistOrg] = useState([]);
  const [interest, setinterest] = useState([]);
  const [interestbranch, setinterestbranch] = useState([]);
  const [findDocuments, setfindDocuments] = useState([]);
  const [orgID, setorgID] = useState();
  const [alertmessagehandler, setalertmessagehandler] = useState(false);

  let { _id } = useParams();
  let  {custID}  = { custID: _id }

  const userlist = async () => {
    let { custID } = { custID: _id }
    await axios.post(`/getOrgForLoan/${custID}`)
      .then(resp => {
        let data1 = resp.data.final;
        setlistOrg(data1);
        console.log(data1, resp);
      })
  }
  const loantype = async (orgID) => {
    setalertmessagehandler(false);
  
    await axios.post(`/getOrgLoans/${orgID}`)
      .then(resp => {
        let data = resp.data.values;
        setinterest(data);
        setalertmessagehandler(false);
        console.log("selected api loan", data);
      })
  }
  const loanintrest = async (formdata) => {
    await axios.post(`/getInterestOFLoan/${orgID}`,{LoanType:formdata})
      .then(resp => {
        let data = resp.data.item;
        setinterestbranch(Object.values(data));
        setalertmessagehandler(false);
        console.log("selected api loanintrest", data);
      })
  }

  const userDocumentview = async () => {
    let { custID } = { custID: _id }
    await axios.post(`/get_document/${custID}`)
      .then(resp => {
        let data = resp.data.findDocuments;
        setfindDocuments(data);
        console.log("selected document", data);
      })
  }



  const loanformhandler =(e)=>{
    e.preventDefault();
  
    const data = new FormData(e.target);
    const Formvlaues = Object.fromEntries(data.entries());
    console.log(Formvlaues);
    axios.post(`/calculate_Amount`,Formvlaues)
    .then(res =>{
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

  useEffect(() => {
    userlist();
    userDocumentview();
  }, []);

  const handleChange = (e) => {
    loantype(e.target.value);
    setorgID(e.target.value); 

  }
  const handleinterest = (e) => {
    loanintrest(e.target.value);

  }

  const alertmessage=()=>{
    setalertmessagehandler(true);
  }

  return (
    <>
    <ToastContainer />
      <Sidebar />
      <Header />
      <div
        className="wrapper d-flex flex-column flex-row-fluid mb-0 back-color"
        id="kt_wrapper"
      >
        <div
          className="content d-flex flex-column flex-column-fluid mb-0 py-0"
          id="kt_content"
        >
          <div className="container-xxl mb-0" id="kt_content_container">
            <div className="card-body  pt-9 pb-0 ">
              <div className="col-lg-12">
                <div className="card rounded-15 mb-5 mb-xl-10 bgi-no-repeat bgi-position-x-end bgi-size-cover">
                  <div className="card-body  pt-9 pb-0 ">
                    {/* <!--begin::Details--> */}
                    <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                      {/* <!--begin: Pic--> */}
                      <div className="me-7 mb-4">
                        <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                          <img src="" alt="image" />
                          <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px"></div>
                        </div>
                      </div>

                      {/* <!--end::Pic--> */}

                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                          {/* <!--begin::User--> */}
                          <div className="d-flex flex-column">
                            {/* <!--begin::Name--> */}
                            <div className="d-flex align-items-center mb-2">
                              <a
                                href="#"
                                className="text-gray-900 text-hover-primary fs-2 fw-bold me-1"
                              >
                                {/* {addres.name} */}
                              </a>
                              <a href="#">
                                {/* <!--begin::Svg Icon | path: icons/duotune/general/gen026.svg--> */}
                                <span className="svg-icon svg-icon-1 svg-icon-primary">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      d="M10.0813 3.7242C10.8849 2.16438 13.1151 2.16438 13.9187 3.7242V3.7242C14.4016 4.66147 15.4909 5.1127 16.4951 4.79139V4.79139C18.1663 4.25668 19.7433 5.83365 19.2086 7.50485V7.50485C18.8873 8.50905 19.3385 9.59842 20.2758 10.0813V10.0813C21.8356 10.8849 21.8356 13.1151 20.2758 13.9187V13.9187C19.3385 14.4016 18.8873 15.491 19.2086 16.4951V16.4951C19.7433 18.1663 18.1663 19.7433 16.4951 19.2086V19.2086C15.491 18.8873 14.4016 19.3385 13.9187 20.2758V20.2758C13.1151 21.8356 10.8849 21.8356 10.0813 20.2758V20.2758C9.59842 19.3385 8.50905 18.8873 7.50485 19.2086V19.2086C5.83365 19.7433 4.25668 18.1663 4.79139 16.4951V16.4951C5.1127 15.491 4.66147 14.4016 3.7242 13.9187V13.9187C2.16438 13.1151 2.16438 10.8849 3.7242 10.0813V10.0813C4.66147 9.59842 5.1127 8.50905 4.79139 7.50485V7.50485C4.25668 5.83365 5.83365 4.25668 7.50485 4.79139V4.79139C8.50905 5.1127 9.59842 4.66147 10.0813 3.7242V3.7242Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M14.8563 9.1903C15.0606 8.94984 15.3771 8.9385 15.6175 9.14289C15.858 9.34728 15.8229 9.66433 15.6185 9.9048L11.863 14.6558C11.6554 14.9001 11.2876 14.9258 11.048 14.7128L8.47656 12.4271C8.24068 12.2174 8.21944 11.8563 8.42911 11.6204C8.63877 11.3845 8.99996 11.3633 9.23583 11.5729L11.3706 13.4705L14.8563 9.1903Z"
                                      fill="white"
                                    />
                                  </svg>
                                </span>
                              </a>
                              {/* <!--  <a href="#" className="btn btn-sm btn-light-success fw-bold ms-2 fs-8 py-1 px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_upgrade_plan">Verified</a> --> */}
                            </div>
                            {/* <!--end::Name--> */}

                            <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                              <a
                                href="#"
                                className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                              >
                                {/* <!--begin::Svg Icon | path: icons/duotune/communication/com006.svg--> */}
                                <span className="svg-icon svg-icon-4 me-1">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      opacity="0.3"
                                      d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z"
                                      fill="currentColor"
                                    />
                                    <rect
                                      x="7"
                                      y="6"
                                      width="4"
                                      height="4"
                                      rx="2"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </span>
                                Organization
                              </a>
                              <a
                                href="#"
                                className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                              >
                                {/* <!--begin::Svg Icon | path: icons/duotune/general/gen018.svg--> */}
                                <span className="svg-icon svg-icon-4 me-1">
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      opacity="0.3"
                                      d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </span>
                                {/* {section.country} */}
                              </a>
                              <a
                                href="#"
                                className="d-flex align-items-center text-gray-400 text-hover-primary mb-2"
                              >
                                {/* <!--begin::Svg Icon | path: icons/duotune/communication/com011.svg--> */}
                                <span className="svg-icon svg-icon-4 me-1">
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      opacity="0.3"
                                      d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </span>
                                {/* {addres.email} */}
                              </a>
                            </div>
                            {/* <!--end::Info--> */}
                          </div>
                          {/* <!--end::User--> */}
                        </div>

                        <div className="d-flex flex-wrap flex-stack">
                          <div className="d-flex flex-column flex-grow-1 pe-8">
                            <div className="d-flex flex-wrap">
                              {/* <!--begin::Stat--> */}
                              <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                <div className="d-flex align-items-center">
                                  <span className="svg-icon svg-icon-3 svg-icon-success me-2">
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect
                                        opacity="0.5"
                                        x="13"
                                        y="6"
                                        width="13"
                                        height="2"
                                        rx="1"
                                        transform="rotate(90 13 6)"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </span>

                                  <div
                                    className="fs-2 fw-bold"
                                    data-kt-countup="true"
                                    // data-kt-countup-value={section.totalUser}
                                    data-kt-countup-prefix="$"
                                  >
                                    {/* {section.totalUser} */}
                                  </div>
                                </div>

                                <div className="fw-semibold fs-6 text-gray-400">
                                  Total User
                                </div>
                              </div>
                              {/* <!--end::Stat--> */}
                              {/* <!--begin::Stat--> */}
                              <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                <div className="d-flex align-items-center">
                                  <span className="svg-icon svg-icon-3 svg-icon-danger me-2">
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect
                                        opacity="0.5"
                                        x="11"
                                        y="18"
                                        width="13"
                                        height="2"
                                        rx="1"
                                        transform="rotate(-90 11 18)"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </span>

                                  <div
                                    className="fs-2 fw-bold"
                                    data-kt-countup="true"
                                  // data-kt-countup-value={
                                  //   section.totalTransection
                                  // }
                                  >

                                  </div>
                                </div>

                                <div className="fw-semibold fs-6 text-gray-400">
                                  Total Transaction{" "}
                                </div>
                              </div>
                              {/* <!--end::Stat--> */}
                              {/* <!--begin::Stat--> */}

                              {/* <!--end::Stat--> */}
                            </div>
                          </div>

                          {/* <!--begin::Progress--> */}

                          {/* <!--end::Progress--> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            

                <div className="card rounded-15 mb-5 mb-xl-10 bgi-no-repeat bgi-position-x-end bgi-size-cover">
                  <div className="card-body  pt-9 pb-0 ">
            <div className="container-xxl " id="kt_content_container">
            <form onSubmit={loanformhandler}>
              <div className="row my-5">


              <label className="col-lg-4 col-form-label  fw-semibold fs-6"> <i class="fas fa-sack-dollar" style={{ fontSize: "2rem" }}></i> <span style={{ fontSize: "2rem", marginLeft: "1rem" }}> Loan Apply </span> </label>

                <div className="col-lg-8 fv-row my-0">
                { alertmessagehandler? <div class="alert alert-danger mt-5 mb-0" >
                  Select your Organisation
                </div>:""
}
                </div>

              </div>
              <div className="row my-5">


                <label className="col-lg-4 col-form-label  fw-semibold fs-6">Organisation</label>

                <div className="col-lg-8 fv-row .bg-light">
                  {/* <input type="text" name="organisation" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Organisation"  /> */}
                  {/* className="form-select border-0 flex-grow-1" */}
                  <select className="form-select border-0 flex-grow-1" name='orgID' onChange={handleChange}>
                    <option value="1" selected="selected"> Select Organisation</option>
                    {listorg.map((item) => (
                      <option key={item._id} value={item._id}>{item.name}</option>
                    ))}

                  </select>
                </div>

              </div>
              <div className="row my-5">


                <label className="col-lg-4 col-form-label  fw-semibold fs-6">Type of Loan</label>

                <div className="col-lg-8 fv-row" onClick={()=>alertmessage()}>
                  {/* <input type="text" name="organisation" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Organisation"  /> */}

                  <select className="form-select border-0 flex-grow-1"  name='Loan_type'  onChange={handleinterest}>
                    <option value="1" selected="selected"> Select loan Type</option>
                    {interest.map((item, index) => (
                      <option key={index} value={interest[index]}>{item}</option>
                    ))}

                  </select>
                </div>

              </div>
              <div className="row my-5">

<label className="col-lg-4 col-form-label required fw-semibold fs-6">Intrest Rate</label>

        <div className="col-lg-8 fv-row">
            <input type="text" name="Interest" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" readOnly placeholder=" type Intrest Rate" defaultValue={interestbranch[1]}  />
        </div>

</div>

              <div className="row my-5">

<label className="col-lg-4 col-form-label required fw-semibold fs-6">Amount</label>

        <div className="col-lg-8 fv-row">
            <input type="text" name="Amount" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=" enter Amound"  />
        </div>

</div>
              <div className="row my-5">

<label className="col-lg-4 col-form-label required fw-semibold fs-6">Duration</label>

        <div className="col-lg-8 fv-row">
            <input type="text" name="Emi_Months" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=" enter Duration"  />
        </div>

</div>
              <div className="row my-5 d-none">

<label className="col-lg-4 col-form-label d-none required fw-semibold fs-6">custID</label>

        <div className="col-lg-8 fv-row">
            <input type="text" name="custID" className="form-control d-none form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=" enter custID" defaultValue={_id}  />
            <input type="text" name="recidence" className="form-control d-none form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=" enter custID" defaultValue={findDocuments.residance}  />
            <input type="text" name="LocalGov" className="form-control d-none form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=" enter custID" defaultValue={findDocuments.locaDocument}  />
            <input type="text" name="LandRegistration" className="form-control d-none form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=" enter custID" defaultValue={findDocuments.landRegistration}  />
        </div>

</div>
              
<div className="card-footer d-flex justify-content-end py-6 px-9">
                                        <button type="submit" className="btn btn-light btn-active-light-primary me-2">Submit</button>
                                       
                                    </div>
            
            
            
                                    </form>
              <div>


              </div>




               
            




            </div>



          </div>

        </div>





        {/* added document in user */}

     
        <div className="row">
                <div className="col-lg-12 mb-4">
                  <h3 className="fw-bold mt-5">User Documents
                   </h3>
                </div>

                <div className="row mt-4  mb-2">




                  <div className="col-lg-4 basicdetail mb-2">
                    <div className="carduser">
                      <div className="text-center">
                        <a className="img_div">
                          <img src={findDocuments.residance} />
                        </a>
                        <a href="../assets_new/images/largepreview.png" className="viewimg">
                          <i className="fa fa-eye" data-toggle="lightbox" data-gallery="gallery" aria-hidden="true"></i></a>
                      </div>
                      <div className="d-flex justify-content-between p-3">
                        <h5>Proof of Residence</h5>
                        <div>

                          <a href="#" className="ml-2"><i className="fa fa-download" aria-hidden="true"></i></a>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="col-lg-4 basicdetail mb-2">
                    <div className="carduser">
                      <div className="text-center">
                        <a className="img_div">
                          <img src={findDocuments.locaDocument} />
                        </a>

                        <a className="viewimg" href="../assets_new/images/largepreview.png" data-toggle="lightbox" data-gallery="gallery">
                          <i className="fa fa-eye" aria-hidden="true" data-toggle="lightbox" data-gallery="gallery"></i></a>

                      </div>
                      <div className="d-flex justify-content-between p-3">
                        <h5>Local Document</h5>
                        <div>
                          <a href="#" className="ml-2"><i className="fa fa-download" aria-hidden="true"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 basicdetail mb-2">
                    <div className="carduser">
                      <div className="text-center">
                        <a className="img_div" href="#">
                          <img src={findDocuments.landRegistration} />
                        </a>
                        <a className="viewimg" href="../assets_new/images/largepreview.png" data-toggle="lightbox" data-gallery="gallery"><i className="fa fa-eye" aria-hidden="true"></i></a>
                      </div>
                      <div className="d-flex justify-content-between p-3">
                        <h5>Land Registration</h5>
                        <div>

                          <a href="#" className="ml-2"><i className="fa fa-download" aria-hidden="true"></i></a>
                        </div>
                      </div>
                    </div>
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
