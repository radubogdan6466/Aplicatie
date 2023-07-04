import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CreateIcon from "@mui/icons-material/Create";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { API } from "../../service/api";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { pink } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import { blue } from "@mui/material/colors";

import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
const drawerWidth = 200;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { account } = useContext(DataContext);

  const navigate = useNavigate();

  const logout = async () => navigate("/account");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Divider />
      <List>
        <ListItem key="Panou principal" disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <AdminPanelSettingsIcon sx={{ color: blue[500] }} />
            </ListItemIcon>
            <ListItemText primary="Panou principal" />
          </ListItemButton>
        </ListItem>
        {account.username === "admin" && (
          <ListItem key="Adauga date" disablePadding>
            <ListItemButton component={Link} to="/create">
              <ListItemIcon>
                <PersonAddIcon sx={{ color: pink[500] }} />
              </ListItemIcon>
              <ListItemText primary="Adauga date angajat" />
            </ListItemButton>
          </ListItem>
        )}
        {account.username === "admin" && (
          <ListItem key="Inregistrare" disablePadding>
            <ListItemButton component={Link} to="/inregistrare-cont">
              <ListItemIcon>
                <AppRegistrationIcon sx={{ color: pink[500] }} />
              </ListItemIcon>
              <ListItemText primary="Inregistrare cont" />
            </ListItemButton>
          </ListItem>
        )}

        <Divider />
        <ListItem key="Formular tichet" disablePadding>
          <ListItemButton component={Link} to="/inregistrare-tichet">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Formular tichet"} />
          </ListItemButton>
        </ListItem>
        {account.username === "admin" && (
          <ListItem key="Vizualizare tichete" disablePadding>
            <ListItemButton component={Link} to="/vizualizare-tichete">
              <ListItemIcon>
                <InboxIcon sx={{ color: pink[500] }} />
              </ListItemIcon>
              <ListItemText primary={"Vizualizare tichete"} />
            </ListItemButton>
          </ListItem>
        )}

        <ListItem key="Tichete rezovlate" disablePadding>
          <ListItemButton component={Link} to="/tichete-rezolvate">
            <ListItemIcon>
              <AssignmentTurnedInIcon sx={{ color: green[500] }} />
            </ListItemIcon>
            <ListItemText primary={"Tichete rezovlate"} />
          </ListItemButton>
        </ListItem>
        <Divider />

        <Divider />
        <ListItem key="costuri-salarii-bonusuri" disablePadding>
          <ListItemButton component={Link} to="/costuri-salarii">
            <ListItemIcon>
              <RequestQuoteIcon sx={{ color: green[500] }} />
            </ListItemIcon>
            <ListItemText primary={"costuri-salarii-bonusuri"} />
          </ListItemButton>
        </ListItem>
        <ListItem key="Taxe Salarii" disablePadding>
          <ListItemButton component={Link} to="/Taxe-Salarii">
            <ListItemIcon>
              <RequestQuoteIcon sx={{ color: green[500] }} />
            </ListItemIcon>
            <ListItemText primary={"Taxe Salarii"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key="Contact" disablePadding>
          <ListItemButton component={Link} to="/contact">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Contact"} />
          </ListItemButton>
        </ListItem>
        <ListItem key="Delogare" disablePadding>
          <ListItemButton component={Link} to="/account">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Bine ai venit {account.name} departament: {account.departament}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#bfbbbb",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#bfbbbb",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
