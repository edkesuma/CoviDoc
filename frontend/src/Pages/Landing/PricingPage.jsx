import React from 'react';
import { Card } from "flowbite-react";
import PageNavbar from "../../Components/Landing/PageNavbar.jsx";
import PageFooter from "../../Components/Landing/PageFooter.jsx";

function PricingPage() {

    return (
        <div>
            <PageNavbar />

            <div className='p-5'/>
            
            <div className='mx-5 md:mx-20 text-center md:text-left'>
                <p className='text-lg text-cyan-400'>SUBSCRIPTION PRICING</p>
                <br/>
                <p className="font-bold text-3xl md:text-5xl">Choose Your Plan</p>
                <br/>
                <p className='text-xl'>
                    Our flexible pricing plans are designed to fit the needs of healthcare 
                    providers, both big and small. <br/>
                    Whether you're just getting started or require consistent, high-volume 
                    diagnostics, we have the right solution for you.
                </p>
            </div>

            <div className='p-4 md:p-8'></div>

            <div className='flex justify-between mx-10 md:mx-36 space-x-0 md:space-x-8 flex-col md:flex-row'>
                {/* free plan */}
                <Card className="w-full md:w-1/3 my-10 hover:border-cyan-100 transition duration-300 hover:shadow-cyan-200 hover:shadow-xl">
                    <h5 className="mb-4 text-lg font-medium text-gray-500">Free</h5>
                    <div className="flex items-baseline text-gray-900">
                        <span className="text-3xl font-semibold">$</span>
                        <span className="text-5xl font-extrabold tracking-tight">0</span>
                    </div>
                    <ul className="my-7 space-y-5">
                    <li className="flex space-x-3">
                            <svg
                                className="h-5 w-5 shrink-0 text-cyan-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-base font-normal leading-tight text-gray-500">
                                Up to 5 free X-ray classifications per month
                            </span>
                        </li>

                        <li className="flex space-x-3">
                            <svg
                                className="h-5 w-5 shrink-0 text-cyan-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-base font-normal leading-tight text-gray-500">
                                Ideal for smaller clinics
                            </span>
                        </li>
                        <li className="flex space-x-3 line-through decoration-gray-500">
                            <svg
                                className="h-5 w-5 shrink-0 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-base font-normal leading-tight text-gray-500">
                                Priority support
                            </span>
                        </li>
                        <li className="flex space-x-3 line-through decoration-gray-500">
                            <svg
                                className="h-5 w-5 shrink-0 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-base font-normal leading-tight text-gray-500">Advanced analytics</span>
                        </li>
                    </ul>
                    <div className='flex justify-center'>
                        <button
                            onClick={() => {
                                window.location.href = `mailto:covidocfyp@gmail.com?subject=Application%20for%20CoviDoc%27s%20Free%20Plan&body=Dear%20Sir%20or%20Madam,%0D%0A%0D%0AI%20would%20like%20to%20apply%20for%20the%20COVID-19%20X-ray%20classification%20service%20provided%20in%20CoviDoc's%20free%20plan.%0D%0A%0D%0AClinic/hospital%20name:%20%0D%0APlan%20type:%20Free%0D%0APerson%20in%20charge:%20%0D%0A%0D%0AThank%20you%20%26%20Best%20Regards%0D%0AName:%20%0D%0AContact%20No:%20`;
                            }}
                            className="w-11/12 py-2 border rounded border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white transition duration-300"
                        >
                            Activate Now
                        </button>
                    </div>
                </Card>

                {/* pay-per-use */}
                <Card className="w-full md:w-1/3 my-10 hover:border-cyan-100 transition duration-300 hover:shadow-cyan-200 hover:shadow-xl">
                    <h5 className="mb-4 text-lg font-medium text-gray-500">Pay-Per-Use</h5>
                    <div className="flex items-baseline text-gray-900">
                        <span className="text-3xl font-semibold">$</span>
                        <span className="text-5xl font-extrabold tracking-tight">1</span>
                        <span className="ml-1 text-xl font-normal text-gray-500">/usage</span>
                    </div>
                    <ul className="my-7 space-y-5">
                    <li className="flex space-x-3">
                            <svg
                                className="h-5 w-5 shrink-0 text-cyan-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-base font-normal leading-tight text-gray-500">
                                Additional X-ray classifications after free limit
                            </span>
                        </li>

                        <li className="flex space-x-3">
                            <svg
                                className="h-5 w-5 shrink-0 text-cyan-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-base font-normal leading-tight text-gray-500">
                                No monthly commitment
                            </span>
                        </li>
                        <li className="flex space-x-3 line-through decoration-gray-500">
                            <svg
                                className="h-5 w-5 shrink-0 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-base font-normal leading-tight text-gray-500">
                                Unlimited classifications
                            </span>
                        </li>
                        <li className="flex space-x-3 line-through decoration-gray-500">
                            <svg
                                className="h-5 w-5 shrink-0 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-base font-normal leading-tight text-gray-500">
                                Priority support
                            </span>
                        </li>
                    </ul>

                    <div className='flex justify-center'>
                        <button
                            onClick={() => {
                                window.location.href = `mailto:covidocfyp@gmail.com?subject=Application%20for%20CoviDoc%27s%20Pay-Per-Use&body=Dear%20Sir%20or%20Madam,%0D%0A%0D%0AI%20would%20like%20to%20apply%20for%20the%20COVID-19%20X-ray%20classification%20service%20provided%20in%20CoviDoc's%20Pay-Per-Use%20plan.%0D%0A%0D%0AClinic/hospital%20name:%20%0D%0APlan%20type:%20Pay-Per-Use%0D%0ANumber%20of%20X-ray%20classifications%20to%20be%20bought:%20%0D%0APerson%20in%20charge:%20%0D%0A%0D%0AThank%20you%20%26%20Best%20Regards%0D%0AName:%20%0D%0AContact%20No:%20`;
                            }}
                            className="w-11/12 py-2 border rounded border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white transition duration-300"
                        >
                            Activate Now
                        </button>
                    </div>
                    
                </Card>

                {/* monthly subscription plan */}
                <Card className="w-full md:w-1/3 my-10 border border-purple-100 shadow-purple-300 shadow-lg transition duration-300 hover:border-purple-200 hover:shadow-purple-500 hover:shadow-xl">
                    <h5 className="mb-4 text-lg font-medium text-gray-500">Monthly</h5>
                    <div className="flex items-baseline text-gray-900">
                        <span className="text-3xl font-semibold">$</span>
                        <span className="text-5xl font-extrabold tracking-tight">50</span>
                        <span className="ml-1 text-xl font-normal text-gray-500">/month</span>
                    </div>
                    <ul className="my-7 space-y-5">
                        <li className="flex space-x-3">
                            <svg
                                className="h-5 w-5 shrink-0 text-purple-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-base font-normal leading-tight text-gray-500">
                                Unlimited X-ray classifications monthly
                            </span>
                        </li>

                        <li className="flex space-x-3">
                            <svg
                                className="h-5 w-5 shrink-0 text-purple-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-base font-normal leading-tight text-gray-500">
                                Priority support (24/7)
                            </span>
                        </li>

                        <li className="flex space-x-3">
                            <svg
                                className="h-5 w-5 shrink-0 text-purple-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-base font-normal leading-tight text-gray-500">
                                Advanced analytics
                            </span>
                        </li>
                        <li className="flex space-x-3">
                            <svg
                                className="h-5 w-5 shrink-0 text-purple-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-base font-normal leading-tight text-gray-500">
                                Ideal for hospitals
                            </span>
                        </li>
                    </ul>

                    <div className='flex justify-center'>
                        <button
                            onClick={() => {
                                window.location.href = `mailto:covidocfyp@gmail.com?subject=Application%20for%20CoviDoc%27s%20Monthly%20Plan&body=Dear%20Sir%20or%20Madam,%0D%0A%0D%0AI%20would%20like%20to%20apply%20for%20the%20COVID-19%20X-ray%20classification%20service%20provided%20in%20CoviDoc's%20Monthly%20plan.%0D%0A%0D%0AClinic/hospital%20name:%20%0D%0APlan%20type:%20Monthly%0D%0APerson%20in%20charge:%20%0D%0A%0D%0AThank%20you%20%26%20Best%20Regards%0D%0AName:%20%0D%0AContact%20No:%20`;
                            }}
                            className="w-11/12 py-2 border rounded border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition duration-300"
                        >
                            Buy Now
                        </button>
                    </div>
                </Card>
            </div>

            <div className='p-10'/>

            <PageFooter />
        </div>
    )
}

export default PricingPage
