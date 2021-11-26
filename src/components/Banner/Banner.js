import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css'
const Banner = () => {
    return (
        <>
            <section class="hero-banner bg-light py-5">
                <div class="container">
                    <div class="row row align-items-center">
                        <div class="col-lg-5 offset-lg-1 order-lg-1">
                            <img src="https://i.ibb.co/NNhW3zf/coneFace.jpg" class="img-fluid" alt="Web Development" />
                        </div>
                        <div class="col-lg-6">
                            <h1 class="mt-3">Flavors with a little something extra.</h1>
                            <p class="lead text-secondary my-5">
                                For 5 generations our <span className="fw-bold fst-italic">Th Ice Point</span> has been churning out best ice cream.
                                We’re pretty proud of what we make and really hope you enjoy every spoonful.
                            </p>
                            <Link to="/explore" class="btn btn-outline-secondary btn-lg border">Order Now</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Banner;