import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyServiceList } from "../../services/authentication";
import { Breadcrumb } from "antd";

const HrServiceDetails = (props) => {
  const SelectedRecord = props && props.selectedRecord;
  const alldata = props && props.data;
  const status = props && props.status;
  console.log("data", alldata);
  console.log("selected", SelectedRecord);
  const ServiceData =
    alldata &&
    alldata.filter((data) => data.serviceCode === SelectedRecord.serviceid)[0];
  console.log("record", ServiceData);
  //   const [policyDetailsPage, setpolicyDetailsPage] = useState(true);
  //   const [paymentPage, setpaymentPage] = useState(false);
  let navigate = useNavigate();

  const handleverifyAPI = async (verifyStatus) => {
    const data = {
      id: ServiceData.id,
      verifyStatus: verifyStatus,
      priorityStatus: ServiceData.priorityStatus,
    };
    try {
      const resp = await verifyServiceList(data);
      console.log("respppp", resp);
      handlesubmit();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlesubmit = () => {
    props.handlesubmit();
  };

  const handleBack = () => {
    props.handleBack();
  };
  return (
    <>
      <div>
        <div>
          <div id="layoutSidenav">
            <div id="layoutSidenav_content">
              <main>
                <div>
                <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Service</Breadcrumb.Item>
            <Breadcrumb.Item>Service Details</Breadcrumb.Item>
          </Breadcrumb>
                  <div className="row d-flex align-items-center justify-content-between" style={{paddingTop:"10px"}}>
                    <div className="col-12">
                      <div className="heading-with-box">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 text-left">
                            <h3>
                              service Request ID. :{" "}
                              <span className="color-green">
                                {ServiceData && ServiceData.serviceCode}
                              </span>
                            </h3>
                          </div>

                          <div className="col-lg-6 col-md-6 text-right">
                            <a
     
                              className="danger-color"
                              data-toggle="modal"
                              data-target="#addPolicyList"
                            >
                              Status: priority
                              <span className="color-green">
                                {ServiceData && ServiceData.priorityStatus}
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="policy-box">
                    <div className="row">
                      <div className="col-12">
                        <div className="table-data">
                          <span>Requested BY</span>
                          <b>
                            {ServiceData &&
                              ServiceData.userPolicy.user.firstName}
                            {/* {ServiceData && ServiceData.userPolicy.user.lastName} */}
                          </b>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <div className="col-12 col-md-3 col-sm-3">
                        <div className="table-data">
                          <span>Assigned to</span>
                          <b>
                            {ServiceData &&
                              ServiceData.userPolicy.agent.firstName}
                          </b>
                        </div>
                      </div>
                      <div className="col-12 col-md-3 col-sm-3">
                        <div className="table-data">
                          <span>Requested Date</span>
                          <b>{ServiceData && ServiceData.date}</b>
                        </div>
                      </div>
                      <div atyle={{ display: "flex", flexDirection: "row" }}>
                        <div className="col-12 col-md-3 col-sm-3">
                          <div className="table-data">
                            <span>policy</span>
                            <b>
                              {ServiceData &&
                                ServiceData.userPolicy.policy.policyName}
                            </b>
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-sm-3">
                          <div className="table-data">
                            <span>Policy Type</span>
                            <b>
                              {ServiceData &&
                                ServiceData.userPolicy.policy.policyType}
                            </b>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="col-12 col-md-3 col-sm-3">
                          <div className="table-data">
                            <span>Policy No</span>
                            <b>
                              {ServiceData &&
                                ServiceData.userPolicy.policy.policyCode}
                            </b>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-12 col-md-3 col-sm-3">
                          <div className="table-data">
                            <span>Premium</span>
                            <b>{policyList && policyList.premiumAmount}</b>
                          </div>
                        </div> */}
                      <div className="col-12 col-md-3 col-sm-3">
                        <div className="table-data">
                          <span>Requested For</span>
                          <b>{ServiceData && ServiceData.requested}</b>
                        </div>
                      </div>
                      <div className="col-12 col-md-3 col-sm-3">
                        <div className="table-data">&nbsp;</div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-10">
                        <div className="table-data">
                          <span>Description</span>
                          <p>{ServiceData && ServiceData.description}</p>
                          <a
                            data-toggle="collapse"
                           
                            role="button"
                            aria-expanded="false"
                            aria-controls="collapseExample"
                          >
                            see more
                          </a>
                          {/* <div className="collapse" id="collapseExample">
                                            <p className="mt-2">
                                            {policyList && policyList.policy.policyCode}
                                            </p>
                                        </div> */}
                        </div>
                      </div>
                    </div>
                    <div>
                      {/* {status && ( */}
                      <div
                        className="row"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          padding: "50px",
                          justifyContent: "space-between",
                        }}
                      >
                        {" "}
                        <div
                          className="col-12 col-md-4"
                          style={{ color: "#8ec131" }}
                        >
                          <a
                          
                            className="btn-close secondary-btn"
                            onClick={handleBack}
                          >
                            Back
                          </a>
                        </div>
                        <div className="col-12 col-md-4">
                          <a
                           
                            className="btn-close"
                            onClick={() => handleverifyAPI("Denied")}
                          >
                            Denied Request
                          </a>
                        </div>
                        {/* <div className="col-12 col-md-2">
                                //     <a href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#" className="btn-close renew-btn">Renew Policy</a>
                                // </div> */}
                        <div
                          className="col-12 col-md-4"
                          style={{ color: "#8ec131" }}
                        >
                          <a
                            
                            className="btn-close premium-btn"
                            onClick={() => handleverifyAPI("Approve")}
                          >
                            Approve
                          </a>
                        </div>
                        {/* <div className="col-12 col-md-4">
                              <a
                                href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#"
                                className="btn-close claim-btn"
                                onClick={() => handleverifyAPI()}
                              >
                                Assign Request
                              </a>
                            </div> */}
                      </div>
                      {/* )} */}
                      {/* {!status && ( */}
                      {/* <div className="col-12 col-md-3">
                            <a
                              href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#"
                              className="btn-close renew-btn"
                            >
                              Renew Policy
                            </a>
                          </div> */}
                      {/* )} */}
                    </div>
                  </div>
                </div>
              </main>
              <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid">
                  <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">Copyright © Nossa 2020</div>
                    <div>
                      <a href="">
                        Privacy Policy
                      </a>
                      ·
                      <a href="">
                        Terms &amp; Conditions
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
          {/* <script src="./userpolicy_files/jquery-3.5.1.slim.min.js.download" crossorigin="anonymous"></script>
        <script src="./userpolicy_files/bootstrap.bundle.min.js.download" crossorigin="anonymous"></script>
        <script src="file:///D:/ReactNasso/nasso/src/user/Paypremium/js/scripts.js"></script>
        <script src="./userpolicy_files/Chart.min.js.download" crossorigin="anonymous"></script>
        <script src="file:///D:/ReactNasso/nasso/src/user/Paypremium/assets/demo/chart-area-demo.js"></script>
        <script src="file:///D:/ReactNasso/nasso/src/user/Paypremium/assets/demo/chart-bar-demo.js"></script>
        <script src="./userpolicy_files/jquery.dataTables.min.js.download" crossorigin="anonymous"></script>
        <script src="./userpolicy_files/dataTables.bootstrap4.min.js.download" crossorigin="anonymous"></script>
        <script src="file:///D:/ReactNasso/nasso/src/user/Paypremium/assets/demo/datatables-demo.js"></script> */}
        </div>
      </div>
      )
    </>
  );
};
export default HrServiceDetails;
