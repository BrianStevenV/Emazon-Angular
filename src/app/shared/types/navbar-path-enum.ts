import { ROUTE_BRAND, ROUTE_CATEGORY, ROUTE_HOME, ROUTE_LOGIN, ROUTE_PRODUCT } from "src/app/core/constants/routing.constants";

export const NavbarPaths = [
    { path: ROUTE_HOME, title: 'Home' },
    { path: ROUTE_CATEGORY, title: 'Categories' },
    { path: ROUTE_BRAND, title: 'Brands' },
    { path: ROUTE_PRODUCT, title: 'Products' },
    { title: 'Cart' },
    { path: ROUTE_LOGIN, title: 'Log Out' }
  ];
  