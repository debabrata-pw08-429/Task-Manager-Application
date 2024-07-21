import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@mui/material";
import { Link } from "@mui/material";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, logout } = React.useContext(AuthContext);

  console.log("user =>", user);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ marginBottom: "21px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AssignmentIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: "21px",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "21px",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={(user && user.name) || "X"}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Typography variant="p" sx={{ mx: "12px" }}>
                {user && user.name}
              </Typography>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : null}

          {user ? (
            <Button
              onClick={logout}
              sx={{ backgroundColor: "orange", color: "white" }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Link
                href="/login"
                sx={{
                  padding: "8px 12px",
                  margin: "0px 5px",
                  borderRadius: "3px",
                  textDecoration: "none",
                  backgroundColor:
                    window.location.pathname === "/login" ? "white" : "",
                  color:
                    window.location.pathname === "/login" ? "black" : "white",
                }}
              >
                Login
              </Link>
              <Link
                href="/register"
                sx={{
                  padding: "8px 12px",
                  margin: "0px 5px",
                  borderRadius: "3px",
                  textDecoration: "none",
                  backgroundColor:
                    window.location.pathname === "/register" ? "white" : "",
                  color:
                    window.location.pathname === "/register"
                      ? "black"
                      : "white",
                }}
              >
                Signup
              </Link>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
