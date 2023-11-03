import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../../styles/custom.css";

function Section2() {
    return (
        <section id="accordion" className='py-3'>
            <div className='container'>
                <h2 className='py-4 text-center' id='AccoMos' data-aos="zoom-in">MOSTLY ASKED</h2>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item" id="land" data-aos="fade-up">
                        <h2 class="accordion-header">
                            <button id="two" class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                How much does it cost ?
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample">
                            <div id="three" class="accordion-body">It really depends on the features & functionalities of
                                the
                                mobile app
                                will
                                have. We have developed mobile apps
                                starting $15,000 to $250,000. Most apps costs around $40,000.
                                This is the first item's accordion body.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item" id="land" data-aos="fade-up">
                        <h2 class="accordion-header">
                            <button id="two" class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                How long it takes to go live ?
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" class="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample">
                            <div id="three" class="accordion-body">Go-live is the time at which something becomes available
                                for
                                use. In
                                software development, for example, go-live is the point at which code moves from the test
                                environment to the production environment.
                                class. This is the second item's accordion body. Let's imagine this
                                being filled with some actual content.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item" id="land" data-aos="fade-up">
                        <h2 class="accordion-header">
                            <button id="two" class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseThree" aria-expanded="false"
                                aria-controls="flush-collapseThree">
                                How often does your team provide builds ?
                            </button>
                        </h2>
                        <div id="flush-collapseThree" class="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample">
                            <div id="three" class="accordion-body">Good teamwork is one of the key components that leads a
                                business to
                                success.
                                class. This is the third item's accordion body. The ability to hire
                                the right people and build a successful and powerful team determines the long-term success
                                of
                                any
                                organisation.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item" id="land" data-aos="fade-up">
                        <h2 class="accordion-header">
                            <button id="two" class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseFour" aria-expanded="false"
                                aria-controls="flush-collapseThree">
                                Does ECS only work with established companies ?
                            </button>
                        </h2>
                        <div id="flush-collapseFour" class="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample">
                            <div id="three" class="accordion-body">Loan providers use this facility to debit loan EMIs on a
                                fixed date from
                                the
                                bank account of the borrower.
                                This is the Four item's accordion body. Nothing more exciting
                                happening here in terms of content, This is done with the help of a clearinghouse. In India,
                                ECS
                                debit is mostly handled by the NACH
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item" id="land" data-aos="fade-up">
                        <h2 class="accordion-header">
                            <button id="two" class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseFive" aria-expanded="false"
                                aria-controls="flush-collapseThree">
                                How many resources are allocated to the project ?
                            </button>
                        </h2>
                        <div id="flush-collapseFive" class="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample">
                            <div id="three" class="accordion-body">Resource allocation is the process of assigning and
                                managing
                                assets in a
                                manner that supports an organization's strategic planning goals.
                                This is the Five item's accordion body.Resource allocation
                                includes managing tangible assets such as hardware to make the best use of softer assets
                                such as
                                human capital.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section2;