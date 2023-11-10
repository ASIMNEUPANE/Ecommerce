import first from './about.png'
import second from './bg_1.png'
import third from './last.png'
import "./about.css"
const About = () => {
    return (
      <>
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 order-2 order-md-1 mt-4 pt-2 mt-sm-0 opt-sm-0">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6 col-6">
                <div className="row">
                  <div className="col-lg-12 col-md-12 mt-4 pt-2">
                    <div className="card work-desk rounded border-0 shadow-lg overflow-hidden">
                      <img
                        src={first}
                        className="image"
                        alt="Image"
                      />
                      <div className="img-overlay bg-dark"></div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="col-lg-6 col-md-6 col-6">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="card work-desk rounded border-0 shadow-lg overflow-hidden">
                      <img
                        src={second}
                        className="image"
                        alt="Image"
                      />
                      <div className="img-overlay bg-dark"></div>
                    </div>
                  </div>
  
                  <div className="col-lg-12 col-md-12 mt-4 pt-2">
                    <div className="card work-desk rounded border-0 shadow-lg overflow-hidden">
                      <img
                        src={third}
                        className="image"
                        alt="Image"
                      />
                      <div className="img-overlay bg-dark"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="col-lg-6 col-md-6 col-12 order-1 order-md-2">
            <div className="section-title ml-lg-5">
              <h5 className="text-custom font-weight-normal mb-3">About Me</h5>
              <h4 className="title mb-4">
                My mission is to learn <br />
                 MERN Stack development.
              </h4>
              <p className="text-muted mb-0">
                I am using the latest technology like React JS, React Redux , ReduxToolKit for front End and  Node Js, Express Js for backend and MongodB
                for database . 
              </p>
  
              <div className="row">
                <div className="col-lg-6 mt-4 pt-2">
                  <div className="media align-items-center rounded shadow p-3">
                    <i className="fa fa-play h4 mb-0 text-custom"></i>
                    <h6 className="ml-3 mb-0">
                      <a href="javascript:void(0)" className="text-dark">
                        Responsive
                      </a>
                    </h6>
                  </div>
                </div>
                <div className="col-lg-6 mt-4 pt-2">
                  <div className="media align-items-center rounded shadow p-3">
                    <i className="fa fa-file-download h4 mb-0 text-custom"></i>
                    <h6 className="ml-3 mb-0">
                      <a href="javascript:void(0)" className="text-dark">
                        Open Source
                      </a>
                    </h6>
                  </div>
                </div>
                <div className="col-lg-6 mt-4 pt-2">
                  <div className="media align-items-center rounded shadow p-3">
                    <i className="fa fa-user h4 mb-0 text-custom"></i>
                    <h6 className="ml-3 mb-0">
                      <a href="javascript:void(0)" className="text-dark">
                        asimneupane11@gmail.com
                      </a>
                    </h6>
                  </div>
                </div>
                <div className="col-lg-6 mt-4 pt-2">
                  <div className="media align-items-center rounded shadow p-3">
                    <i className="fa fa-image h4 mb-0 text-custom"></i>
                    <h6 className="ml-3 mb-0">
                      <a href="javascript:void(0)" className="text-dark">
                        Full Stact Developer
                      </a>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default About;