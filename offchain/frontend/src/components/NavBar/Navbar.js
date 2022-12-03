import { ConnectButton } from "@web3uikit/web3";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
        <NavLink to="/">
          <h1 className="py-4 px-4 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-300 whitespace-nowrap">
            HealDeSci
          </h1>
        </NavLink>
        <div className="flex flex-row items-center">
          <NavLink className="mr-6 p-6 font-bold" to="/">
            Home
          </NavLink>

          <NavLink className="mr-6 p-6 font-bold" to="/user">
            Sell
          </NavLink>
          <NavLink className="mr-6 p-6 font-bold" to="/consumer">
            Buy
          </NavLink>
          <ConnectButton moralisAuth={false} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
