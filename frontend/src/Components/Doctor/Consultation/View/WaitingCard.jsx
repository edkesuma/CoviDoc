"use client";

import {Card, Spinner} from "flowbite-react";
import React from "react";

function WaitingCard() {

    return (
        <div>
            <Card className='flex flex-col items-center text-center max-w-sm'>
                <p className='text-3xl'>
                    Generating results
                </p>
                <div>
                    <Spinner aria-label="Extra large spinner example" size="xl"/>
                </div>
                <p>
                    Please wait for a moment...
                </p>
            </Card>
        </div>
    );
}

export default WaitingCard;