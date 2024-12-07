
"use client";

import { Navbar } from "flowbite-react";

export function Component() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="">
        <img src="/img.jpeg" className="mr-3 h-6 sm:h-9 rounded" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Google Flights</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
      
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>

      </Navbar.Collapse>
    </Navbar>
  );
}
