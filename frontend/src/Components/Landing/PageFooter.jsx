"use client";
import {Footer} from "flowbite-react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import Logo from '../../assets/logo.jpg'

function PageFooter() {
    return (
        <Footer className="!rounded-none bg-black text-white">
            <div className="w-11/12 ml-4">
              <div className="grid w-full grid-cols-3 gap-8 px-6 py-8">
                <div className='flex flex-col items-center'>
                  <div className='flex flex-row'>
                    <img src={Logo} className='h-16 mx-4'/>
                    <p className='text-white text-4xl font-bold mt-3 mx-4'>CoviDoc</p>
                  </div>
                  <br/>
                  <p className='text-white text-xl'>Experience faster, more accurate COVID-19 detection with our
                    cutting-edge AI technology, transforming healthcare one X-ray at a time.</p>
                  <br/>
                  <Footer.Copyright href="#" by="CoviDoc 2024. All Rights Reserved." className="text-gray-500"/>
                </div>
                <div className='flex items-center justify-center'>
                  <div>
                    <Footer.Title title="Quick Links" className="text-white text-2xl"/>
                    <Footer.LinkGroup col>
                      <Footer.Link href="/home" className="text-white">•&nbsp;&nbsp;Home</Footer.Link>
                      <Footer.Link href="/about" className="text-white">•&nbsp;&nbsp;About</Footer.Link>
                      <Footer.Link href="contact" className="text-white">•&nbsp;&nbsp;Contact</Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                </div>
                <div className='flex items-center justify-center'>
                  <div>
                    <p className='text-white text-2xl font-bold'>Get In Touch</p>
                    <br/>
                    <div className='flex flex-row items-center'>
                      <FaPhoneAlt size='16' className='m-2'/>
                      <p className='text-white'>6248 9746</p>
                    </div>
                    <div className='flex flex-row items-center mb-6'>
                      <IoIosMail size='20' className='m-2'/>
                      <p className='text-white'>simge@mymail.sim.sg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Footer>
    );
}

export default PageFooter;