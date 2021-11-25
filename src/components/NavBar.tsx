import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { styled } from '@mui/system';
import React from "react";

const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "#ab3535",
    },
    logo: {
        fontFamily: "Myriad",
        fontWeight: 700,
        color: "#fff000",
        textAlign: "left",
    },
}));


export const NavBar: React.FC = () => {
    const { header } = useStyles();
    const displayDesktop = () => {
        return <Toolbar>Blackline Safety</Toolbar>;
    };

    const logo = (
        <Typography variant="h6" component="h1">
            Blackline Safety
        </Typography>
    );

    return (
        <header>
            <AppBar className={header}>{displayDesktop()}</AppBar>
        </header>
    );
}



