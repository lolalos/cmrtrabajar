import React, { useState, useEffect, useReducer, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import Title from "../../components/Title";
import api from "../../services/api";
import { i18n } from "../../translate/i18n";
import MainHeaderButtonsWrapper from "../../components/MainHeaderButtonsWrapper";
import ScheduleModal from "../../components/ScheduleModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import toastError from "../../errors/toastError";
import moment from "moment";
import { SocketContext } from "../../context/Socket/SocketContext";
import { AuthContext } from "../../context/Auth/AuthContext";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import SearchIcon from "@material-ui/icons/Search";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import * as XLSX from "xlsx";
import Tooltip from "@material-ui/core/Tooltip";
import "./Schedules.css";

// --- Minimalist scrollbar CSS ---
const scrollbarStyles = {
  "&::-webkit-scrollbar": {
    width: "6px",
    background: "transparent"
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#e0e0e0",
    borderRadius: "6px"
  },
  "&:hover::-webkit-scrollbar-thumb": {
    background: "#bdbdbd"
  }
};

function getUrlParam(paramName) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(paramName);
}

const localizer = momentLocalizer(moment);
const defaultMessages = {
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  allDay: "Todo el día",
  week: "Semana",
  work_week: "Agendamientos",
  day: "Día",
  month: "Mes",
  previous: "Anterior",
  next: "Próximo",
  yesterday: "Ayer",
  tomorrow: "Mañana",
  today: "Hoy",
  agenda: "Agenda",
  noEventsInRange: "No hay agendamientos en el período.",
  showMore: total => `+${total} más`
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_SCHEDULES":
      return [...state, ...action.payload];
    case "UPDATE_SCHEDULES":
      const schedule = action.payload;
      const idx = state.findIndex(s => s.id === schedule.id);
      if (idx !== -1) {
        state[idx] = schedule;
        return [...state];
      }
      return [schedule, ...state];
    case "DELETE_SCHEDULE":
      return state.filter(s => s.id !== action.payload);
    case "RESET":
      return [];
    default:
      return state;
  }
};

const useStyles = makeStyles(theme => ({
  mainPaper: {
    flex: 1,
    padding: theme.spacing(1),
    background: "#fafbfc",
    borderRadius: 12,
    boxShadow: "0 1px 6px rgba(60,60,60,0.07)",
    overflowY: "auto",
    minHeight: 400,
    maxHeight: 700,
    ...scrollbarStyles,
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 8,
  },
  search: {
    minWidth: 180,
    background: "#fff",
    borderRadius: 8,
  },
  btn: {
    borderRadius: 8,
    fontSize: 13,
    padding: "6px 14px",
    minWidth: 0,
    boxShadow: "none",
    textTransform: "none",
  },
  calendar: {
    borderRadius: 10,
    background: "#fff",
    padding: 8,
    marginTop: 8,
    fontSize: 13,
    minHeight: 420,
    maxHeight: 520,
    overflowY: "auto",
    ...scrollbarStyles,
    // Mejora visual para el calendario
    "& .rbc-toolbar": {
      background: "#f5f5f5",
      borderRadius: 8,
      marginBottom: 8,
      padding: "6px 8px",
      fontWeight: 500,
    },
    "& .rbc-event": {
      borderRadius: 6,
      background: "#e3f2fd",
      color: "#1976d2",
      border: "none",
      padding: "2px 6px",
      fontSize: 13,
      minWidth: 0,
      maxWidth: 160,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      display: "flex",
      alignItems: "center",
      gap: 4,
    },
    "& .rbc-selected": {
      background: "#1976d2 !important",
      color: "#fff !important"
    },
    "& .rbc-today": {
      background: "#e3f2fd !important"
    }
  },
  event: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 13,
    padding: "2px 6px",
    borderRadius: 6,
    background: "#e3f2fd",
    color: "#1976d2",
    minWidth: 0,
    maxWidth: 160,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  iconBtn: {
    cursor: "pointer",
    fontSize: 18,
    color: "#888",
    "&:hover": { color: "#1976d2" }
  },
  selectedDay: {
    margin: "10px 0 0 10px",
    fontSize: 14,
    color: "#555"
  }
}));

