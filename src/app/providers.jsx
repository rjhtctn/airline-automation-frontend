import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import GlobalUi from "../components/layout/GlobalUi";

const AppProviders = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
      <GlobalUi />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.875rem",
          },
          success: {
            iconTheme: { primary: "#1a7a4a", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#c0392b", secondary: "#fff" },
          },
        }}
      />
    </BrowserRouter>
  );
};

export default AppProviders;
