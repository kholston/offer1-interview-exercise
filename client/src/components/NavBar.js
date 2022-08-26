import React from "react";
function NavBar() {
  return (
    <header className="bg-white">
      <div className="flex items-center h-16 max-w-screen-xl gap-8 px-4 mx-auto sm:px-6 lg:px-8">
        <a className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>
          <h2>Real Estate App</h2>
        </a>

        <div className="flex items-center justify-end flex-1 md:justify-between">
          <nav className="hidden md:block" aria-labelledby="header-navigation">
            <h2 className="sr-only" id="header-navigation">
              Header navigation
            </h2>

            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/"
                >
                  Homes
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
