// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FiMenu, FiUser } from "react-icons/fi";
// import { IoMdArrowDropdown } from "react-icons/io";
// import {
//   MdKeyboardDoubleArrowLeft,
//   MdKeyboardDoubleArrowRight,
// } from "react-icons/md";
// import { useSelector } from "react-redux";
// import ProfileImg from "../assets/Logo/ltx9i2fys9l91.png";

// function NavBar({ toggleSidebar, isOpen, handleLogin }) {
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   console.log(isLoggedIn);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     if (isLoggedIn) {
//       const fetchUserData = async () => {
//         try {
//           const response = await axios.get("/api/v1/user");
//           setUserData(response.data);
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchUserData();
//     }
//   }, [isLoggedIn]);

//   const handleLogout = async () => {
//     try {
//       await axios.post("/api/v1/logout");
//       window.location.reload();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const [modalOpen, setModalOpen] = useState(false);
//   const toggleModalOpen = () => {
//     setModalOpen(!modalOpen);
//   };

//   // if (loading) {
//   //   return (
//   //     <div>
//   //       Loading
//   //     </div>
//   //   );
//   // }

//   return (
//     <nav className="bg-[#FFFFFF] px-4 py-3">
//       <div className="flex items-center justify-between">
//         <button
//           onClick={toggleSidebar}
//           className="text-[#333333] lg:block hidden bg-[#FF5722] hover:bg-[#FF5727] p-2 rounded-lg focus:outline-none"
//         >
//           {isOpen ? (
//             <MdKeyboardDoubleArrowLeft className="text-xl" />
//           ) : (
//             <MdKeyboardDoubleArrowRight />
//           )}
//         </button>

//         <button
//           onClick={toggleModalOpen}
//           className="text-[#333333] block lg:hidden bg-gray-700 hover:bg-gray-600 p-2 rounded-lg focus:outline-none"
//         >
//           <FiMenu className="text-xl" />
//         </button>
//         {isLoggedIn && (
//           <div className="flex-1 text-center text-[#333333] text-lg font-semibold">
//             Hi, {userData?.name}
//           </div>
//         )}
//         {!isLoggedIn && (
//           <div className="flex-1 text-center text-[#333333] text-lg font-semibold">
//             Hi, Guest
//           </div>
//         )}

//         {!isLoggedIn && (
//           <div>
//             <button
//               onClick={handleLogin}
//               className="flex border-2 border-[#FF5722] hover:border-s-fuchsia-400 rounded-md p-1 px-2 justify-center items-center gap-2"
//             >
//               <FiUser size={24} className="text-[#333333]" />
//               <span className="text-lg text-[#333333]">Login</span>
//             </button>
//           </div>
//         )}
//         {isLoggedIn && (
//           <div className="relative">
//             <button
//               onClick={toggleDropdown}
//               className="flex items-center gap-2 text-white  rounded-lg focus:outline-none"
//             >
//               <img
//                 src={ProfileImg}
//                 alt="User Avatar"
//                 className="w-12 h-12 rounded-full"
//               />
//               {/* <IoMdArrowDropdown className="text-xl" /> */}
//             </button>

//             {dropdownOpen && (
//               <div className="absolute right-1 mt-4 bg-white text-gray-800 shadow-lg rounded-lg w-48">
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-4 rounded-lg hover:bg-gray-100 text-sm"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {modalOpen && (
//         <div>
//           <div
//             className={`relative z-50 transition-opacity duration-300 ${
//               menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//             }`}
//           >
//             <div
//               className={`fixed inset-0 bg-gray-800/75 backdrop-blur-sm ${
//                 menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//               }`}
//               onClick={handleLinkClick}
//             />
//             <div
//               className={`fixed inset-y-0 left-0 w-4/5 bg-white dark:bg-gray-800 transform ${
//                 menuOpen ? "translate-x-0" : "-translate-x-full"
//               } transition-transform duration-300 ease-in-out`}
//             >
//               <div className="relative flex flex-col h-full">
//                 <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
//                   <div>
//                     <img src={Logo} alt="Logo" className=" w-52" />
//                   </div>
//                   <button
//                     className="text-gray-600 dark:text-gray-100"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     <TbArrowLeftToArc className="h-7 w-7" />
//                   </button>
//                 </div>
//                 <div className="p-4 flex-1 overflow-y-auto">
//                   <ul>
//                     <li>
//                       <Link
//                         to="/"
//                         onClick={handleLinkClick}
//                         className="block px-4 py-2 font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                       >
//                         <FaHome className="inline mr-2" /> Home
//                       </Link>
//                     </li>

//                     {/* Mobile Dropdowns */}
//                     {Object.keys(MobileNav).map((key) => (
//                       <li key={key}>
//                         <button
//                           onClick={() => toggleDropdown(key)}
//                           className="w-full flex justify-between items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                         >
//                           <div className="flex font-bold items-center">
//                             {MobileNav[key].icon}
//                             <span className="ml-2">{MobileNav[key].label}</span>
//                           </div>
//                           <svg
//                             className={`w-4 h-4 ml-auto transform transition-transform ${
//                               activeDropdown === key ? "rotate-180" : "rotate-0"
//                             }`}
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <path d="M19 9l-7 7-7-7" />
//                           </svg>
//                         </button>
//                         <ul
//                           className={`${
//                             activeDropdown === key ? "block" : "hidden"
//                           } pl-8 mt-2`}
//                         >
//                           {MobileNav[key].links.map((link) => (
//                             <li key={link.to}>
//                               <Link
//                                 to={link.to}
//                                 onClick={() => {
//                                   handleLinkClick();
//                                   // setActiveDropdown(null); // Close the dropdown
//                                 }}
//                                 className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                               >
//                                 {link.label}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </li>
//                     ))}

//                     {/* Items without Dropdown */}
//                     <li>
//                       <Link
//                         to="/blog"
//                         onClick={handleLinkClick}
//                         className="block px-4 py-2 font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                       >
//                         <ImBlog className="inline mr-2" /> Blog
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/about"
//                         onClick={handleLinkClick}
//                         className="block px-4 py-2 font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                       >
//                         <CgProfile className="inline mr-2" /> About Us
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/safety"
//                         onClick={handleLinkClick}
//                         className="block px-4 py-2 font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                       >
//                         <AiOutlineSafety className="inline mr-2" /> Safety
//                       </Link>
//                     </li>
//                     <div className=" flex justify-center items-center mt-4 pt-10 border-t">
//                       <Link
//                         to="https://www.github.com/flexigeekshub"
//                         target="_blank"
//                         onClick={handleLinkClick}
//                         className="py-1.5 px-3 mt-1.5 mr-0.5 text-center bg-blue-100 border border-gray-300 rounded-md text-black hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-700"
//                       >
//                         <FiGithub className="inline mr-2" /> Contribute on
//                         GitHub
//                       </Link>
//                     </div>
//                   </ul>
//                 </div>
//                 {/* <div className="pb-3 flex justify-center items-center border-gray-200  dark:border-gray-600">
//                 {isLogged ? (
//                   <button
//                     className="block px- py- bg-blue-500 text-white border-2 border-blue-500 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 hover:border-blue-600"
//                     onClick={() => {
//                       logout();
//                       handleLinkClick();
//                     }}
//                   >
//                     <IoLogOutOutline className="inline mr-2" /> Log out
//                   </button>
//                 ) : (
//                   <Stack direction="row" spacing={2}>
//                     <Link to="/login" className=" py-2 mb-1">
//                       <Button variant="outlined" endIcon={<FaArrowRightLong size={13}/>}>Log In</Button>
//                     </Link>
//                   </Stack>
//                 )}
//               </div> */}
//                 <div className="text-center w-full text-[12px] p-1 border-t">
//                   <p className="w-full">
//                     Copyright &copy; {year} FlexiGeeks. All right reserved
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default NavBar;

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FiHeart,
  FiHome,
  FiLogIn,
  FiMenu,
  FiSearch,
  FiUpload,
  FiUser,
} from "react-icons/fi";
import {
  MdClose,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { useSelector } from "react-redux";
import ProfileImg from "../assets/Logo/ltx9i2fys9l91.png";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo/Dark-Logo.png";
import { toast } from "react-toastify";

function NavBar({ toggleSidebar, isOpen, handleLogin, openUpload }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleModalOpen = () => setModalOpen(!modalOpen);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get("/api/v1/user");
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/logout");
      window.location.reload();
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error logging out");
    }
  };

  return (
    <nav className="bg-[#FFFFFF] px-4 py-3 relative">
      <div className="flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="text-[#333333] lg:block hidden bg-[#FF5722] hover:bg-[#FF5727] p-2 rounded-lg focus:outline-none"
        >
          {isOpen ? (
            <MdKeyboardDoubleArrowLeft className="text-xl" />
          ) : (
            <MdKeyboardDoubleArrowRight />
          )}
        </button>

        <button
          onClick={toggleModalOpen}
          className="text-[#333333] block lg:hidden bg-[#FF5722] hover:bg-[#FF5727] p-2 rounded-lg focus:outline-none"
        >
          <FiMenu className="text-xl" />
        </button>

        {isLoggedIn ? (
          <div className="flex-1 text-center text-[#333333] text-lg font-semibold">
            Hi, {userData?.name}
          </div>
        ) : (
          <div className="flex-1 text-center text-[#333333] text-lg font-semibold">
            Hi, Guest
          </div>
        )}

        {!isLoggedIn ? (
          <div>
            <button
              onClick={handleLogin}
              className="flex border-2 border-[#FF5722] hover:border-[#FF5727] rounded-md p-1 px-2 justify-center items-center gap-2"
            >
              <FiUser size={24} className="text-[#333333]" />
              <span className="text-lg text-[#333333]">Login</span>
            </button>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 rounded-lg focus:outline-none"
            >
              <img
                src={ProfileImg}
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-1 mt-4 bg-white text-gray-800 shadow-lg rounded-lg w-48">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-4 rounded-lg hover:bg-gray-100 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 transition-opacity duration-300"
            onClick={toggleModalOpen}
          />
          <div
            className={`fixed inset-y-0 left-0 w-4/5 bg-white dark:bg-gray-800 transform ${
              modalOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-2 mt-3 border-b border-gray-200 dark:border-gray-600">
                {/* <h2 className="text-xl font-extrabold text-gray-800 dark:text-white tracking-wide"> */}
                <img src={Logo} alt="" className="w-[45vw]" />
                {/* </h2> */}
                <button
                  onClick={toggleModalOpen}
                  className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                >
                  <MdClose size={24} />
                </button>
              </div>

              <div className="p-4 flex-1 overflow-y-auto">
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/"
                      onClick={toggleModalOpen}
                      className="flex items-center gap-4 px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors "
                    >
                      <FiHome size={24} />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/search"
                      onClick={toggleModalOpen}
                      className="flex items-center gap-4 px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors "
                    >
                      <FiSearch size={24} />
                      Search
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/favourite"
                      onClick={toggleModalOpen}
                      className="flex items-center gap-4 px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors "
                    >
                      <FiHeart size={24} />
                      Favorites
                    </Link>
                  </li>
                  <div className="w-full border-b-2"></div>
                  <li>
                    {isLoggedIn && (
                      <button
                        onClick={() => {
                          toggleModalOpen();
                          openUpload();
                        }}
                        className="flex items-center gap-4 px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors "
                      >
                        <FiUpload size={24} />
                        Upload
                      </button>
                    )}
                    {!isLoggedIn && (
                      <Link
                        to="/"
                        onClick={() => {
                          toggleModalOpen();
                          handleLogin();
                        }}
                        className="flex items-center gap-4 px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors "
                      >
                        <FiUpload size={24} />
                        Upload
                      </Link>
                    )}
                  </li>
                  {isLoggedIn && (
                    <li>
                      <Link
                        to="/profile"
                        onClick={toggleModalOpen}
                        className="flex items-center gap-4 px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors "
                      >
                        <FiUser size={24} />
                        Profile
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              <div className="">
                {!isLoggedIn && (
                  <button className="w-full p-1">
                    <Link
                      to="/"
                      onClick={() => {
                        toggleModalOpen();
                        handleLogin();
                      }}
                      className="flex items-center gap-3 px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-all"
                    >
                      <FiLogIn size={24} />
                      Login
                    </Link>
                  </button>
                )}
                {isLoggedIn && (
                  <button className="w-full p-1">
                    <Link
                      to="/"
                      onClick={() => {
                        toggleModalOpen();
                        handleLogout();
                      }}
                      className="flex items-center gap-3 px-4 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition-all"
                    >
                      <FiLogIn size={24} />
                      Logout
                    </Link>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
