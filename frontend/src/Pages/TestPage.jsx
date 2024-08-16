import { Card } from "flowbite-react";
import TestButton from "../Components/TestButton";

import dogImage from '../assets/dog.jpeg'

function TestPage() {
  return (
    <div>
      <TestButton />
      <Card
        className="max-w-sm"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={dogImage}
      >
        <h5 className="text-2xl font-bold tracking-tight text-amber-400 dark:text-white">
          Noteworthy technology acquisitions 2021 gfvdhbjscdk
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
      </Card>
    </div>
    
  );
}

export default TestPage;
