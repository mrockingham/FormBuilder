// src/components/Header.tsx
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { CgMenu } from "react-icons/cg";
import { MdAccountCircle } from "react-icons/md";
import useUserStore from "../stores/userStore"; // adjust path as needed
import useBuilderStore from "../stores/designBuilderStore";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const { clear } = useBuilderStore();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogIn = () => {
    navigate("/login");
    handleClose();
  };

  const handleLogOut = () => {
    logout();
    handleClose();
    navigate("/");
  };

  const handleHome = () => {
    clear();
    navigate("/");
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <CgMenu />
          </IconButton>
          <Typography
            onClick={handleHome}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Box style={{ textDecoration: "none", color: "inherit" }}>Home</Box>
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MdAccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {user ? (
                <>
                  <MenuItem disabled>{user.name}</MenuItem>
                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </>
              ) : (
                <MenuItem onClick={handleLogIn}>Login</MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