const Schedules = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [deletingSchedule, setDeletingSchedule] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [schedules, dispatch] = useReducer(reducer, []);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactId, setContactId] = useState(+getUrlParam("contactId"));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState(Views.MONTH); // <-- NUEVO: Estado para la vista
  const socketManager = useContext(SocketContext);

  const fetchSchedules = useCallback(async () => {
    try {
      const { data } = await api.get("/schedules/", {
        params: { searchParam, pageNumber },
      });
      dispatch({ type: "LOAD_SCHEDULES", payload: data.schedules });
      setHasMore(data.hasMore);
      setLoading(false);
    } catch (err) {
      toastError(err);
    }
  }, [searchParam, pageNumber]);

  useEffect(() => {
    dispatch({ type: "RESET" });
    setPageNumber(1);
  }, [searchParam]);

  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      fetchSchedules();
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchParam, pageNumber, contactId, fetchSchedules]);

  useEffect(() => {
    if (contactId) setScheduleModalOpen(true);
    const socket = socketManager.getSocket(user.companyId);
    socket.on(`company${user.companyId}-schedule`, data => {
      if (data.action === "update" || data.action === "create") {
        dispatch({ type: "UPDATE_SCHEDULES", payload: data.schedule });
      }
      if (data.action === "delete") {
        dispatch({ type: "DELETE_SCHEDULE", payload: +data.scheduleId });
      }
    });
    return () => socket.disconnect();
  }, [socketManager, user, contactId]);

  const cleanContact = () => setContactId("");
  const handleOpenScheduleModal = () => {
    setSelectedSchedule(null);
    setScheduleModalOpen(true);
  };
  const handleCloseScheduleModal = () => {
    setSelectedSchedule(null);
    setScheduleModalOpen(false);
  };
  const handleSearch = e => setSearchParam(e.target.value.toLowerCase());
  const handleEditSchedule = schedule => {
    setSelectedSchedule(schedule);
    setScheduleModalOpen(true);
  };
  const handleDeleteSchedule = async scheduleId => {
    try {
      await api.delete(`/schedules/${scheduleId}`);
      toast.success(i18n.t("schedules.toasts.deleted"));
    } catch (err) {
      toastError(err);
    }
    setDeletingSchedule(null);
    setSearchParam("");
    setPageNumber(1);
    dispatch({ type: "RESET" });
    setPageNumber(1);
    await fetchSchedules();
  };
  const loadMore = () => setPageNumber(prev => prev + 1);
  const handleScroll = e => {
    if (!hasMore || loading) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - (scrollTop + 100) < clientHeight) loadMore();
  };

  // NUEVO: función para obtener el rango de fechas según la vista
  const getRangeForView = () => {
    if (calendarView === Views.MONTH) {
      const start = moment(selectedDate).startOf("month");
      const end = moment(selectedDate).endOf("month");
      return { start, end };
    }
    if (calendarView === Views.WEEK) {
      const start = moment(selectedDate).startOf("week");
      const end = moment(selectedDate).endOf("week");
      return { start, end };
    }
    if (calendarView === Views.DAY) {
      const start = moment(selectedDate).startOf("day");
      const end = moment(selectedDate).endOf("day");
      return { start, end };
    }
    // Agenda: muestra los próximos 30 días
    if (calendarView === Views.AGENDA) {
      const start = moment(selectedDate).startOf("day");
      const end = moment(selectedDate).add(30, "days").endOf("day");
      return { start, end };
    }
    // Default: día
    const start = moment(selectedDate).startOf("day");
    const end = moment(selectedDate).endOf("day");
    return { start, end };
  };

  // MODIFICADO: descarga según la vista activa
  const handleDownloadXLSReport = () => {
    const { start, end } = getRangeForView();
    const filtered = schedules.filter(sch => {
      const schDate = moment(sch.sendAt);
      return schDate.isBetween(start, end, null, "[]");
    });
    if (filtered.length === 0) {
      toast.info("No hay agendamientos para el período seleccionado.");
      return;
    }
    const data = filtered.map(schedule => ({
      Fecha: moment(schedule.sendAt).format("YYYY-MM-DD"),
      Hora: moment(schedule.sendAt).format("HH:mm:ss"),
      Número: schedule.contact?.number || "",
      Nombre: schedule.contact?.name || "",
      Detalle: schedule.body || ""
    }));
    let fileName = "reporte_agendamientos";
    if (calendarView === Views.MONTH) {
      fileName += `_mes_${start.format("YYYY-MM")}`;
    } else if (calendarView === Views.WEEK) {
      fileName += `_semana_${start.format("YYYY-MM-DD")}_a_${end.format("YYYY-MM-DD")}`;
    } else if (calendarView === Views.DAY) {
      fileName += `_dia_${start.format("YYYY-MM-DD")}`;
    } else if (calendarView === Views.AGENDA) {
      fileName += `_agenda_${start.format("YYYY-MM-DD")}_a_${end.format("YYYY-MM-DD")}`;
    }
    fileName += ".xlsx";
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Agendamientos");
    XLSX.writeFile(wb, fileName);
  };

  const handleSelectSlot = slotInfo => setSelectedDate(slotInfo.start);

  // NUEVO: manejar cambio de vista
  const handleViewChange = view => setCalendarView(view);

  // Custom event wrapper para mejor visualización y tooltip
  const EventWrapper = ({ event }) => (
    <Tooltip title={event.body || ""} arrow>
      <div className={classes.event}>
        <span title={event.contact?.name}>{event.contact?.name?.slice(0, 16) || "Sin nombre"}</span>
        <EditIcon
          className={classes.iconBtn}
          onClick={e => {
            e.stopPropagation();
            handleEditSchedule(event);
          }}
        />
        <DeleteOutlineIcon
          className={classes.iconBtn}
          onClick={e => {
            e.stopPropagation();
            setDeletingSchedule(event);
            setConfirmModalOpen(true);
          }}
        />
      </div>
    </Tooltip>
  );

  return (
    <MainContainer>
      <ConfirmationModal
        title={deletingSchedule && `¿Eliminar agendamiento?`}
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => handleDeleteSchedule(deletingSchedule.id)}
      >
        ¿Está seguro que desea eliminar este agendamiento?
      </ConfirmationModal>
      <ScheduleModal
        open={scheduleModalOpen}
        onClose={handleCloseScheduleModal}
        reload={fetchSchedules}
        aria-labelledby="form-dialog-title"
        scheduleId={selectedSchedule && selectedSchedule.id}
        contactId={contactId}
        cleanContact={cleanContact}
      />
      <MainHeader>
        <div className={classes.header}>
          <Title>Agendamientos <span style={{ color: "#1976d2" }}>({schedules.length})</span></Title>
          <TextField
            className={classes.search}
            placeholder="Buscar contacto"
            type="search"
            size="small"
            value={searchParam}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "#bbb" }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={handleOpenScheduleModal}
          >
            + Agendar
          </Button>
          <Button
            variant="contained"
            className={classes.btn}
            style={{ background: "#1a73e8", color: "#fff" }}
            onClick={handleDownloadXLSReport}
          >
            XLS de la vista
          </Button>
        </div>
      </MainHeader>
      <Paper className={classes.mainPaper} variant="outlined" onScroll={handleScroll}>
        <Calendar
          messages={defaultMessages}
          formats={{
            agendaDateFormat: "DD/MM ddd",
            weekdayFormat: "dddd"
          }}
          localizer={localizer}
          events={schedules.map(schedule => ({
            ...schedule,
            title: schedule.contact?.name?.slice(0, 16) || "Sin nombre",
            start: new Date(schedule.sendAt),
            end: new Date(schedule.sendAt),
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 420 }}
          className={classes.calendar}
          selectable
          popup
          view={calendarView}
          onView={handleViewChange}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={event => setSelectedDate(event.start)}
          components={{
            event: EventWrapper
          }}
        />
        <div className={classes.selectedDay}>
          {calendarView === Views.MONTH && (
            <>Mes seleccionado: <b>{moment(selectedDate).format("MMMM YYYY")}</b></>
          )}
          {calendarView === Views.WEEK && (
            <>Semana: <b>{moment(selectedDate).startOf("week").format("DD/MM")} - {moment(selectedDate).endOf("week").format("DD/MM/YYYY")}</b></>
          )}
          {calendarView === Views.DAY && (
            <>Día seleccionado: <b>{moment(selectedDate).format("YYYY-MM-DD")}</b></>
          )}
          {calendarView === Views.AGENDA && (
            <>Agenda desde: <b>{moment(selectedDate).format("YYYY-MM-DD")}</b></>
          )}
        </div>
      </Paper>
    </MainContainer>
  );
};

export default Schedules;
