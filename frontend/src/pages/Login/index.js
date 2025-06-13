import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { AuthContext } from "../../context/Auth/AuthContext";
import { i18n } from "../../translate/i18n";
import logo from "../../assets/logo.png";
import fondo from "../../assets/fondo.jpg";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        height: "100vh",
        background: `url(${fondo}) no-repeat center center fixed`,
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
    },
    paper: {
        backgroundColor: theme.palette.login,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "55px 30px",
        borderRadius: "12.5px",
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    whatsappButton: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        backgroundColor: "#25D366",
        color: "#fff",
        "&:hover": {
            backgroundColor: "#128C7E",
        },
    },
}));

const Login = () => {
    const classes = useStyles();
    const [user, setUser] = useState({ email: "", password: "" });
    const { handleLogin } = useContext(AuthContext);
    const [viewregister, setviewregister] = useState("disabled");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        fetchviewregister();
    }, []);

    const fetchviewregister = async () => {
        try {
            const responsev = await api.get("/settings/viewregister");
            const viewregisterX = responsev?.data?.value;
            setviewregister(viewregisterX);
        } catch (error) {
            console.error("Error retrieving viewregister", error);
        }
    };

    const handleChangeInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(user);
    };

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={classes.root}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <div>
                        <img
                            style={{ margin: "0 auto", width: "100%" }}
                            src={logo}
                            alt="Whats"
                        />
                    </div>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={i18n.t("login.form.email")}
                            name="email"
                            value={user.email}
                            onChange={handleChangeInput}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={i18n.t("login.form.password")}
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={user.password}
                            onChange={handleChangeInput}
                            autoComplete="current-password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Grid container>
                            <Grid item xs={6} style={{ textAlign: "left" }}>
                                <Link
                                    component={RouterLink}
                                    to="/forgetpsw"
                                    variant="body2"
                                >
                                    Olvidaste tu contraseña?
                                </Link>
                            </Grid>
                            {viewregister === "enabled" && (
                                <Grid item xs={6} style={{ textAlign: "right" }}>
                                    <Link
                                        component={RouterLink}
                                        to="/signup"
                                        variant="body2"
                                    >
                                        {i18n.t("login.buttons.register")}
                                    </Link>
                                </Grid>
                            )}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {i18n.t("login.buttons.submit")}
                        </Button>
                        <Typography variant="body2" color="textSecondary" align="center">
                            {i18n.t("©2025 X - TRAVEL PERÚ")}<br />
                            {i18n.t("Area Tecnologica ")}                
                        </Typography>
                        <Typography variant="caption" color="textSecondary" align="center" style={{ display: "block", marginTop: 8 }}>
                            Cada usuario es responsable de las acciones realizadas dentro del CRM. Por favor, actúe de forma responsable según su rol asignado.
                        </Typography>
                    </form>
                </div>
            </Container>
            <Button
                variant="contained"
                className={classes.whatsappButton}
                onClick={() => window.open("https://api.whatsapp.com/send?phone=51925465788&text=*Hola, necesito soporte en el CRM de WhatsApp*")}
            >
                <WhatsAppIcon /> Soporte por WhatsApp
            </Button>
        </div>
    );
};

export default Login;
