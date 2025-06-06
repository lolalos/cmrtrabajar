import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ChatIcon from "@material-ui/icons/Chat";

import TicketsManagerTabs from "../../components/TicketsManagerTabs/";
import Ticket from "../../components/Ticket/";
import TicketAdvancedLayout from "../../components/TicketAdvancedLayout";
import { TicketsContext } from "../../context/Tickets/TicketsContext";

import { i18n } from "../../translate/i18n";

// ---
// IMPORT YOUR LOGOS HERE
// Make sure these paths match the actual location of your logos in src/assets/
import logoLightMode from "../../assets/logo_login.png"; // Logo for light mode
import logoDarkMode from "../../assets/logo_login.png";   // Logo for dark mode
// ---

const useStyles = makeStyles((theme) => ({
    header: {},
    content: {
        overflow: "auto",
    },
    placeholderContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: theme.palette.boxticket,
    },
    placeholderItem: {},
}));

const TicketAdvanced = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const { ticketId } = useParams();
    const [option, setOption] = useState(0);
    const { currentTicket, setCurrentTicket } = useContext(TicketsContext);

    useEffect(() => {
        if (currentTicket.id !== null) {
            setCurrentTicket({ id: currentTicket.id, code: "#open" });
        }
        if (!ticketId) {
            setOption(1);
        }
        return () => {
            setCurrentTicket({ id: null, code: null });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (currentTicket.id !== null) {
            setOption(0);
        }
    }, [currentTicket]);

    // ---
    // USE THE IMPORTED LOGOS DIRECTLY
    const logoLight = logoLightMode;
    const logoDark = logoDarkMode;

    // Set initial logo based on current theme
    const [logoImg, setLogoImg] = useState(theme.palette.type === "light" ? logoLight : logoDark);

    // Update logo when theme changes
    useEffect(() => {
        setLogoImg(theme.palette.type === "light" ? logoLight : logoDark);
    }, [theme.palette.type, logoLight, logoDark]); // Added logoLight and logoDark to dependencies
    // ---

    const renderPlaceholder = () => {
        return (
            <Box className={classes.placeholderContainer}>
                {/*<div className={classes.placeholderItem}>{i18n.t("chat.noTicketMessage")}</div>*/}
                <div>
                    <center>
                        <img
                            style={{ margin: "0 auto", width: "80%" }}
                            src={`${logoImg}?r=${Math.random()}`} // Kept random for cache busting
                            alt={`${process.env.REACT_APP_NAME_SYSTEM}`}
                        />
                    </center>
                </div>
                <br />
                <Button onClick={() => setOption(1)} variant="contained" color="primary">
                    Selecionar Ticket
                </Button>
            </Box>
        );
    };

    const renderMessageContext = () => {
        if (ticketId) {
            return <Ticket />;
        }
        return renderPlaceholder();
    };

    const renderTicketsManagerTabs = () => {
        return <TicketsManagerTabs />;
    };

    return (
        <TicketAdvancedLayout>
            <Box className={classes.header}>
                <BottomNavigation
                    value={option}
                    onChange={(event, newValue) => {
                        setOption(newValue);
                    }}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction label="Ticket" icon={<ChatIcon />} />
                    <BottomNavigationAction label="Atendimentos" icon={<QuestionAnswerIcon />} />
                </BottomNavigation>
            </Box>
            <Box className={classes.content}>{option === 0 ? renderMessageContext() : renderTicketsManagerTabs()}</Box>
        </TicketAdvancedLayout>
    );
};

export default TicketAdvanced;