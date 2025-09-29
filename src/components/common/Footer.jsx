import React from "react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { ImLinkedin } from "react-icons/im";
import { AiFillTikTok } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="bg-primary text-white w-full h-full flex flex-col items-center justify-center py-10">
      <div className="base-width flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 py-12">
        <div className="w-1/3 flex flex-col axiforma-thin text-center md:text-left gap-4 md:gap-0">
          <img src="/projektet/assets/images/brand/fullLogo.png" alt="logo" className="h-48 object-contain" />
        </div>
        <div className="w-2/3 flex items-center justify-end flex-wrap gap-4">
          <div className="flex gap-4">
            <NavLink to="/" className="text-lg text-white/50 hover:text-secondary text-nowrap duration-300">
              Ballina
            </NavLink>
            <NavLink to="/about" className="text-lg text-white/50 hover:text-secondary text-nowrap duration-300">
              Rreth nesh
            </NavLink>
            <NavLink to="/" className="text-lg text-white/50 hover:text-secondary text-nowrap duration-300">
              Benefitet
            </NavLink>
            <NavLink to="/gallery" className="text-lg text-white/50 hover:text-secondary text-nowrap duration-300">
              Galeria
            </NavLink>
            <NavLink to="/contact" className="text-lg text-white/50 hover:text-secondary text-nowrap duration-300">
              Na kontaktoni
            </NavLink>
          </div>
          <div className="flex gap-4">
            <a className="text-white border border-secondary border-[1px] px-12 py-4 rounded-full font-semibold text-nowrap">Instagram</a>
            <a className="text-white border border-secondary border-[1px] px-12 py-4 rounded-full font-semibold text-nowrap">facebook</a>
            <a className="text-white border border-secondary border-[1px] px-12 py-4 rounded-full font-semibold text-nowrap">linkedin</a>
          </div>
        </div>
      </div>
      <div
        className="base-width flex justify-between items-center gap-6 border-t border-b py-12"
        style={{
          borderColor: 'transparent',
          borderImageSlice: 1,
          borderImageSource:
            "repeating-linear-gradient(90deg, #E4AB8E 0 10px, transparent 10px 20px)",
        }}
      >
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
      <div className="base-width flex flex-col md:flex-row items-center justify-between pt-6 gap-4 md:gap-0">
        <div className="text-secondaryTxt text-sm">
          © Zambaku Residence 2025. All rights reserved.
        </div>
        <div className="text-secondaryTxt text-sm flex gap-4">
          <a href="#" className="hover:text-secondary duration-300">
            Termet dhe Kushtet
          </a>
          <a href="#" className="hover:text-secondary duration-300">
            Politika e Privatësisë
          </a>
        </div>
        <button
          className="px-16 py-4 bg-secondary rounded-full flex items-center gap-2 text-primary hover:opacity-90 duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1L7 15M7 1L13 7M7 1L1 7" stroke="#00345B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
