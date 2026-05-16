import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RouteScroller from "./RouteScroller";

export default function Layout() {
  return (
    <>
      <RouteScroller />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
