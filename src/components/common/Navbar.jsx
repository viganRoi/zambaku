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
      <nav className={`fixed top-0 left-0 w-full h-32 flex items-center justify-center z-50  duration-300 ${isOpen || isScrolled ? "bg-primary shadow-xl" : "bg-transparent"}`}>
        <div className="base-width hidden md:flex items-center justify-between">
          <div className="w-1/3 flex items-center gap-8">
            <button
              onClick={() => setIsOpen(!isOpen)}
              disabled={isOpen}
              className="relative inline-flex items-center justify-center px-12 py-3 overflow-hidden text-white group-hover:text-primary transition-colors duration-300 bg-transparent rounded-full group text-nowrap border border-secondary"
            >
              <span className="absolute left-1/2 -bottom-40 -translate-x-1/2 w-0 h-0 transition-all duration-700 ease-out bg-secondary rounded-full group-hover:w-72 group-hover:h-72 z-0"></span>
              <span className="relative z-10 flex gap-2"><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
                <path d="M4 18.5C3.71667 18.5 3.47934 18.404 3.288 18.212C3.09667 18.02 3.00067 17.7827 3 17.5C2.99934 17.2173 3.09534 16.98 3.288 16.788C3.48067 16.596 3.718 16.5 4 16.5H20C20.2833 16.5 20.521 16.596 20.713 16.788C20.905 16.98 21.0007 17.2173 21 17.5C20.9993 17.7827 20.9033 18.0203 20.712 18.213C20.5207 18.4057 20.2833 18.5013 20 18.5H4ZM4 13.5C3.71667 13.5 3.47934 13.404 3.288 13.212C3.09667 13.02 3.00067 12.7827 3 12.5C2.99934 12.2173 3.09534 11.98 3.288 11.788C3.48067 11.596 3.718 11.5 4 11.5H20C20.2833 11.5 20.521 11.596 20.713 11.788C20.905 11.98 21.0007 12.2173 21 12.5C20.9993 12.7827 20.9033 13.0203 20.712 13.213C20.5207 13.4057 20.2833 13.5013 20 13.5H4ZM4 8.5C3.71667 8.5 3.47934 8.404 3.288 8.212C3.09667 8.02 3.00067 7.78267 3 7.5C2.99934 7.21733 3.09534 6.98 3.288 6.788C3.48067 6.596 3.718 6.5 4 6.5H20C20.2833 6.5 20.521 6.596 20.713 6.788C20.905 6.98 21.0007 7.21733 21 7.5C20.9993 7.78267 20.9033 8.02033 20.712 8.213C20.5207 8.40567 20.2833 8.50133 20 8.5H4Z" fill="currentColor" />
              </svg>MENU</span>
            </button>
            <button
              onClick={() => navigate("/apartments")}
              className="relative inline-flex items-center justify-center px-12 py-3 overflow-hidden text-white bg-transparent rounded-full group text-nowrap border border-secondary"
            >
              <span className="absolute left-1/2 -bottom-40 -translate-x-1/2 w-0 h-0 transition-all duration-700 ease-out bg-secondary rounded-full group-hover:w-72 group-hover:h-72 z-0"></span>
              <span className="relative z-10">Selekto Apartmentin</span>
            </button>
          </div>
          <NavLink to="/">
            <img
              src={`${isScrolled ? "/projektet/assets/images/brand/logo.png" : "/projektet/assets/images/brand/logo.png"}`}
              alt="logo"
              className="h-24 mx-auto"
            />
          </NavLink>
          <div className="w-1/3 flex items-center justify-end gap-4 text-white" >
            <button
              onClick={() => navigate("/buildings")}
              className="relative inline-flex items-center justify-center px-12 py-3 overflow-hidden text-white bg-transparent rounded-full group text-nowrap border border-secondary"
            >
              <span className="absolute left-1/2 -bottom-40 -translate-x-1/2 w-0 h-0 transition-all duration-700 ease-out bg-secondary rounded-full group-hover:w-72 group-hover:h-72 z-0"></span>
              <span className="relative z-10">Turi Vizual</span>
            </button>
            <button
              className="px-12 py-3 rounded-full bg-secondary border border-secondary text-primary text-nowrap"
              onClick={() => navigate("/contact")}
            >
              Na Kontaktoni
            </button>
          </div>
        </div>
        <div className="w-11/12 flex md:hidden items-center justify-between">
          <NavLink to="/" className='w-1/3 flex items-center justify-start'>
            <img
              src="/projektet/assets/images/brand/logo.png"
              alt="Zambaku Residence"
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
              className={`text-base text-white gap-2 py-3 rounded-lg hover:opacity-90 duration-300 text-nowrap text-sm flex items-center justify-center`}
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
        className={`fixed top-0 left-0 w-full h-[85vh] md:h-[80vh] bg-primary z-50 md:z-50 transform 
          ${isOpen ? "translate-y-0 md:translate-y-0" : "-translate-y-full"} transition-transform duration-1000 ease-in-out flex flex-col rounded-b-[160px] px-20 py-12 gap-20`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 cursor-pointer z-60 p-3 rounded-full bg-primary"
        >
          <AiOutlineClose className="text-white text-2xl" />
        </button>
        <div className="w-full flex items-center justify-between text-white">
          <img src="/projektet/assets/images/brand/whiteLogo.png" alt="" className="object-contain h-36" />
          <div className="w-full flex items-center justify-end gap-4">
            <button
              onClick={() => navigate("/apartments")}
              className="relative inline-flex items-center justify-center px-12 py-3 overflow-hidden text-white bg-transparent rounded-full group text-nowrap border border-secondary"
            >
              <span className="absolute left-1/2 -bottom-40 -translate-x-1/2 w-0 h-0 transition-all duration-700 ease-out bg-secondary rounded-full group-hover:w-72 group-hover:h-72 z-0"></span>
              <span className="relative z-10">Selekto Apartmentin</span>
            </button>
            <button
              onClick={() => navigate("/buildings")}
              className="relative inline-flex items-center justify-center px-12 py-3 overflow-hidden text-white bg-transparent rounded-full group text-nowrap border border-secondary"
            >
              <span className="absolute left-1/2 -bottom-40 -translate-x-1/2 w-0 h-0 transition-all duration-700 ease-out bg-secondary rounded-full group-hover:w-72 group-hover:h-72 z-0"></span>
              <span className="relative z-10 underline">Turi Vizual</span>
            </button>
          </div>
        </div>
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center">
          <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-start gap-6 text-4xl font-light text-white relative border-r border-secondary ">
            <NavLink
              to="/about"
              className="w-full cursor-pointer z-20 md:opacity-80 hover:opacity-100 duration-300 anya text-3xl md:text-7xl"
              onClick={() => setIsOpen(false)}
            >
              Rreth projektit tone
            </NavLink>
            <NavLink
              to="/"
              className="w-full cursor-pointer z-20 md:opacity-80 hover:opacity-100 duration-300 anya text-3xl md:text-7xl"
              onClick={() => setIsOpen(false)}
            >
              Benefitet
            </NavLink>
            <NavLink
              to="/about"
              className="w-full cursor-pointer z-20 md:opacity-80 hover:opacity-100 duration-300 anya text-3xl md:text-7xl"
              onClick={() => setIsOpen(false)}
            >
              Galeria
            </NavLink>
            <NavLink
              to="/"
              className="w-full cursor-pointer z-20 md:opacity-80 hover:opacity-100 duration-300 anya text-3xl md:text-7xl"
              onClick={() => setIsOpen(false)}
            >
              Kontakti
            </NavLink>
          </div>
          <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center relative">
            <div className="w-full flex items-start justify-start px-20 flex-col gap-10">
              <div className="flex flex-col gap-4">
                <a className="text-white border border-secondary border-[1px] px-12 py-4 rounded-full font-semibold text-nowrap">Instagram</a>
                <a className="text-white border border-secondary border-[1px] px-12 py-4 rounded-full font-semibold text-nowrap">facebook</a>
                <a className="text-white border border-secondary border-[1px] px-12 py-4 rounded-full font-semibold text-nowrap">linkedin</a>
              </div>
              <div className="flex flex-col gap-4 text-white text-2xl">
                <div className="flex items-center gap-2 md:gap-4">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M34.1455 28.5664L27.3705 22.4064C27.0504 22.1149 26.6295 21.9594 26.1968 21.9728C25.7641 21.9862 25.3536 22.1674 25.0521 22.4781L21.0638 26.5797C20.1038 26.3964 18.1738 25.7947 16.1871 23.8131C14.2005 21.8247 13.5988 19.8897 13.4205 18.9364L17.5188 14.9464C17.8295 14.645 18.0107 14.2345 18.0241 13.8018C18.0374 13.3691 17.8819 12.9481 17.5905 12.6281L11.4321 5.85475C11.1405 5.53368 10.7353 5.33892 10.3024 5.31185C9.86951 5.28477 9.44313 5.42751 9.1138 5.70975L5.49714 8.81141C5.20899 9.10061 5.037 9.4855 5.0138 9.89308C4.9888 10.3097 4.51214 20.1797 12.1655 27.8364C18.8421 34.5114 27.2055 34.9997 29.5088 34.9997C29.8455 34.9997 30.0521 34.9897 30.1071 34.9864C30.5144 34.9624 30.8986 34.7898 31.1871 34.5014L34.2871 30.8831C34.5705 30.5548 34.7143 30.1288 34.6878 29.6959C34.6613 29.2631 34.4667 28.8577 34.1455 28.5664Z" fill="#E4AB8E" />
                  </svg>
                  <h1>+ 383 49 123 123</h1>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_257_4691)">
                      <path d="M35.9212 6.66698C35.7697 6.65137 35.6171 6.65137 35.4656 6.66698H4.35451C4.15512 6.67005 3.95704 6.69995 3.76562 6.75587L19.8212 22.7448L35.9212 6.66698Z" fill="#E4AB8E" />
                      <path d="M37.5668 8.21094L21.389 24.3221C20.9726 24.7359 20.4094 24.9683 19.8223 24.9683C19.2352 24.9683 18.672 24.7359 18.2556 24.3221L2.22231 8.33316C2.17302 8.51432 2.14689 8.70099 2.14453 8.88872V31.1109C2.14453 31.7003 2.37866 32.2655 2.79541 32.6823C3.21215 33.099 3.77738 33.3332 4.36675 33.3332H35.4779C36.0672 33.3332 36.6325 33.099 37.0492 32.6823C37.466 32.2655 37.7001 31.7003 37.7001 31.1109V8.88872C37.6912 8.65722 37.6463 8.42853 37.5668 8.21094ZM5.88898 31.1109H4.34453V29.5221L12.4223 21.5109L13.989 23.0776L5.88898 31.1109ZM35.4556 31.1109H33.9001L25.8001 23.0776L27.3668 21.5109L35.4445 29.5221L35.4556 31.1109Z" fill="#E4AB8E" />
                    </g>
                    <defs>
                      <clipPath id="clip0_257_4691">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <h1>info@zambakuresidence.com</h1>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 3.33301C23.9782 3.33301 27.7936 4.91336 30.6066 7.72641C33.4196 10.5395 35 14.3548 35 18.333C35 23.4563 32.2067 27.6497 29.2633 30.658C27.7928 32.1448 26.1882 33.4927 24.47 34.6847L23.76 35.168L23.4267 35.3897L22.7983 35.7897L22.2383 36.1313L21.545 36.5347C21.0744 36.8033 20.5419 36.9446 20 36.9446C19.4581 36.9446 18.9256 36.8033 18.455 36.5347L17.7617 36.1313L16.895 35.598L16.575 35.3897L15.8917 34.9347C14.0381 33.6805 12.3115 32.2482 10.7367 30.658C7.79333 27.648 5 23.4563 5 18.333C5 14.3548 6.58035 10.5395 9.3934 7.72641C12.2064 4.91336 16.0218 3.33301 20 3.33301ZM20 13.333C19.3434 13.333 18.6932 13.4623 18.0866 13.7136C17.48 13.9649 16.9288 14.3332 16.4645 14.7975C16.0002 15.2618 15.6319 15.813 15.3806 16.4196C15.1293 17.0262 15 17.6764 15 18.333C15 18.9896 15.1293 19.6398 15.3806 20.2464C15.6319 20.8531 16.0002 21.4043 16.4645 21.8685C16.9288 22.3328 17.48 22.7011 18.0866 22.9524C18.6932 23.2037 19.3434 23.333 20 23.333C21.3261 23.333 22.5979 22.8062 23.5355 21.8685C24.4732 20.9309 25 19.6591 25 18.333C25 17.0069 24.4732 15.7352 23.5355 14.7975C22.5979 13.8598 21.3261 13.333 20 13.333Z" fill="#E4AB8E" />
                  </svg>
                  <h1>Prizren</h1>
                </div>
              </div>
            </div>
            <img
              src="/projektet/assets/images/hero/bckNav.png"
              alt=""
              className="absolute -bottom-12 -right-64 w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;