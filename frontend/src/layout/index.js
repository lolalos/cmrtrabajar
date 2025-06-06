import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import moment from "moment";
import {
    makeStyles,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    MenuItem,
    IconButton,
    Menu,
    useTheme,
    useMediaQuery,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CachedIcon from "@material-ui/icons/Cached";

import MainListItems from "./MainListItems";
import NotificationsPopOver from "../components/NotificationsPopOver";
import NotificationsVolume from "../components/NotificationsVolume";
import UserModal from "../components/UserModal";
import { AuthContext } from "../context/Auth/AuthContext";
import BackdropLoading from "../components/BackdropLoading";
import DarkMode from "../components/DarkMode"; // <-- Asegúrate de que este componente no se esté usando si vas a manejar el DarkMode directamente aquí.
import { i18n } from "../translate/i18n";
import toastError from "../errors/toastError";
import AnnouncementsPopover from "../components/AnnouncementsPopover";

// *** IMPORTA TUS LOGOS AQUÍ ***
// Asegúrate de que estos nombres de archivo y rutas coincidan con la ubicación real en src/assets/
import logoInterno from "../assets/logo.png"; // Logo para el modo claro (o el que uses por defecto)
import logoWhite from "../assets/logo.png";       // Logo para el modo oscuro

import { SocketContext } from "../context/Socket/SocketContext";
import ChatPopover from "../pages/Chat/ChatPopover";

import { useDate } from "../hooks/useDate";

import ColorModeContext from "../layout/themeContext";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        height: "100vh",
        [theme.breakpoints.down("sm")]: {
            height: "calc(100vh - 56px)",
        },
        backgroundColor: theme.palette.fancyBackground,
        '& .MuiButton-outlinedPrimary': {
            color: theme.mode === 'light' ? '#FFF' : '#FFF',
            backgroundColor: theme.mode === 'light' ? '#2DDD7F' : '#1c1c1c',
            //border: theme.mode === 'light' ? '1px solid rgba(0 124 102)' : '1px solid rgba(255, 255, 255, 0.5)',
        },
        '& .MuiTab-textColorPrimary.Mui-selected': {
            color: theme.mode === 'light' ? '#2DDD7F' : '#FFF',
        }
    },
    avatar: {
        width: "100%",
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
        color: theme.palette.dark.main,
        background: theme.palette.barraSuperior,
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 8px",
        minHeight: "48px",
        [theme.breakpoints.down("sm")]: {
            height: "48px"
        }
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
        fontSize: 14,
        color: "white",
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.down("sm")]: {
            width: "100%"
        },
        ...theme.scrollbarStylesSoft
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%"
        }
    },
    appBarSpacer: {
        minHeight: "48px",
    },
    content: {
        flex: 1,
        overflow: "auto",

    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
    },
    containerWithScroll: {
        flex: 1,
        padding: theme.spacing(1),
        overflowY: "scroll",
        ...theme.scrollbarStyles,
    },
    NotificationsPopOver: {
        // color: theme.barraSuperior.secondary.main,
    },
    logo: {
        width: "80%",
        height: "auto",
        maxWidth: 180,
        [theme.breakpoints.down("sm")]: {
            width: "auto",
            height: "80%",
            maxWidth: 180,
        },
        logo: theme.logo
    },
}));

