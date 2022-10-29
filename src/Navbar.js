import { AppBar, Button, Typography } from "@mui/material";
import { Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import NotificatiosIcon from '@mui/icons-material/Notifications';
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles({
//     toolbar: {
//         backgroundColor: '#36506B'
//     }
// })

const Navbar = () => {
    //const classes = useStyles()

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