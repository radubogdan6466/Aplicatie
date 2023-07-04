import { useState, useEffect } from "react";
import "./App.css";

import { Box } from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import DataProvider from "./context/DataProvider";
import Home from "./components/home/Home";
import CreateAngajat from "./components/angajati/CreateAngajat";
import DetaliiAngajat from "./components/angajati/detaliiAngajat";
import ActualizareAngajat from "./components/angajati/ActualizareAngajat";
import Inregistrare from "./components/sefDepartament/inregistrare";
import Contact from "./components/contact/Contact";
import Login from "./components/login/Login";
import ResponsiveDrawer from "./components/sidebar/Sidebar";
import CosturiSalariale from "./components/costuri/CosturiSalariale";
import InregistrareTichet from "./components/tichete/newTichet";
import Tichete from "./components/tichete/viewAllTichete";
import ViewTichet from "./components/tichete/tichetPage";
import ActualizareTichet from "./components/tichete/tichetUpdate";
import TicheteRezolvate from "./components/tichete/ticheteRezolvate";
import TaxeSalarii from "./components/costuri/TaxeSalarii";
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem("accessToken");
  return isAuthenticated && token ? (
    <>
      <ResponsiveDrawer className="ResponsiveDrawer" />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/account" />
  );
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  useEffect(() => {
    document.body.style.backgroundColor = "#e8e3e3";
  }, []);
  return (
    <DataProvider>
      <BrowserRouter>
        <Box className="MainContent">
          <Routes>
            <Route
              path="/account"
              element={<Login isUserAuthenticated={isUserAuthenticated} />}
            />

            <Route
              path="/"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/" element={<Home />} />
            </Route>

            <Route
              path="/create"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/create" element={<CreateAngajat />} />
            </Route>

            <Route
              path="/detalii-angajat/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/detalii-angajat/:id" element={<DetaliiAngajat />} />
            </Route>

            <Route
              path="/update/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/update/:id" element={<ActualizareAngajat />} />
            </Route>

            <Route
              path="/inregistrare-cont"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/inregistrare-cont" element={<Inregistrare />} />
            </Route>

            <Route
              path="/contact"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/contact" element={<Contact />} />
            </Route>

            <Route
              path="/costuri-salarii"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/costuri-salarii" element={<CosturiSalariale />} />
            </Route>
            <Route
              path="/actualizare-angajat/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route
                path="/actualizare-angajat/:id"
                element={<ActualizareAngajat />}
              />
            </Route>
            <Route
              path="/inregistrare-tichet"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route
                path="/inregistrare-tichet"
                element={<InregistrareTichet />}
              />
            </Route>
            <Route
              path="/vizualizare-tichete"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/vizualizare-tichete" element={<Tichete />} />
            </Route>
            <Route
              path="/vizualizare-tichete/tichet/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route
                path="/vizualizare-tichete/tichet/:id"
                element={<ViewTichet />}
              />
            </Route>
            <Route
              path="/vizualizare-tichete/tichet/actualizare/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route
                path="/vizualizare-tichete/tichet/actualizare/:id"
                element={<ActualizareTichet />}
              />
            </Route>
            <Route
              path="/tichete-rezolvate"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/tichete-rezolvate" element={<TicheteRezolvate />} />
            </Route>
            <Route
              path="/Taxe-Salarii"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/Taxe-Salarii" element={<TaxeSalarii />} />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}
//inregistrareTichet   ViewTichet   ActualizareTichet   TicheteRezolvate
export default App;
