import React from 'react';
import { Link } from "react-router-dom";

const Navbar = ({ settingsBtn, toggleVisibility }) => {

  return (
    <>

      <nav className="bg-transparent border-gray-200 px-2 sm:px-6 py-4 rounded dark:bg-gray-800 text-white">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div className='flex items-center'>



            <Link className="flex items-center" to="/">


              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                pomoprogress
              </span>

            </Link>
          </div>


          <button
            data-collapse-toggle="mobile-menu"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-white-500 rounded-lg md:hidden hover:bg-white-100 focus:outline-none focus:ring-2 focus:ring-white-200 dark:text-white-400 dark:hover:bg-white-700 dark:focus:ring-white-600"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>



          <div className="hidden w-full md:block md:w-auto items-center" id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium text-white">
              <li>
                <Link className="block py-2 pr-4 pl-3 bg-blue-700 rounded md:bg-transparent text-white md:p-0 " to="/">Home</Link>


              </li>
          

              <li className='sm:hidden md:list-item'>


                {settingsBtn}
              </li>
              <li className='border-b border-gray-100 md:border-0 text-white md:hidden '>
             

                <button
                onClick={toggleVisibility}
                  type="button"
                  className="block py-2 pr-4 pl-3 hover:bg-gray-50 md:hidden md:hover:bg-transparent  md:p-0  md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-white "
                
                >
                    Settings

                </button>
              </li>
                  <li>    

        

         
            </li>

            </ul>
          </div>
        </div>
      </nav>

    </>

  )
}

export default Navbar