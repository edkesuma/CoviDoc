import React from 'react';
import PageNavbar from "../../Components/Landing/PageNavbar.jsx";
import PageFooter from "../../Components/Landing/PageFooter.jsx";
import videoThumbnail from "../../assets/videoThumbnail.jpg";

function ProductPage() {
    return (
        <div>
            <PageNavbar />

            <div className='p-5' />

            <div className='mx-5 md:mx-20 text-center md:text-start'>
                <p className='text-lg text-cyan-400'>PRODUCT DEMO</p>
                <br />
                <p className="font-bold text-3xl md:text-5xl">Getting Started</p>
                <br />
                <p className='text-xl'>
                    Here’s a quick demo of CoviDoc to help you explore all its features and see how it works in action.
                </p>
            </div>

            <div className='p-5'></div>

            <div className='flex justify-center relative px-4'>
                <a href="https://drive.google.com/file/d/1TaDLbtUg9n9MPmox6cY0E6yK42zCvFTm/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                    <img
                        src={videoThumbnail}
                        alt="Product Demo Video"
                        className="cursor-pointer w-full max-w-5xl h-auto"
                        title="Click to watch full video"
                    />
                </a>
            </div>

            <div className='p-8'></div>

            <div className='mx-5 md:mx-20 text-center md:text-start'>
                <p className='text-lg text-cyan-400'>GOOGLE DRIVE</p>
                <br />
                <p className="font-bold text-3xl md:text-5xl">Project Link</p>
                <br />
                <p className='text-xl'>
                    For detailed documentation and resources, please click&nbsp;
                    <span className='hover:underline'>
                        <a
                            href="https://drive.google.com/drive/folders/1zbLmrzmOP7DgKPPxMvYTLoZiK8VVZPCl?usp=drive_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400"
                        >
                            here
                        </a>
                    </span>
                    &nbsp;to access our Google Drive folder.
                </p>
            </div>

            <div className='p-14' />

            <PageFooter />
        </div>
    );
}

export default ProductPage;