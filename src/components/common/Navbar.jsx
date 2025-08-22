import React, { useState, useEffect, useRef } from "react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { AiOutlineClose, AiFillTikTok } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import { ImLinkedin } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosHeart, IoIosHeartEmpty, IoIosMenu } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getWishlistCount } from "../../features/wishList/WishlistSlice";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState("EN");
  const [isFlagDropdownOpen, setIsFlagDropdownOpen] = useState(false)
  const wishListItemCount = useSelector(getWishlistCount);
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };


    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const flagToLangMap = {
    EN: "en",
    AL: "al",
    MNE: "mg",
  };

  const handleSelect = (countryCode) => {
    setSelected(countryCode);
    const lang = flagToLangMap[countryCode];
    if (lang) {
      i18n.changeLanguage(lang);
    }
    setIsFlagDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Top Navbar */}
      <nav className={`fixed top-0 left-0 w-full h-20 flex items-center justify-center z-50  duration-300 ${isOpen || isScrolled ? "bg-primary shadow-xl" : "bg-transparent"}`}>
        <div className="w-11/12 hidden md:flex items-center justify-between">
          <div className="w-1/3 flex items-center gap-8">
            <button
              onClick={() => setIsOpen(!isOpen)}
              disabled={isOpen}
              className={`text-base ${isScrolled ? 'text-white' : 'text-white'} gap-2 py-3 rounded-lg hover:opacity-90 duration-300 text-nowrap axiforma-thin text-sm flex items-center justify-center`}
            >
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 fill-white"
              >
                <g id="pin-number">
                  <path d="M0 2.5A1.5 1.5 0 0 0 1.5 4h19a1.5 1.5 0 0 0 0-3h-19A1.5 1.5 0 0 0 0 2.5z" />
                  <path d="M30.5 14h-29a1.5 1.5 0 0 0 0 3h29a1.5 1.5 0 0 0 0-3z" />
                  <path d="M30.5 28h-19a1.5 1.5 0 0 0 0 3h19a1.5 1.5 0 0 0 0-3z" />
                </g>
              </svg>
              MENU
            </button>
            <NavLink to="/">
              <img
                src={`${isScrolled ? "/assets/images/brand/logo.png" : "/assets/images/brand/logo.png"}`}
                alt="Otrant Reef"
                className="h-14 mx-auto"
              />
            </NavLink>
          </div>
          <div className="w-1/3 flex items-center justify-end gap-4 text-white" >
            <button
              onClick={() => navigate("/apartments")}
              className={`${isScrolled ? 'text-white' : 'text-white'} text-base hover:opacity-90 duration-300 text-nowrap axiforma-thin  text-sm uppercase `}
            >
              {t('apartments')}
            </button>
            <button
              onClick={() => navigate("/buildings")}
              className="relative inline-flex items-center justify-center px-12 py-3 overflow-hidden axiforma-thin text-primary bg-secondary rounded-lg group text-sm text-nowrap uppercase"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="relative">{t('interactive')}</span>
            </button>
            {/* Translation*/}
            <NavLink
              to="/wishlist"
              className="relative"
            >
              {wishListItemCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:top-[-10px] sm:right-[-10px] bg-[#042033] border border-white text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {wishListItemCount}
                </span>
              )}
              {wishListItemCount > 0 ? (
                <IoIosHeart className="fill-white text-lg sm:text-2xl" />
              ) : (
                <IoIosHeartEmpty className="fill-white text-lg sm:text-2xl" />
              )}
            </NavLink>
            <div style={{ position: "relative", display: 'inline-block' }}>
              <button onClick={() => setIsFlagDropdownOpen((prev) => !prev)}>
                <p className="text-white">{selected}</p>
              </button>
              {isFlagDropdownOpen && (
                <div style={{ position: 'absolute', top: "40px" }} className="flex flex-col gap-2 items-start">
                  {Object.keys(flagToLangMap)
                    .filter((code) => code !== selected)
                    .map((code) => (
                      <button key={code} onClick={() => handleSelect(code)}>
                        <p className="text-white bg-primary px-2 rounded-full">{code}</p>
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-11/12 flex md:hidden items-center justify-between">
          <NavLink to="/" className='w-1/3 flex items-center justify-start'>
            <img
              src="/assets/images/brand/logo.png"
              alt="Otrant Reef"
              className="h-14 w-full"
            />
          </NavLink>
          <div className="w-full  flex justify-end gap-2 items-center">
            <NavLink
              to="/wishlist"
              className="relative"
            >
              {wishListItemCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:top-[-10px] sm:right-[-10px] bg-primary text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {wishListItemCount}
                </span>
              )}
              {wishListItemCount > 0 ? (
                <IoIosHeart className="fill-white text-2xl" />
              ) : (
                <IoIosHeartEmpty className="fill-white text-2xl" />
              )}
            </NavLink>
            <div style={{ position: "relative", display: 'inline-block' }}>
              <button onClick={() => setIsFlagDropdownOpen((prev) => !prev)}>
                <p className="text-white">{selected}</p>
              </button>
              {isFlagDropdownOpen && (
                <div style={{ position: 'absolute', top: "40px" }}>
                  {Object.keys(flagToLangMap)
                    .filter((code) => code !== selected)
                    .map((code) => (
                      <button key={code} onClick={() => handleSelect(code)}>
                        <p className="text-white">{code}</p>
                      </button>
                    ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`text-base text-white gap-2 py-3 rounded-lg hover:opacity-90 duration-300 text-nowrap axiforma-thin text-sm flex items-center justify-center`}
            >
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 fill-white"
              >
                <g id="pin-number">
                  <path d="M0 2.5A1.5 1.5 0 0 0 1.5 4h19a1.5 1.5 0 0 0 0-3h-19A1.5 1.5 0 0 0 0 2.5z" />
                  <path d="M30.5 14h-29a1.5 1.5 0 0 0 0 3h29a1.5 1.5 0 0 0 0-3z" />
                  <path d="M30.5 28h-19a1.5 1.5 0 0 0 0 3h19a1.5 1.5 0 0 0 0-3z" />
                </g>
              </svg>
            </button></div>
        </div>
      </nav>

      {/* Drawer Menu */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 w-full h-[85vh] md:h-[75vh] bg-primary md:bg-bckLight z-50 md:z-40 transform ${isOpen ? "translate-y-0 md:translate-y-20" : "-translate-y-full"
          } transition-transform duration-1000 ease-in-out flex flex-col`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 cursor-pointer z-60 p-3 rounded-full bg-primary"
        >
          <AiOutlineClose className="text-white text-2xl" />
        </button>
        <div className="w-full h-5/6 flex flex-col md:flex-row items-center justify-center">
          <div className="w-full md:w-1/2 h-2/3 md:h-full flex flex-col items-start gap-6 text-4xl font-light text-white md:text-primary relative">
            <img
              src="/assets/images/hero/bck/1.png"
              alt=""
              className="absolute w-full h-full"
            />
            <div className="absolute top-10 md:hidden w-full p-4 border-b flex gap-4 items-center justify-between">
              {/* <span className={`${isScrolled ? 'text-primary' : 'text-white'} text-base w-1/3`}>MON</span> */}
              <button
                onClick={() => {
                  navigate("/apartments")
                  setIsOpen(false)
                }
                }
                className="md:w-1/3 relative inline-flex items-center justify-center px-6 py-3 overflow-hidden axiforma-thin text-primary bg-white rounded-lg group text-sm text-nowrap uppercase"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-tertiary rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span className="relative">{t('interactive')}</span>
              </button>
              <button
                onClick={() => {
                  navigate("/buildings")
                  setIsOpen(false)
                }
                }
                className={`w-1/3 ${isScrolled ? 'text-primary' : 'text-white'} text-base hover:opacity-90 duration-300 text-nowrap axiforma-thin  text-sm`}
              >
                SELECT AN OBJECT
              </button>
            </div>
            <div className="p-4 pt-32 md:mt-0 md:p-14 flex flex-col gap-2 md:gap-8 items-end justify-end">
              <NavLink
                to="/"
                className="w-full cursor-pointer z-20 md:opacity-80 hover:opacity-100 duration-300 valky text-3xl md:text-5xl underline"
                onClick={() => setIsOpen(false)}
              >
                {t('home')}
              </NavLink>
              <NavLink
                to="/360-virtual"
                className="w-full cursor-pointer z-20 md:opacity-80 hover:opacity-100 duration-300 valky text-3xl md:text-5xl underline"
                onClick={() => setIsOpen(false)}
              >
                {t('virtual')}
              </NavLink>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/3 md:h-full flex items-center justify-center">
            <NavLink
              to="/buildings"
              className="w-full h-full"
              onClick={() => setIsOpen(false)}
            >
              <img
                src="/assets/images/hero/bck/nav-bck.png"
                alt=""
                className="w-full h-full object-cover filter brightness-100 hover:brightness-50 duration-300"
              />
            </NavLink>
          </div>
        </div>
        <div className="md:absolute bottom-0 left-0 border-t border-dark pt-6 w-full h-1/6">
          <div className="w-11/12 mx-auto flex items-start md:items-center justify-between gap-4">
            <div className="w-1/3 flex flex-col gap-1 md:gap-0 items-left">
              <p className="text-white md:text-primary text-sm">{t('phone')}</p>
              <h1 className="text-white md:text-primary text-xs md:text-xl text-nowrap">KS: &nbsp;&nbsp; +383 49 100 109</h1>
              <h1 className="text-white md:text-primary text-xs md:text-xl text-nowrap">MNE: +382 67 501 776</h1>
            </div>
            <div className="w-1/3 hidden md:flex flex-col gap-2 items-center">
              <p className="text-white md:text-primary text-xs md:text-sm">EMAIL</p>
              <h1 className="text-white md:text-primary valky text-sm md:text-3xl text-nowrap">info@otrantreef.com</h1>
            </div>
            <div className="w-1/3 flex flex-col items-end">
              <div className="flex flex-col gap-2">
                <p className="text-white md:text-primary text-sm">{t('socials')}</p>
                <div className="w-full flex gap-4 justify-end">
                  <a
                    href="#"
                    className="text-white md:text-primary  text-base md:text-2xl opacity-40 hover:opacity-90 duration-300"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="#"
                    className="text-white md:text-primary text-base md:text-2xl opacity-40 hover:opacity-90 duration-300"
                  >
                    <RiInstagramFill />
                  </a>
                  <a
                    href="#"
                    className="text-white md:text-primary text-base md:text-2xl opacity-40 hover:opacity-90 duration-300"
                  >
                    <ImLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;