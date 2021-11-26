import React from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
    return (
        <>
            <section class="faq-section">
                <div class="container" data-aos="fade-up">
                    <header class="section-header">
                        <h3>F.A.Q</h3>
                        <h2>Frequently Asked Questions</h2>
                    </header>
                    <div class="row">
                        <div class="col-md-5 offset-md-1">
                            <div class="accordion accordion-flush" id="faqlist1">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-1">
                                            What's your return policy?
                                        </button>
                                    </h2>
                                    <div id="faq-content-1" class="accordion-collapse collapse" data-bs-parent="#faqlist1">
                                        <div class="accordion-body">
                                            All sales are final. If your ice cream doesn’t arrive perfectly frozen,
                                            we’ll reship the order at our cost. Need customer service? Contact contact@icepoint.com
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-2">
                                            o you have gift cards?
                                        </button>
                                    </h2>
                                    <div id="faq-content-2" class="accordion-collapse collapse" data-bs-parent="#faqlist1">
                                        <div class="accordion-body">
                                            No, Gift Cards.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-3">
                                            Do you have dairy-free flavors?
                                        </button>
                                    </h2>
                                    <div id="faq-content-3" class="accordion-collapse collapse" data-bs-parent="#faqlist1">
                                        <div class="accordion-body">
                                            Yes! We have an entire line of dairy-free flavors.
                                            You can shop them <Link t0="/explore">here</Link>.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="accordion accordion-flush" id="faqlist2">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#faqlist2-content-44">
                                            Does IcePOint weddings and parties or sell ice cream during festivals?
                                        </button>
                                    </h2>
                                    <div id="faqlist2-content-44" class="accordion-collapse collapse" data-bs-parent="#faqlist2-content-44">
                                        <div class="accordion-body">
                                            Yes!, If you are outside of the cities we serve,
                                            we’d still love to be a part of your event! Our Street Treats
                                            (single-serve containers) are great for all types of gatherings and are a perfect,
                                            easy no-mess option. We can ship them directly to you or your venue.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#faq2-content-44">
                                            I have a major nut allergy. Is IcePoint's safe for me?
                                        </button>
                                    </h2>
                                    <div id="faq2-content-44" class="accordion-collapse collapse" data-bs-parent="#faq2-content-44">
                                        <div class="accordion-body">
                                            We make every flavor in a kitchen that also produces products that contain milk, eggs,
                                            peanuts, tree nuts, soy, and wheat. But we follow good manufacturing processes and organize our production days to go from the least amount of allergens to most, and always wash,
                                            rinse, and sanitize equipment between each flavor.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#faq2-content-45">
                                            Are any of your flavors sugar-free?
                                        </button>
                                    </h2>
                                    <div id="faq2-content-45" class="accordion-collapse collapse" data-bs-parent="#faq2-content-45">
                                        <div class="accordion-body">
                                            No, Sorry.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FAQ;