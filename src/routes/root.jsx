import { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
} from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="navigation-bar">
        <div class="p-10 h-screen">
          <h1 class="text-xl font-semibold">Rick And Morty</h1>
          <div class="navigation-item pt-5">
            <NavLink to={`contact`}>
              <button class="btn btn-primary w-full">Contact</button>
            </NavLink>
          </div>
        </div>
      </div>
      <div class="flex w-full">
        <Outlet />
      </div>
    </>
  );
}