const LoggedInLayout = ({ children, themeToggle }) => {
    const classes = useStyles();
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const { handleLogout, loading } = useContext(AuthContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerVariant, setDrawerVariant] = useState("permanent");
    const { user } = useContext(AuthContext);

    const theme = useTheme();
    const { colorMode } = useContext(ColorModeContext);
    const greaterThenSm = useMediaQuery(theme.breakpoints.up("sm"));

    // *** ASIGNANDO LOS LOGOS IMPORTADOS DIRECTAMENTE ***
    // Ahora, logoLight y logoDark contendrán las URLs generadas por Webpack
    const logoLight = logoInterno; // Usamos la importación del logo claro
    const logoDark = logoWhite;    // Usamos la importación del logo oscuro

    // Definindo o logo inicial com base no modo de tema atual
    const initialLogo = theme.palette.type === 'light' ? logoLight : logoDark;
    const [logoImg, setLogoImg] = useState(initialLogo);

    const [volume, setVolume] = useState(localStorage.getItem("volume") || 1);

    const { dateToClient } = useDate();

    const socketManager = useContext(SocketContext);

    useEffect(() => {
        if (document.body.offsetWidth > 1200) {
            setDrawerOpen(true);
        }
    }, []);

    useEffect(() => {
        if (document.body.offsetWidth < 1000) {
            setDrawerVariant("temporary");
        } else {
            setDrawerVariant("permanent");
        }
    }, [drawerOpen]);

    useEffect(() => {
        const companyId = localStorage.getItem("companyId");
        const userId = localStorage.getItem("userId");

        const socket = socketManager.getSocket(companyId);

        socket.on(`company-${companyId}-auth`, (data) => {
            if (data.user.id === +userId) {
                toastError("Sua conta foi acessada em outro computador.");
                setTimeout(() => {
                    localStorage.clear();
                    window.location.reload();
                }, 1000);
            }
        });

        socket.emit("userStatus");
        const interval = setInterval(() => {
            socket.emit("userStatus");
        }, 1000 * 60 * 5);

        return () => {
            socket.disconnect();
            clearInterval(interval);
        };
    }, [socketManager]);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setMenuOpen(false);
    };

    const handleOpenUserModal = () => {
        setUserModalOpen(true);
        handleCloseMenu();
    };

    const handleClickLogout = () => {
        handleCloseMenu();
        handleLogout();
    };

    const drawerClose = () => {
        if (document.body.offsetWidth < 600) {
            setDrawerOpen(false);
        }
    };

    const handleRefreshPage = () => {
        window.location.reload(false);
    }

    const handleMenuItemClick = () => {
        const { innerWidth: width } = window;
        if (width <= 600) {
            setDrawerOpen(false);
        }
    };

    useEffect(() => {
        // Actualiza el logo siempre que el modo del tema cambia
        setLogoImg(theme.palette.type === 'light' ? logoLight : logoDark);
    }, [theme.palette.type, logoLight, logoDark]); // Asegúrate de que logoLight y logoDark estén en las dependencias.

    const toggleColorMode = () => {
        colorMode.toggleColorMode();
        // Cuando cambias el tema, setLogoImg ya se actualizará por el useEffect de arriba.
        // Puedes quitar la siguiente línea si ese useEffect ya maneja el cambio.
        // setLogoImg((prevLogo) => (prevLogo === logoLight ? logoDark : logoLight));
    };

    if (loading) {
        return <BackdropLoading />;
    }

    return (
        <div className={classes.root}>
            <Drawer
                variant={drawerVariant}
                className={drawerOpen ? classes.drawerPaper : classes.drawerPaperClose}
                classes={{
                    paper: clsx(
                        classes.drawerPaper,
                        !drawerOpen && classes.drawerPaperClose
                    ),
                }}
                open={drawerOpen}
            >
                <div className={classes.toolbarIcon}>
                    <img
                        src={`${logoImg}?r=${Math.random()}`} // Mantengo el `?r=${Math.random()}` por si el navegador cachea la imagen.
                        style={{ margin: "0 auto", width: "50%" }}
                        alt={`${process.env.REACT_APP_NAME_SYSTEM}`}
                    />
                    <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List className={classes.containerWithScroll}>
                    <MainListItems drawerClose={drawerClose} collapsed={!drawerOpen} />
                </List>
                <Divider />
            </Drawer>
            <UserModal
                open={userModalOpen}
                onClose={() => setUserModalOpen(false)}
                userId={user?.id}
            />
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}
                color="primary"
            >
                <Toolbar variant="dense" className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        variant="contained"
                        aria-label="open drawer"
                        onClick={() => setDrawerOpen(!drawerOpen)}
                        className={clsx(
                            classes.menuButton,
                            drawerOpen && classes.menuButtonHidden
                        )}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        component="h2"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        {greaterThenSm && user?.profile === "admin" && user?.company?.dueDate ? (
                            <>
                                Hola <b>{user.name}</b>, Bienvenido a <b>XTRAVEL PERU</b>!
                            </>
                        ) : (
                            <>
                                Hola <b>{user.name}</b>, Bienvenido a <b>XTRAVEL PERU</b>!
                            </>
                        )}
                    </Typography>

                    <IconButton edge="start" onClick={toggleColorMode}>
                        {theme.palette.type === 'dark' ? <Brightness7Icon style={{ color: "white" }} /> : <Brightness4Icon style={{ color: "white" }} />}
                    </IconButton>

                    <NotificationsVolume
                        setVolume={setVolume}
                        volume={volume}
                    />

                    <IconButton
                        onClick={handleRefreshPage}
                        aria-label={i18n.t("mainDrawer.appBar.refresh")}
                        color="inherit"
                    >
                        <CachedIcon style={{ color: "white" }} />
                    </IconButton>

                    {user.id && <NotificationsPopOver volume={volume} />}

                    <AnnouncementsPopover />

                    <ChatPopover />

                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            variant="contained"
                            style={{ color: "white" }}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={menuOpen}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={handleOpenUserModal}>
                                {i18n.t("mainDrawer.appBar.user.profile")}
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />

                {children ? children : null}
            </main>
        </div>
    );
};

export default LoggedInLayout;