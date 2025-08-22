import React from "react";
import { useLocation } from "react-router-dom";
import { Footer, Navbar, NavFooter } from "../";

const ConditionalLayout = ({ children }) => {
  const location = useLocation();

  const hideNavbarPaths = ["/apartments/:id", "/wishlist"];
  const hideFooterPaths = ["/apartments/:id", "/wishlist"];
  const darkBackgroundPaths = ["/about"];

  const pathMatches = (pathsArray) => {
    return pathsArray.some((path) => {
      const regex = new RegExp("^" + path.replace(":id", "\\d+") + "$");
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
