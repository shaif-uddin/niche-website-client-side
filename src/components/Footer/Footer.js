import React from 'react';
import './Footer.css'
const Footer = () => {
    return (
        <div id="footer" class="bg-light pt-5 mt-5">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-md-3">
                        <div class="widget-title">
                            <h3 class="mb-4 fs-5 text-secondary text-uppercase">Customer support</h3>
                        </div>
                        <h4 class="text-success">+99-888555-1111</h4>
                        <p class="text-secondary m-0 mt-3">Mon. - Fri. <b>10:00 - 8:00</b></p>
                        <p class="text-secondary">Fri. - Sat. <b>Off</b></p>
                    </div>
                    <div class="col-sm-6 col-md-3">
                        <div class="widget-title">
                            <h3 class="mb-4 fs-5 text-secondary text-uppercase">About Shop</h3>
                        </div>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Sitemap</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-6 col-md-3">
                        <div class="widget-title">
                            <h3 class="mb-4 fs-5 text-secondary text-uppercase">Our services</h3>
                        </div>
                        <ul>
                            <li><a href="#">Payment</a></li>
                            <li><a href="#">Order tracking</a></li>
                            <li><a href="#">Exchanges & returns</a></li>
                            <li><a href="#">Delivery</a></li>
                            <li><a href="#">Terms & conditions</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-6 col-md-3">
                        <div class="widget-title">
                            <h3 class="mb-4 fs-5 text-secondary text-uppercase">Newsletter signup</h3>
                        </div>
                        <form class="row row-cols-lg-auto g-3 align-items-center">
                            <div class="col-12">
                                <label class="visually-hidden">Username</label>
                                <div class="input-group">
                                    <div class="input-group-text"><i class="bi bi-envelope"></i></div>
                                    <input type="text" class="form-control" placeholder="Username" />
                                </div>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-success w-100">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12  py-3  bg-secondary">
                <p class="text-center text-white mt-3 ">©Copyright 2021. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;