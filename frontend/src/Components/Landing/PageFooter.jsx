"use client";
import { Footer } from "flowbite-react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Logo from '../../assets/logo.jpg'

function PageFooter() {
    return (
        <Footer className="!rounded-none bg-black text-white w-full overflow-x-hidden">
            <div className="w-11/12 mx-auto py-10">
                <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-8 px-6 py-8">
                    <div className='flex flex-col'>
                        <div className='flex flex-row'>
                            <img src={Logo} className='h-16' alt="Logo"/>
                            <p className='text-white text-4xl font-bold ml-2 mt-3'>CoviDoc</p>
                        </div>
                        <p className='hidden md:flex text-white text-xl my-4'>
                            Experience faster, more accurate COVID-19 detection with our cutting-edge AI technology, transforming healthcare one X-ray at a time.
                        </p>
                        <Footer.Copyright href="#" by="CoviDoc 2024. All Rights Reserved." className="text-gray-500 hidden md:flex"/>
                    </div>

                    <div className='flex justify-center pt-4'>
                        <div className='flex flex-col items-center md:items-start'>
                            <Footer.Title title="Quick Links" className="text-white text-2xl"/>
                            <Footer.LinkGroup col>
                                <ul className="list-disc list-inside pl-5">
                                    <Footer.Link href="/" className="text-white text-base">Home</Footer.Link>
                                    <Footer.Link href="/product" className="text-white text-base">Product</Footer.Link>
                                    <Footer.Link href="/pricing" className="text-white text-base">Pricing</Footer.Link>
                                    <Footer.Link href="/about" className="text-white text-base">About</Footer.Link>
                                    <Footer.Link href="/contact" className="text-white text-base">Contact</Footer.Link>
                                </ul>
                            </Footer.LinkGroup>
                        </div>
                    </div>

                    <div className='flex justify-center pt-4'>
                        <div>
                            <p className='text-white text-2xl font-bold text-center md:text-left'>GET IN TOUCH</p>
                            <br/>
                            <div className='flex flex-row items-center justify-center md:justify-start'>
                                <FaPhoneAlt size='16' className='m-2'/>
                                <p className='text-white'>6248 9746</p>
                            </div>
                            <div className='flex flex-row items-center mb-6 justify-center md:justify-start'>
                                <FaEnvelope size='16' className='m-2'/>
                                <p className='text-white'>simge@mymail.sim.sg</p>
                            </div>
                            <Footer.Copyright href="#" by="CoviDoc 2024. All Rights Reserved." className="text-gray-500 md:hidden"/>
                        </div>
                    </div>
                </div>
            </div>
        </Footer>
    );
}

export default PageFooter;

