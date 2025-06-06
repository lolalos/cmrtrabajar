import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import {
    Badge,
    Collapse,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import AllInclusive from "@material-ui/icons/AllInclusive";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import AttachFile from "@material-ui/icons/AttachFile";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import BlurCircular from "@material-ui/icons/BlurCircular";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import ContactPhoneOutlinedIcon from "@material-ui/icons/ContactPhoneOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import Description from "@material-ui/icons/Description";
import DeviceHubOutlined from "@material-ui/icons/DeviceHubOutlined";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventIcon from "@material-ui/icons/Event";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import ForumIcon from "@material-ui/icons/Forum";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ListIcon from "@material-ui/icons/ListAlt";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import LoyaltyRoundedIcon from "@material-ui/icons/LoyaltyRounded";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import PeopleIcon from "@material-ui/icons/People";
import RotateRight from "@material-ui/icons/RotateRight";
import Schedule from "@material-ui/icons/Schedule";
import SearchIcon from "@material-ui/icons/Search";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import TableChartIcon from "@material-ui/icons/TableChart";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

import { isArray } from "lodash";

import { i18n } from "../translate/i18n";
import { WhatsAppsContext } from "../context/WhatsApp/WhatsAppsContext";
import { AuthContext } from "../context/Auth/AuthContext";
import { SocketContext } from "../context/Socket/SocketContext";
import { Can } from "../components/Can";
import api from "../services/api";
import toastError from "../errors/toastError";
import usePlans from "../hooks/usePlans";
import useVersion from "../hooks/useVersion";
import LogPackTypebot from "../pages/LogPackTypebot";
import ToDoList from "../pages/ToDoList/";

const useStyles = makeStyles((theme) => ({
    ListSubheader: {
        height: 26,
        marginTop: "-15px",
        marginBottom: "-10px",
    },
    logoutButton: {
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: theme.palette.sair.main,
        color: theme.palette.text.sair,
    },
}));

function ListItemLink(props) {
    const { icon, primary, to, className } = props;

    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to]
    );

    return (
        <li>
            <ListItem button dense component={renderLink} className={className}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

const reducer = (state, action) => {
    if (action.type === "LOAD_CHATS") {
        const chats = action.payload;
        const newChats = [];

        if (isArray(chats)) {
            chats.forEach((chat) => {
                const chatIndex = state.findIndex((u) => u.id === chat.id);
                if (chatIndex !== -1) {
                    state[chatIndex] = chat;
                } else {
                    newChats.push(chat);
                }
            });
        }

        return [...state, ...newChats];
    }

    if (action.type === "UPDATE_CHATS") {
        const chat = action.payload;
        const chatIndex = state.findIndex((u) => u.id === chat.id);

        if (chatIndex !== -1) {
            state[chatIndex] = chat;
            return [...state];
        } else {
            return [chat, ...state];
        }
    }

    if (action.type === "DELETE_CHAT") {
        const chatId = action.payload;

        const chatIndex = state.findIndex((u) => u.id === chatId);
        if (chatIndex !== -1) {
            state.splice(chatIndex, 1);
        }
        return [...state];
    }

    if (action.type === "RESET") {
        return [];
    }

    if (action.type === "CHANGE_CHAT") {
        const changedChats = state.map((chat) => {
            if (chat.id === action.payload.chat.id) {
                return action.payload.chat;
            }
            return chat;
        });
        return changedChats;
    }
};

const MainListItems = (props) => {
    const classes = useStyles();
    const { drawerClose, collapsed } = props;
    const { whatsApps } = useContext(WhatsAppsContext);
    const { user, handleLogout } = useContext(AuthContext);
    const socketManager = useContext(SocketContext);

    const [connectionWarning, setConnectionWarning] = useState(false);
    const [openCampaignSubmenu, setOpenCampaignSubmenu] = useState(false);
    const [showCampaigns, setShowCampaigns] = useState(false);
    const [showKanban, setShowKanban] = useState(false);
    const [showOpenAi, setShowOpenAi] = useState(false);
    const [showIntegrations, setShowIntegrations] = useState(false);
    const [showSchedules, setShowSchedules] = useState(false);
    const [showInternalChat, setShowInternalChat] = useState(false);
    const [showExternalApi, setShowExternalApi] = useState(false);

    const [invisible, setInvisible] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchParam] = useState("");
    const [chats, dispatch] = useReducer(reducer, []);
    const { getPlanCompany } = usePlans();

    const [version, setVersion] = useState(false);
    const { getVersion } = useVersion();

    const history = useHistory();

    useEffect(() => {
        async function fetchVersion() {
            const _version = await getVersion();
            setVersion(_version.version);
        }
        fetchVersion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch({ type: "RESET" });
        setPageNumber(1);
    }, [searchParam]);

    useEffect(() => {
        async function fetchData() {
            const companyId = user.companyId;
            const planConfigs = await getPlanCompany(undefined, companyId);

            setShowCampaigns(planConfigs.plan.useCampaigns);
            setShowKanban(planConfigs.plan.useKanban);
            setShowOpenAi(planConfigs.plan.useOpenAi);
            setShowIntegrations(planConfigs.plan.useIntegrations);
            setShowSchedules(planConfigs.plan.useSchedules);
            setShowInternalChat(planConfigs.plan.useInternalChat);
            setShowExternalApi(planConfigs.plan.useExternalApi);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchChats();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParam, pageNumber]);

    useEffect(() => {
        const companyId = localStorage.getItem("companyId");
        const socket = socketManager.getSocket(companyId);

        socket.on(`company-${companyId}-chat`, (data) => {
            if (data.action === "new-message") {
                dispatch({ type: "CHANGE_CHAT", payload: data });
            }
            if (data.action === "update") {
                dispatch({ type: "CHANGE_CHAT", payload: data });
            }
        });
        return () => {
            socket.disconnect();
        };
    }, [socketManager]);

    useEffect(() => {
        let unreadsCount = 0;
        if (chats.length > 0) {
            for (let chat of chats) {
                for (let chatUser of chat.users) {
                    if (chatUser.userId === user.id) {
                        unreadsCount += chatUser.unreads;
                    }
                }
            }
        }
        setInvisible(unreadsCount === 0);
    }, [chats, user.id]);

    useEffect(() => {
        if (localStorage.getItem("cshow")) {
            setShowCampaigns(true);
        }
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (whatsApps.length > 0) {
                const offlineWhats = whatsApps.filter((whats) => {
                    return (
                        whats.status === "qrcode" ||
                        whats.status === "PAIRING" ||
                        whats.status === "DISCONNECTED" ||
                        whats.status === "TIMEOUT" ||
                        whats.status === "OPENING"
                    );
                });
                setConnectionWarning(offlineWhats.length > 0);
            }
        }, 2000);
        return () => clearTimeout(delayDebounceFn);
    }, [whatsApps]);

    const fetchChats = async () => {
        try {
            const { data } = await api.get("/chats/", {
                params: { searchParam, pageNumber },
            });
            dispatch({ type: "LOAD_CHATS", payload: data.records });
        } catch (err) {
            toastError(err);
        }
    };

    const handleClickLogout = () => {
        handleLogout();
    };

    return (
        <div onClick={drawerClose}>
            <Can
                role={user.profile}
                perform={"drawer-service-items:view"}
                style={{
                    overflowY: "scroll",
                }}
                no={() => (
                    <>
                        <ListSubheader
                            hidden={collapsed}
                            style={{
                                position: "relative",
                                fontSize: "17px",
                                textAlign: "left",
                                paddingLeft: 20,
                            }}
                            inset
                            color="inherit"
                        >
                            <Typography variant="overline" style={{ fontWeight: "normal" }}>
                                {" "}
                                {i18n.t("Atención")}{" "}
                            </Typography>
                        </ListSubheader>
                        <>
                            <ListItemLink
                                to="/tickets"
                                primary={i18n.t("mainDrawer.listItems.tickets")}
                                icon={<WhatsAppIcon />}
                            />
                            <ListItemLink
                                to="/quick-messages"
                                primary={i18n.t("mainDrawer.listItems.quickMessages")}
                                icon={<FlashOnIcon />}
                            />
                            {showKanban && <ListItemLink to="/kanban" primary="Kanban" icon={<LoyaltyRoundedIcon />} />}
                            <ListItemLink to="/todolist" primary={i18n.t("Tareas")} icon={<BorderColorIcon />} />
                            <ListItemLink
                                to="/contacts"
                                primary={i18n.t("mainDrawer.listItems.contacts")}
                                icon={<ContactPhoneOutlinedIcon />}
                            />
                            {showSchedules && (
                                <ListItemLink
                                    to="/schedules"
                                    primary={i18n.t("mainDrawer.listItems.schedules")}
                                    icon={<Schedule />}
                                />
                            )}
                            <ListItemLink
                                to="/tags"
                                primary={i18n.t("mainDrawer.listItems.tags")}
                                icon={<LocalOfferIcon />}
                            />
                            {showInternalChat && (
                                <ListItemLink
                                    to="/chats"
                                    primary={i18n.t("mainDrawer.listItems.chats")}
                                    icon={
                                        <Badge color="secondary" variant="dot" invisible={invisible}>
                                            <ForumIcon />
                                        </Badge>
                                    }
                                />
                            )}
                            <ListItemLink
                                to="/helps"
                                primary={i18n.t("mainDrawer.listItems.helps")}
                                icon={<HelpOutlineIcon />}
                            />
                        </>
                    </>
                )}
            />

            <Can
                role={user.profile}
                perform={"drawer-admin-items:view"}
                yes={() => (
                    <>
                        <ListSubheader
                            hidden={collapsed}
                            style={{
                                position: "relative",
                                fontSize: "17px",
                                textAlign: "left",
                                paddingLeft: 20,
                            }}
                            inset
                            color="inherit"
                        >
                            <Typography variant="overline" style={{ fontWeight: "normal" }}>
                                {" "}
                                {i18n.t("Gerencia")}{" "}
                            </Typography>
                        </ListSubheader>

                        <ListItemLink small to="/" primary="Dashboard" icon={<DashboardOutlinedIcon />} />

                        <ListItemLink to="/relatorios" primary={i18n.t("Informes")} icon={<SearchIcon />} />
                    </>
                )}
            />
            <Can
                role={user.profile}
                perform="drawer-admin-items:view"
                yes={() => (
                    <>
                        {showCampaigns && (
                            <>
                                <ListSubheader
                                    hidden={collapsed}
                                    style={{
                                        position: "relative",
                                        fontSize: "17px",
                                        textAlign: "left",
                                        paddingLeft: 20,
                                    }}
                                    inset
                                    color="inherit"
                                >
                                    <Typography variant="overline" style={{ fontWeight: "normal" }}>
                                        {" "}
                                        {i18n.t("Campañas")}{" "}
                                    </Typography>
                                </ListSubheader>

                                <ListItemLink small to="/campaigns" primary={i18n.t("Lista")} icon={<ListIcon />} />

                                <ListItemLink
                                    small
                                    to="/contact-lists"
                                    primary={i18n.t("Listas de Contactos")}
                                    icon={<PeopleIcon />}
                                />

                                <ListItemLink
                                    small
                                    to="/campaigns-config"
                                    primary={i18n.t("Configuraciones")}
                                    icon={<ListIcon />}
                                />
                            </>
                        )}

                        <ListSubheader
                            hidden={collapsed}
                            style={{
                                position: "relative",
                                fontSize: "17px",
                                textAlign: "left",
                                paddingLeft: 20,
                            }}
                            inset
                            color="inherit"
                        >
                            <Typography variant="overline" style={{ fontWeight: "normal" }}>
                                {" "}
                                {i18n.t("Administración")}{" "}
                            </Typography>
                        </ListSubheader>

                        {user.super && (
                            <ListItemLink
                                to="/announcements"
                                primary={i18n.t("mainDrawer.listItems.annoucements")}
                                icon={<AnnouncementIcon />}
                            />
                        )}

                        <ListItemLink
                            to="/connections"
                            primary={i18n.t("mainDrawer.listItems.connections")}
                            icon={
                                <Badge badgeContent={connectionWarning ? "!" : 0} color="error">
                                    <SyncAltIcon />
                                </Badge>
                            }
                        />
                        <ListItemLink
                            to="/files"
                            primary={i18n.t("mainDrawer.listItems.files")}
                            icon={<AttachFile />}
                        />
                        <ListItemLink
                            to="/queues"
                            primary={i18n.t("mainDrawer.listItems.queues")}
                            icon={<AccountTreeOutlinedIcon />}
                        />
                        <ListItemLink
                            to="/users"
                            primary={i18n.t("mainDrawer.listItems.users")}
                            icon={<PeopleAltOutlinedIcon />}
                        />
                        {/* 
                        {showExternalApi && (
                            <ListItemLink
                                to="/messages-api"
                                primary={i18n.t("mainDrawer.listItems.messagesAPI")}
                                icon={<CodeRoundedIcon />}
                            />
                        )}
                        */}
                        <ListItemLink
                            to="/financeiro"
                            primary={i18n.t("mainDrawer.listItems.financeiro")}
                            icon={<LocalAtmIcon />}
                        />

                        <ListItemLink
                            to="/settings"
                            primary={i18n.t("mainDrawer.listItems.settings")}
                            icon={<SettingsOutlinedIcon />}
                        />

                        {user.super && (
                            <ListSubheader
                                hidden={collapsed}
                                style={{
                                    position: "relative",
                                    fontSize: "17px",
                                    textAlign: "left",
                                    paddingLeft: 20,
                                }}
                                inset
                                color="inherit"
                            >
                                <Typography variant="overline" style={{ fontWeight: "normal" }}>
                                    {" "}
                                    {i18n.t("Sistema")}{" "}
                                </Typography>
                            </ListSubheader>
                        )}
                        {user.super && (
                            <ListItemLink
                                to="/logpacktypebot"
                                primary={i18n.t("mainDrawer.listItems.logpacktypebot")}
                                icon={<AutorenewIcon />}
                            />
                        )}

                        {!collapsed && (
                            <React.Fragment>
                                <Divider />
                                <Typography
                                    style={{
                                        fontSize: "12px",
                                        padding: "10px",
                                        textAlign: "right",
                                        fontWeight: "bold",
                                    }}
                                >
                                    XTravel Perú V: {`${version}`}
                                </Typography>
                            </React.Fragment>
                        )}
                    </>
                )}
            />
            <Divider />
            <li>
                <ListItem button dense onClick={handleClickLogout} className={classes.logoutButton}>
                    <ListItemIcon>
                        <RotateRight />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t("Salir")} />
                </ListItem>
            </li>
        </div>
    );
};

export default MainListItems;
