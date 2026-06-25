import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import PassengerNavbar from "../components/layout/PassengerNavbar";
import Footer from "../components/layout/Footer";

const PassengerLayout = () => {
  return (
    <div className="layout layout--passenger">
      <Header variant="passenger" />
      <PassengerNavbar />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PassengerLayout;
