import React from "react";
import { useLocation } from "react-router-dom";
import { Footer, Navbar, NavFooter } from "../";

const ConditionalLayout = ({ children }) => {
  const location = useLocation();

  const hideNavbarPaths = [];
  const hideFooterPaths = ["/wishlist", "/buildings/:id", "/"];
  const darkBackgroundPaths = ["/about"];

  const pathMatches = (pathsArray) => {
    const pathToRegex = (path) => {
      const parts = path.split('/').map((seg) => {
        if (!seg) return '';
        if (seg.startsWith(':')) return '[^/]+';
        return seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      });
      return new RegExp('^' + parts.join('/') + '/?$');
    };

    return pathsArray.some((path) => {
      const regex = pathToRegex(path);
      return regex.test(location.pathname);
    });
  };

  const shouldHideNavbar = pathMatches(hideNavbarPaths);
  const shouldHideFooter = pathMatches(hideFooterPaths);
  const hasDarkBackground = pathMatches(darkBackgroundPaths);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {!shouldHideNavbar && <NavFooter darkBackground={hasDarkBackground} />}
      {children}
      {!shouldHideFooter && <Footer />}
    </>
  );
};

export default ConditionalLayout;
