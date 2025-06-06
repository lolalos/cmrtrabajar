import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import TicketsManager from "../../components/TicketsManagerTabs/";
import Ticket from "../../components/Ticket/";
import { i18n } from "../../translate/i18n";

// ---
// IMPORT YOUR LOGOS HERE
// Make sure these paths match the actual location of your logos in src/assets/
import logoLightMode from "../../assets/logo_login.png"; // Logo for light mode
import logoDarkMode from "../../assets/logo_login.png";   // Logo for dark mode
// ---

const useStyles = makeStyles((theme) => ({
    chatContainer: {
        flex: 1,
        padding: theme.spacing(0),
        height: `calc(100% - 48px)`,
        overflowY: "hidden",
    },

    chatPapper: {
        display: "flex",
        height: "100%",
    },

    contactsWrapper: {
        display: "flex",
        height: "100%",
        flexDirection: "column",
        overflowY: "hidden",
    },
    messagesWrapper: {
        display: "flex",
        height: "100%",
        flexDirection: "column",
    },
    welcomeMsg: {
        backgroundColor: theme.palette.boxticket,
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100%",
        textAlign: "center",
        flexDirection: "column", // Ensure image and text stack vertically
    },
}));

const TicketsCustom = () => {
    const classes = useStyles();
    const { ticketId } = useParams();
    const theme = useTheme();

    // ---
    // USE THE IMPORTED LOGOS DIRECTLY
    const logoLight = logoLightMode;
    const logoDark = logoDarkMode;

    // Set initial logo based on current theme
    const [logoImg, setLogoImg] = useState(
        theme.palette.type === "light" ? logoLight : logoDark
    );

    // Update logo when theme changes
    useEffect(() => {
        setLogoImg(theme.palette.type === "light" ? logoLight : logoDark);
    }, [theme.palette.type, logoLight, logoDark]); // Added logoLight and logoDark to dependencies
    // ---

    return (
        <div className={classes.chatContainer}>
            <div className={classes.chatPapper}>
                <Grid container spacing={0}>
                    <Grid item xs={4} className={classes.contactsWrapper}>
                        <TicketsManager />
                    </Grid>
                    <Grid item xs={8} className={classes.messagesWrapper}>
                        {ticketId ? (
                            <>
                                <Ticket />
                            </>
                        ) : (
                            <Paper square variant="outlined" className={classes.welcomeMsg}>
                                <div>
                                    <center>
                                        <img
                                            style={{ margin: "0 auto", width: "80%" }}
                                            src={`${logoImg}?r=${Math.random()}`} // Kept random for cache busting
                                            alt={`${process.env.REACT_APP_NAME_SYSTEM}`}
                                        />
                                    </center>
                                </div>
                                {/* <span>{i18n.t("chat.noTicketMessage")}</span> */}
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default TicketsCustom;