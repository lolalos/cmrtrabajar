import React, { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Title from "../Title";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useSettings from "../../hooks/useSettings";
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import { grey, blue } from "@material-ui/core/colors";
import { Tabs, Tab } from "@material-ui/core";
import OnlyForSuperUser from "../../components/OnlyForSuperUser";
import useAuth from "../../hooks/useAuth.js";

//import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    fixedHeightPaper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
        height: 240,
    },
    tab: {
        backgroundColor: theme.palette.options,
        borderRadius: 4,
        width: "100%",
        "& .MuiTab-wrapper": {
            color: theme.palette.fontecor,
        },
        "& .MuiTabs-flexContainer": {
            justifyContent: "center",
        },
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        marginBottom: 12,
        width: "100%",
    },
    cardAvatar: {
        fontSize: "55px",
        color: grey[500],
        backgroundColor: "#ffffff",
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    cardTitle: {
        fontSize: "18px",
        color: blue[700],
    },
    cardSubtitle: {
        color: grey[600],
        fontSize: "14px",
    },
    alignRight: {
        textAlign: "right",
    },
    fullWidth: {
        width: "100%",
    },
    selectContainer: {
        width: "100%",
        textAlign: "left",
    },
}));

export default function Options(props) {
    const { settings, scheduleTypeChanged } = props;
    const classes = useStyles();

    const [currentUser, setCurrentUser] = useState({});
    const { getCurrentUserInfo } = useAuth();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function findData() {
            setLoading(true);
            try {
                const user = await getCurrentUserInfo();
                setCurrentUser(user);
            } catch (e) {
                toast.error(e);
            }
            setLoading(false);
        }
        findData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isSuper = () => {
        return currentUser.super;
    };

    const [userRating, setUserRating] = useState("disabled");
    const [scheduleType, setScheduleType] = useState("disabled");
    const [callType, setCallType] = useState("enabled");
    const [chatbotType, setChatbotType] = useState("");
    const [CheckMsgIsGroup, setCheckMsgIsGroupType] = useState("enabled");

    const [loadingUserRating, setLoadingUserRating] = useState(false);
    const [loadingScheduleType, setLoadingScheduleType] = useState(false);
    const [loadingCallType, setLoadingCallType] = useState(false);
    const [loadingChatbotType, setLoadingChatbotType] = useState(false);
    const [loadingCheckMsgIsGroup, setCheckMsgIsGroup] = useState(false);

    const [viewclosed, setviewclosed] = useState("disabled");
    const [loadingviewclosed, setLoadingviewclosed] = useState(false);

    const [viewgroups, setviewgroups] = useState("disabled");
    const [loadingviewgroups, setLoadingviewgroups] = useState(false);

    const [ipixcType, setIpIxcType] = useState("");
    const [loadingIpIxcType, setLoadingIpIxcType] = useState(false);
    const [tokenixcType, setTokenIxcType] = useState("");
    const [loadingTokenIxcType, setLoadingTokenIxcType] = useState(false);

    const [ipmkauthType, setIpMkauthType] = useState("");
    const [loadingIpMkauthType, setLoadingIpMkauthType] = useState(false);
    const [clientidmkauthType, setClientIdMkauthType] = useState("");
    const [loadingClientIdMkauthType, setLoadingClientIdMkauthType] = useState(false);
    const [clientsecretmkauthType, setClientSecrectMkauthType] = useState("");
    const [loadingClientSecrectMkauthType, setLoadingClientSecrectMkauthType] = useState(false);

    const [asaasType, setAsaasType] = useState("");
    const [loadingAsaasType, setLoadingAsaasType] = useState(false);

    // recursos a mais...
    const [trial, settrial] = useState("3");
    const [loadingtrial, setLoadingtrial] = useState(false);

    const [viewregister, setviewregister] = useState("disabled");
    const [loadingviewregister, setLoadingviewregister] = useState(false);

    const [allowregister, setallowregister] = useState("disabled");
    const [loadingallowregister, setLoadingallowregister] = useState(false);

    const [SendGreetingAccepted, setSendGreetingAccepted] = useState("disabled");
    const [loadingSendGreetingAccepted, setLoadingSendGreetingAccepted] = useState(false);

    const [SettingsTransfTicket, setSettingsTransfTicket] = useState("disabled");
    const [loadingSettingsTransfTicket, setLoadingSettingsTransfTicket] = useState(false);

    const [sendGreetingMessageOneQueues, setSendGreetingMessageOneQueues] = useState("disabled");
    const [loadingSendGreetingMessageOneQueues, setLoadingSendGreetingMessageOneQueues] = useState(false);

    const { update } = useSettings();

    useEffect(() => {
        if (Array.isArray(settings) && settings.length) {
            const userRating = settings.find((s) => s.key === "userRating");
            if (userRating) {
                setUserRating(userRating.value);
            }
            const scheduleType = settings.find((s) => s.key === "scheduleType");
            if (scheduleType) {
                setScheduleType(scheduleType.value);
            }
            const callType = settings.find((s) => s.key === "call");
            if (callType) {
                setCallType(callType.value);
            }
            const CheckMsgIsGroup = settings.find((s) => s.key === "CheckMsgIsGroup");
            if (CheckMsgIsGroup) {
                setCheckMsgIsGroupType(CheckMsgIsGroup.value);
            }

            const allowregister = settings.find((s) => s.key === "allowregister");
            if (allowregister) {
                setallowregister(allowregister.value);
            }

            const viewclosed = settings.find((s) => s.key === "viewclosed");
            if (viewclosed) {
                setviewclosed(viewclosed.value);
            }

            const viewgroups = settings.find((s) => s.key === "viewgroups");
            if (viewgroups) {
                setviewgroups(viewgroups.value);
            }

            {
            }
            const SendGreetingAccepted = settings.find((s) => s.key === "sendGreetingAccepted");
            if (SendGreetingAccepted) {
                setSendGreetingAccepted(SendGreetingAccepted.value);
            }
            {
            }

            {
                /*TRANSFERIR TICKET*/
            }
            const SettingsTransfTicket = settings.find((s) => s.key === "sendMsgTransfTicket");
            if (SettingsTransfTicket) {
                setSettingsTransfTicket(SettingsTransfTicket.value);
            }
            {
                /*TRANSFERIR TICKET*/
            }

            const viewregister = settings.find((s) => s.key === "viewregister");
            if (viewregister) {
                setviewregister(viewregister.value);
            }

            const sendGreetingMessageOneQueues = settings.find((s) => s.key === "sendGreetingMessageOneQueues");
            if (sendGreetingMessageOneQueues) {
                setSendGreetingMessageOneQueues(sendGreetingMessageOneQueues.value);
            }

            const chatbotType = settings.find((s) => s.key === "chatBotType");
            if (chatbotType) {
                setChatbotType(chatbotType.value);
            }

            const trial = settings.find((s) => s.key === "trial");
            if (trial) {
                settrial(trial.value);
            }

            const ipixcType = settings.find((s) => s.key === "ipixc");
            if (ipixcType) {
                setIpIxcType(ipixcType.value);
            }

            const tokenixcType = settings.find((s) => s.key === "tokenixc");
            if (tokenixcType) {
                setTokenIxcType(tokenixcType.value);
            }

            const ipmkauthType = settings.find((s) => s.key === "ipmkauth");
            if (ipmkauthType) {
                setIpMkauthType(ipmkauthType.value);
            }

            const clientidmkauthType = settings.find((s) => s.key === "clientidmkauth");
            if (clientidmkauthType) {
                setClientIdMkauthType(clientidmkauthType.value);
            }

            const clientsecretmkauthType = settings.find((s) => s.key === "clientsecretmkauth");
            if (clientsecretmkauthType) {
                setClientSecrectMkauthType(clientsecretmkauthType.value);
            }

            const asaasType = settings.find((s) => s.key === "asaas");
            if (asaasType) {
                setAsaasType(asaasType.value);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings]);

    async function handleChangeUserRating(value) {
        setUserRating(value);
        setLoadingUserRating(true);
        await update({
            key: "userRating",
            value,
        });
        toast.success("Operación actualizada con éxito.");
        setLoadingUserRating(false);
    }

    async function handleallowregister(value) {
        setallowregister(value);
        setLoadingallowregister(true);
        await update({
            key: "allowregister",
            value,
        });
        toast.success("Operación actualizada con éxito.");
        setLoadingallowregister(false);
    }

    async function handleviewclosed(value) {
        setviewclosed(value);
        setLoadingviewclosed(true);
        await update({
            key: "viewclosed",
            value,
        });
        toast.success("Operación actualizada con éxito.");
        setLoadingviewclosed(false);
    }

    async function handleviewgroups(value) {
        setviewgroups(value);
        setLoadingviewgroups(true);
        await update({
            key: "viewgroups",
            value,
        });
        toast.success("Operación actualizada con éxito.");
        setLoadingviewgroups(false);
    }
    async function handleSendGreetingMessageOneQueues(value) {
        setSendGreetingMessageOneQueues(value);
        setLoadingSendGreetingMessageOneQueues(true);
        await update({
            key: "sendGreetingMessageOneQueues",
            value,
        });
        toast.success("Operación actualizada con éxito.");
        setLoadingSendGreetingMessageOneQueues(false);
    }

    async function handleviewregister(value) {
        setviewregister(value);
        setLoadingviewregister(true);
        await update({
            key: "viewregister",
            value,
        });
        toast.success("Operación actualizada con éxito.");
        setLoadingviewregister(false);
    }

    async function handletrial(value) {
        settrial(value);
        setLoadingtrial(true);
        await update({
            key: "trial",
            value,
        });
        toast.success("Operación actualizada con éxito.");
        setLoadingtrial(false);
    }

    async function handleScheduleType(value) {
        setScheduleType(value);
        setLoadingScheduleType(true);
        await update({
            key: "scheduleType",
            value,
        });
        //toast.success("Oraçãpeo atualizada com sucesso.");
        toast.success("Operación actualizada con éxito.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "light",
        });
        setLoadingScheduleType(false);
        if (typeof scheduleTypeChanged === "function") {
            scheduleTypeChanged(value);
        }
    }

    async function handleCallType(value) {
        setCallType(value);
        setLoadingCallType(true);
        await update({
            key: "call",
            value,
        });
        toast.success("Operación actualizada con éxito.");
        setLoadingCallType(false);
    }

    async function handleChatbotType(value) {
        setChatbotType(value);
        setLoadingChatbotType(true);
        await update({
            key: "chatBotType",
            value,
        });
        toast.success("Operación actualizada con éxito.");
        setLoadingChatbotType(false);
    }

    async function handleGroupType(value) {
        setCheckMsgIsGroupType(value);
        setCheckMsgIsGroup(true);
        await update({
            key: "CheckMsgIsGroup",
            value,
        });
        toast.success("Operación actualizada con éxito.");
        setCheckMsgIsGroupType(false);
        /*     if (typeof scheduleTypeChanged === "function") {
          scheduleTypeChanged(value);
        } */
    }

    {
        /*NOVO CÓDIGO*/
    }
    async function handleSendGreetingAccepted(value) {
        setSendGreetingAccepted(value);
        setLoadingSendGreetingAccepted(true);
        await update({
            key: "sendGreetingAccepted",
            value,
        });
        toast.success("Operación actualizada con éxito.");
        setLoadingSendGreetingAccepted(false);
    }

    {
        /*NOVO CÓDIGO*/
    }

    async function handleSettingsTransfTicket(value) {
        setSettingsTransfTicket(value);
        setLoadingSettingsTransfTicket(true);
        await update({
            key: "sendMsgTransfTicket",
            value,
        });

        toast.success("Operación actualizada con éxito..");
        setLoadingSettingsTransfTicket(false);
    }

    async function handleChangeIPIxc(value) {
        setIpIxcType(value);
        setLoadingIpIxcType(true);
        await update({
            key: "ipixc",
            value,
        });
        toast.success("Operación actualizada con éxito..");
        setLoadingIpIxcType(false);
    }

    async function handleChangeTokenIxc(value) {
        setTokenIxcType(value);
        setLoadingTokenIxcType(true);
        await update({
            key: "tokenixc",
            value,
        });
        toast.success("Operación actualizada con éxito..");
        setLoadingTokenIxcType(false);
    }

    async function handleChangeIpMkauth(value) {
        setIpMkauthType(value);
        setLoadingIpMkauthType(true);
        await update({
            key: "ipmkauth",
            value,
        });
        toast.success("Operación actualizada con éxito..");
        setLoadingIpMkauthType(false);
    }

    async function handleChangeClientIdMkauth(value) {
        setClientIdMkauthType(value);
        setLoadingClientIdMkauthType(true);
        await update({
            key: "clientidmkauth",
            value,
        });
        toast.success("Operación actualizada con éxito..");
        setLoadingClientIdMkauthType(false);
    }

    async function handleChangeClientSecrectMkauth(value) {
        setClientSecrectMkauthType(value);
        setLoadingClientSecrectMkauthType(true);
        await update({
            key: "clientsecretmkauth",
            value,
        });
        toast.success("Operación actualizada con éxito..");
        setLoadingClientSecrectMkauthType(false);
    }

    async function handleChangeAsaas(value) {
        setAsaasType(value);
        setLoadingAsaasType(true);
        await update({
            key: "asaas",
            value,
        });
        toast.success("Operación actualizada con éxito..");
        setLoadingAsaasType(false);
    }
    return (
        <>
            <Grid spacing={3} container>
                <Grid xs={12} sm={12} md={12} item>
                    <FormControl className={classes.selectContainer}>
                        <InputLabel id="ratings-label">Evaluaciones</InputLabel>
                        <Select
                            labelId="ratings-label"
                            value={userRating}
                            onChange={async (e) => {
                                handleChangeUserRating(e.target.value);
                            }}
                        >
                            <MenuItem value={"disabled"}>Deshabilitadas</MenuItem>
                            <MenuItem value={"enabled"}>Habilitadas</MenuItem>
                        </Select>
                        <FormHelperText>{loadingUserRating && "Actualizando..."}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={12} md={12} item>
                    <FormControl className={classes.selectContainer}>
                        <InputLabel id="schedule-type-label">Gestión de Expedientes</InputLabel>
                        <Select
                            labelId="schedule-type-label"
                            value={scheduleType}
                            onChange={async (e) => {
                                handleScheduleType(e.target.value);
                            }}
                        >
                            <MenuItem value={"disabled"}>Deshabilitado</MenuItem>
                            <MenuItem value={"queue"}>Área</MenuItem>
                            <MenuItem value={"company"}>Empresa</MenuItem>
                        </Select>
                        <FormHelperText>{loadingScheduleType && "Actualizando..."}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={12} md={12} item>
                    <FormControl className={classes.selectContainer}>
                        <InputLabel id="group-type-label">Ignorar Mensajes de Grupos</InputLabel>
                        <Select
                            labelId="group-type-label"
                            value={CheckMsgIsGroup}
                            onChange={async (e) => {
                                handleGroupType(e.target.value);
                            }}
                        >
                            <MenuItem value={"disabled"}>Deshabilitado</MenuItem>
                            <MenuItem value={"enabled"}>Habilitado</MenuItem>
                        </Select>
                        <FormHelperText>{loadingScheduleType && "Actualizando..."}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={12} md={12} item>
                    <FormControl className={classes.selectContainer}>
                        <InputLabel id="call-type-label">Aceptar Llamada</InputLabel>
                        <Select
                            labelId="call-type-label"
                            value={callType}
                            onChange={async (e) => {
                                handleCallType(e.target.value);
                            }}
                        >
                            <MenuItem value={"disabled"}>No Aceptar</MenuItem>
                            <MenuItem value={"enabled"}>Aceptar</MenuItem>
                        </Select>
                        <FormHelperText>{loadingCallType && "Actualizando..."}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={12} md={12} item>
                    <FormControl className={classes.selectContainer}>
                        <InputLabel id="chatbot-type-label">Tipo Chatbot</InputLabel>
                        <Select
                            labelId="chatbot-type-label"
                            value={chatbotType}
                            onChange={async (e) => {
                                handleChatbotType(e.target.value);
                            }}
                        >
                            <MenuItem value={"text"}>Texto</MenuItem>
                            {/*<MenuItem value={"button"}>Botão</MenuItem>*/}
                            {/*<MenuItem value={"list"}>Lista</MenuItem>*/}
                        </Select>
                        <FormHelperText>{loadingChatbotType && "Atualizando..."}</FormHelperText>
                    </FormControl>
                </Grid>
                {/* ENVIAR SAUDAÇÃO AO ACEITAR O TICKET */}
                <Grid xs={12} sm={12} md={12} item>
                    <FormControl className={classes.selectContainer}>
                        <InputLabel id="sendGreetingAccepted-label">Enviar saludo al aceptar el ticket</InputLabel>
                        <Select
                            labelId="sendGreetingAccepted-label"
                            value={SendGreetingAccepted}
                            onChange={async (e) => {
                                handleSendGreetingAccepted(e.target.value);
                            }}
                        >
                            <MenuItem value={"disabled"}>Deshabilitado</MenuItem>
                            <MenuItem value={"enabled"}>Habilitado</MenuItem>
                        </Select>
                        <FormHelperText>{loadingSendGreetingAccepted && "Atualizando..."}</FormHelperText>
                    </FormControl>
                </Grid>
                {/* ENVIAR SAUDAÇÃO AO ACEITAR O TICKET */}

                {/* ENVIAR MENSAGEM DE TRANSFERENCIA DE SETOR/ATENDENTE */}
                <Grid xs={12} sm={12} md={12} item>
                    <FormControl className={classes.selectContainer}>
                        <InputLabel id="sendMsgTransfTicket-label">
                            Enviar mensaje de transferencia de Área/agente
                        </InputLabel>
                        <Select
                            labelId="sendMsgTransfTicket-label"
                            value={SettingsTransfTicket}
                            onChange={async (e) => {
                                handleSettingsTransfTicket(e.target.value);
                            }}
                        >
                            <MenuItem value={"disabled"}>Deshabilitado</MenuItem>
                            <MenuItem value={"enabled"}>Habilitado</MenuItem>
                        </Select>
                        <FormHelperText>{loadingSettingsTransfTicket && "Actualizando..."}</FormHelperText>
                    </FormControl>
                </Grid>

                {/* ENVIAR SAUDAÇÃO QUANDO HOUVER SOMENTE 1 FILA */}
                <Grid xs={12} sm={12} md={12} item>
                    <FormControl className={classes.selectContainer}>
                        <InputLabel id="sendGreetingMessageOneQueues-label">
                            Enviar saludo cuando solo hay 1 Area
                        </InputLabel>
                        <Select
                            labelId="sendGreetingMessageOneQueues-label"
                            value={sendGreetingMessageOneQueues}
                            onChange={async (e) => {
                                handleSendGreetingMessageOneQueues(e.target.value);
                            }}
                        >
                            <MenuItem value={"disabled"}>Deshabilitado</MenuItem>
                            <MenuItem value={"enabled"}>Habilitado</MenuItem>
                        </Select>
                        <FormHelperText>{loadingSendGreetingMessageOneQueues && "Actualizando..."}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={12} md={12} item>
                    <FormControl className={classes.selectContainer}>
                        <InputLabel id="viewclosed-label">Agente Visualiza Tickets Cerrados?</InputLabel>
                        <Select
                            labelId="viewclosed-label"
                            value={viewclosed}
                            onChange={async (e) => {
                                handleviewclosed(e.target.value);
                            }}
                        >
                            <MenuItem value={"disabled"}>No</MenuItem>
                            <MenuItem value={"enabled"}>Sí</MenuItem>
                        </Select>
                        <FormHelperText>{loadingviewclosed && "Actualizando..."}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid xs={12} sm={12} md={12} item>
                    <FormControl className={classes.selectContainer}>
                        <InputLabel id="viewgroups-label">Agente Visualiza Grupos?</InputLabel>
                        <Select
                            labelId="viewgroups-label"
                            value={viewgroups}
                            onChange={async (e) => {
                                handleviewgroups(e.target.value);
                            }}
                        >
                            <MenuItem value={"disabled"}>No</MenuItem>
                            <MenuItem value={"enabled"}>Sí</MenuItem>
                        </Select>
                        <FormHelperText>{loadingviewgroups && "Actualizando..."}</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>

            <OnlyForSuperUser
                user={currentUser}
                yes={() => (
                    <>
                        <Grid spacing={3} container>
                            <Tabs
                                indicatorColor="primary"
                                textColor="primary"
                                scrollButtons="on"
                                variant="scrollable"
                                className={classes.tab}
                                style={{
                                    marginBottom: 20,
                                    marginTop: 20,
                                }}
                            >
                                <Tab label="Configuraciones Globales" />
                            </Tabs>
                        </Grid>

                        <Grid xs={12} sm={12} md={12} item>
                            <FormControl className={classes.selectContainer}>
                                <InputLabel id="allowregister-label">Registro (Inscripción) Permitida?</InputLabel>
                                <Select
                                    labelId="allowregister-label"
                                    value={allowregister}
                                    onChange={async (e) => {
                                        handleallowregister(e.target.value);
                                    }}
                                >
                                    <MenuItem value={"disabled"}>No</MenuItem>
                                    <MenuItem value={"enabled"}>Sí</MenuItem>
                                </Select>
                                <FormHelperText>{loadingallowregister && "Actualizando..."}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid xs={12} sm={12} md={12} item>
                            <FormControl className={classes.selectContainer}>
                                <InputLabel id="viewregister-label">Registro (Inscripción) Visible?</InputLabel>
                                <Select
                                    labelId="viewregister-label"
                                    value={viewregister}
                                    onChange={async (e) => {
                                        handleviewregister(e.target.value);
                                    }}
                                >
                                    <MenuItem value={"disabled"}>No</MenuItem>
                                    <MenuItem value={"enabled"}>Sí</MenuItem>
                                </Select>
                                <FormHelperText>{loadingviewregister && "Atualizando..."}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid xs={12} sm={12} md={12} item>
                            <FormControl className={classes.selectContainer}>
                                <InputLabel id="trial-label">Tiempo de Prueba?</InputLabel>
                                <Select
                                    labelId="trial-label"
                                    value={trial}
                                    onChange={async (e) => {
                                        handletrial(e.target.value);
                                    }}
                                >
                                    <MenuItem value={"1"}>1</MenuItem>
                                    <MenuItem value={"2"}>2</MenuItem>
                                    <MenuItem value={"3"}>3</MenuItem>
                                    <MenuItem value={"4"}>4</MenuItem>
                                    <MenuItem value={"5"}>5</MenuItem>
                                    <MenuItem value={"6"}>6</MenuItem>
                                    <MenuItem value={"7"}>7</MenuItem>
                                </Select>
                                <FormHelperText>{loadingtrial && "Actualizando..."}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </>
                )}
            />
            {/*-----------------SUPER USER-----------------*/}
            {/*-----------------IXC-----------------*/}
            
            {/*-----------------MK-AUTH-----------------*/}
            
            {/*-----------------ASAAS-----------------*/}
            
            
        </>
    );
}
