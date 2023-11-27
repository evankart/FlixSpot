import { Link } from "react-router-dom";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar(props) {
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();

  function toggleMobileMenu() {
    document.querySelector("#menu-dropdown-div").classList.toggle("hidden");
  }
  let profilePicture;

  if (props.profilePicture) {
    profilePicture = props.profilePicture;
  } else {
    profilePicture =
      "https://images.unsplash.com/photo-1523730205978-59fd1b2965e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=908&q=80";
  }
  // https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80
  return (
    <>
      <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                {/* <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          --> */}
                <svg
                  class="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  onClick={toggleMobileMenu}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          --> */}
                <svg
                  class="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex flex-shrink-0 items-center">
                <a href="/">
                  <img
                    class="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </a>
              </div>
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">
                  <Link
                    to={"/"}
                    aria-current="page"
                    className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Home
                  </Link>

                  {user ? (
                    <Link
                      to={"/profile"}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Profile
                    </Link>
                  ) : null}
                </div>
              </div>
              {user ? (
                <p class="ml-auto text-gray-300   rounded-md px-3 py-2 text-sm font-medium">
                  Hi, {user.given_name ? user.given_name : user.name}
                </p>
              ) : (
                <button
                  className="hidden sm:block ml-auto text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  onClick={loginWithRedirect}
                >
                  Log in
                </button>
              )}
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <!-- Profile dropdown --> */}
              <div class="relative ml-3">
                <div>
                  <button
                    type="button"
                    class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="h-8 w-8 rounded-full"
                      src={profilePicture}
                      alt=""
                      onClick={() => {
                        let menu = document.getElementById("profile-dropdown");
                        menu.classList.toggle("hidden");
                      }}
                    />
                  </button>
                </div>

                {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
                <div
                  id="profile-dropdown"
                  class="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                >
                  {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                  <a
                    href="/profile"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </a>
                  <a
                    href="/settings"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>

                  {user ? (
                    <button
                      onClick={logout}
                      class="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="user-menu-item-2"
                    >
                      Logout User
                    </button>
                  ) : (
                    <button
                      class="block px-4 py-2 text-sm text-gray-700"
                      onClick={loginWithRedirect}
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div class="sm:hidden" id="mobile-menu">
          <div
            id="menu-dropdown-div"
            class="hidden space-y-1 px-2 pb-3 pt-2 absolute z-50 bg-gray-800 w-screen rounded-b-lg"
          >
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <a
              href="/"
              class=" hover:bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Home
            </a>
            <a
              href="/flowers"
              class="text-gray-300 hover:bg-gray-900 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Flowers
            </a>
            <a
              href="/map"
              class="text-gray-300 hover:bg-gray-900 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Map
            </a>
            {!user ? (
              <button
                class="text-gray-300 hover:bg-gray-900 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                onClick={loginWithRedirect}
              >
                Login
              </button>
            ) : (
              <button
                class="text-gray-300 hover:bg-gray-900 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                onClick={logout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
