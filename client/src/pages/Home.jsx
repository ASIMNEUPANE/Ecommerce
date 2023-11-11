import "./Home.css";

// rounded img
import airtag from "./photos/airtag.jpg";
import rings2 from "./photos/rings2.jpg";
import speaker from "./photos/speaker.jpg";

import keyboard from "./photos/keyboard.jpg";
import three from "./photos/three.jpg";
import one from "./photos/one.jpg";
import two from "./photos/two.jpg";
import earbuds from "./photos/earbuds.jpg";
import controller from "./photos/controller.jpg";

import Carousel from "react-bootstrap/Carousel";
import CarouselImage from "../components/CarouselImage";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div>
        <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
          <Carousel className="slides">
            <Carousel.Item interval={1000}>
              <CarouselImage text="First slide" />
              <img src={three} alt="" />
              <Carousel.Caption>
                <h3>Gear Up for Greatness</h3>
                <p>
                  Unleash the power of technology with our latest gadgets and
                  gizmos. Elevate your digital experience today!{" "}
                </p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={500}>
              <CarouselImage text="Second slide" />
              <img src={two} alt="" />
              <Carousel.Caption>
                <h3>Innovate Your Lifestyle</h3>
                <p>
                  Explore cutting-edge tech essentials that seamlessly blend
                  style and functionality. Stay ahead in the digital era.
                </p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <CarouselImage text="Third slide" />
              <img src={one} alt="" />
              <Carousel.Caption>
                <h3>Tech Marvels Await You</h3>
                <p>
                  Discover a world of possibilities with our curated selection
                  of top-notch tech items. Elevate your everyday with innovation
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="container marketing">
          <div className="row">
            <div className="col-lg-4">
              <img
                width="140"
                height="140"
                className="bd-placeholder-img rounded-circle"
                src={rings2}
                alt="Image"
              />

              <h2>Nike+ FuelBand</h2>
              <p>
                It's not just a ring; it's your gateway to a smarter, more
                connected lifestyle. Embrace innovation with every gesture—wear
                the future on your finger.
              </p>
              <p>
                <Link to={`/products/654d058db06ffb5eeb196af6`}>
                  <a className="btn btn-secondary">View details &raquo;</a>
                </Link>
              </p>
            </div>
            <div className="col-lg-4">
              <img
                width="140"
                height="140"
                className="bd-placeholder-img rounded-circle"
                src={airtag}
                alt="Image"
              />

              <h2>Apple AirTag </h2>
              <p>
                Say goodbye to the stress of misplaced items with the Apple
                AirTag. This compact tracking device ensures that your valuables
                are always within reach.
              </p>
              <p>
                <Link to={`/products/654d1456f0fa229bf110f3f4`}>
                  <a className="btn btn-secondary">View details &raquo;</a>
                </Link>
              </p>
            </div>
            <div className="col-lg-4">
              <img
                width="140"
                height="140"
                className="bd-placeholder-img rounded-circle"
                src={speaker}
                alt="Image"
              />

              <h2>Sound On-The-Go</h2>
              <p>
                Carry the beat in your pocket! Our Mini Speaker is the ultimate
                companion for those who crave premium sound on-the-go
              </p>
              <p>
                <Link to={`/products/654d1337f0fa229bf110edc1`}>
                  <a className="btn btn-secondary">View details &raquo;</a>
                </Link>
              </p>
            </div>
          </div>
          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">
                Immerse in Sound Freedom with
                <span className="text-muted">
                  {" "}
                  our TWS Bluetooth Earphones!
                </span>
              </h2>
              <p className="lead">
                Dive into a world of crystal-clear sound, seamless connectivity,
                and unparalleled comfort. Whether you're on the go, hitting the
                gym, or just unwinding, these earphones are your perfect
                companion
              </p>
            </div>
            <div className="col-md-5">
              <div className="col-md-5 order-md-1">
                <img src={earbuds} className="img-fluid" alt="Image" />
              </div>
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading">
                Elevate Your Workspace: <br />
                <span className="text-muted">
                  {" "}
                  Discover the Artistry of Mechanical Keyboards!
                </span>
              </h2>
              <p className="lead">
                Unleash your typing potential with our state-of-the-art
                Mechanical Keyboards. Engineered for precision and performance,
                each keystroke is a symphony of tactile satisfaction.
              </p>
            </div>
            <div className="col-md-5 order-md-1">
              <img src={keyboard} className="img-fluid" alt="Image" />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">
                Level Up Your Gaming:
                <span className="text-muted">
                  {" "}
                  Unleash the Power of our PlayStation Controllers!.
                </span>
              </h2>
              <p className="lead">
                Designed for ultimate control and precision, these controllers
                redefine the way you play.Immerse yourself in the game with
                responsive buttons, ergonomic design, and intuitive features
                that enhance your gaming experience.
              </p>
            </div>
            <div className="col-md-5">
              <div className="col-md-5 order-md-1">
                <img
                  className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                  width="600"
                  height="600"
                  src={controller}
                  alt="Image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
