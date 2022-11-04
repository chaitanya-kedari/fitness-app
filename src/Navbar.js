import { AppBar, Button, Typography } from "@mui/material";
import { Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import NotificatiosIcon from '@mui/icons-material/Notifications';

const Navbar = () => {
    return (
        <nav className="navbar">
            <AppBar>
                <Toolbar >
                    <IconButton><MenuIcon /></IconButton>
                    <Typography>Fitness</Typography>
                    <div className="toolbarbuttons">
                        <IconButton><NotificatiosIcon /></IconButton>
                        <Button variant="contained" color="secondary" >Sign in</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </nav>
    );
}
 
export default Navbar;