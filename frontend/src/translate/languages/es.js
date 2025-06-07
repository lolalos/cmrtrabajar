const messages = {
  es: { // Cambiado de 'pt' a 'es' para español
    translations: {
      signup: {
        title: "Registrarse",
        toasts: {
          success: "¡Usuario creado con éxito! ¡Inicia sesión ya mismo!",
          fail: "Error al crear usuario. Verifica los datos ingresados.",
        },
        form: {
          name: "Nombre",
          email: "Correo electrónico",
          password: "Contraseña",
        },
        buttons: {
          submit: "Registrar",
          login: "¿Ya tienes una cuenta? ¡Inicia sesión!",
        },
      },
      login: {
        title: "Iniciar sesión",
        form: {
          email: "Correo electrónico",
          password: "Contraseña",
        },
        buttons: {
          submit: "Entrar",
          register: "¡Regístrate, ahora mismo!",
        },
      },
      plans: {
        form: {
          name: "Nombre",
          users: "Usuarios",
          connections: "Conexiones",
          campaigns: "Campañas",
          schedules: "Agendamientos",
          enabled: "Habilitadas",
          disabled: "Deshabilitadas",
          clear: "Cancelar",
          delete: "Eliminar",
          save: "Guardar",
          yes: "Sí",
          no: "No",
          money: "S/.", // O '$' si es moneda genérica, o el símbolo de la moneda local
        },
      },
      companies: {
        title: "Registrar Empresa",
        form: {
          name: "Nombre de la Empresa",
          plan: "Plan",
          token: "Token",
          submit: "Registrar",
          success: "¡Empresa creada con éxito!",
        },
      },
      auth: {
        toasts: {
          success: "¡Inicio de sesión exitoso!",
        },
        token: "Token",
      },
      dashboard: {
        charts: {
          perDay: {
            title: "Atenciones hoy: ",
          },
        },
      },
      connections: {
        title: "Conexiones",
        toasts: {
          deleted: "¡Conexión de WhatsApp eliminada con éxito!",
        },
        confirmationModal: {
          deleteTitle: "Eliminar",
          deleteMessage: "¿Estás seguro? Esta acción no se puede revertir.",
          disconnectTitle: "Desconectar",
          disconnectMessage:
            "¿Estás seguro? Necesitarás escanear el código QR nuevamente.",
        },
        buttons: {
          add: "Añadir WhatsApp",
          disconnect: "Desconectar",
          tryAgain: "Intentar de nuevo",
          qrcode: "CÓDIGO QR",
          newQr: "Nuevo CÓDIGO QR",
          connecting: "Conectando",
        },
        toolTips: {
          disconnected: {
            title: "Fallo al iniciar sesión de WhatsApp",
            content:
              "Asegúrate de que tu teléfono esté conectado a internet y vuelve a intentarlo, o solicita un nuevo Código QR.",
          },
          qrcode: {
            title: "Esperando escaneo del Código QR",
            content:
              "Haz clic en el botón 'CÓDIGO QR' y escanea el Código QR con tu teléfono para iniciar la sesión.",
          },
          connected: {
            title: "¡Conexión establecida!",
          },
          timeout: {
            title: "Se perdió la conexión con el teléfono",
            content:
              "Asegúrate de que tu teléfono esté conectado a internet y WhatsApp esté abierto, o haz clic en el botón 'Desconectar' para obtener un nuevo Código QR.",
          },
        },
        table: {
          name: "Nombre",
          number: "Número",
          status: "Estado",
          lastUpdate: "Última actualización",
          default: "Predeterminado",
          actions: "Acciones",
          session: "Sesión",
        },
      },
      whatsappModal: {
        title: {
          add: "Añadir WhatsApp",
          edit: "Editar WhatsApp",
        },
        tabs: {
          general: "General",
          messages: "Mensajes",
          assessments: "Evaluaciones",
          integrations: "Integraciones",
          schedules: "Horario de atención",
        },
        form: {
          name: "Nombre",
          default: "Predeterminado",
          sendIdQueue: "Area",
          timeSendQueue: "Redireccionar a la Area en X minutos",
          queueRedirection: "Redireccionamiento de Áreas",
          outOfHoursMessage: "Mensaje fuera del horario de atención",
          queueRedirectionDesc: "Selecciona una Area para que los contactos sin Area sean redireccionados",
          prompt: "Instrucción", // 'Prompt' en este contexto se refiere a una instrucción para un bot o IA
          // maxUseBotQueues: "Enviar bot X veces",
          // timeUseBotQueues: "Intervalo en minutos entre envíos de bot",
          expiresTicket: "Cerrar chats abiertos después de X minutos",
          expiresInactiveMessage: "Mensaje de cierre por inactividad",
          greetingMessage: "Mensaje de bienvenida",
          complationMessage: "Mensaje de finalización",
          sendIdQueue: "Area",
        },
        buttons: {
          okAdd: "Añadir",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
        success: "WhatsApp guardado con éxito.",
      },
      qrCode: {
        message: "Escanea el Código QR para iniciar la sesión",
      },
      contacts: {
        title: "Contactos",
        toasts: {
          deleted: "¡Contacto eliminado con éxito!",
          deletedAll: "¡Todos los contactos eliminados con éxito!",
        },
        searchPlaceholder: "Buscar...",
        confirmationModal: {
          deleteTitle: "Eliminar",
          deleteAllTitle: "Eliminar Todos",
          importTitle: "Importar contactos",
          deleteMessage: "¿Estás seguro de que deseas eliminar este contacto? Todos los tickets relacionados se perderán.",
          deleteAllMessage: "¿Estás seguro de que deseas eliminar todos los contactos? Todos los tickets relacionados se perderán.",
          importMessage: "¿Deseas importar todos los contactos del teléfono?",
        },
        buttons: {
          import: "Importar Contactos",
          importSheet: "Importar Excel",
          add: "Añadir Contacto",
          export: "Exportar Contactos",
          delete: "Eliminar Todos los Contactos",
        },
        table: {
          name: "Nombre",
          whatsapp: "WhatsApp",
          email: "Correo electrónico",
          actions: "Acciones",
        },
      },
      queueIntegrationModal: {
        title: {
          add: "Añadir proyecto",
          edit: "Editar proyecto",
        },
        form: {
          id: "ID",
          type: "Tipo",
          name: "Nombre",
          projectName: "Nombre del Proyecto",
          language: "Idioma",
          jsonContent: "Contenido JSON",
          urlN8N: "URL",
          typebotSlug: "Typebot - Slug",
          typebotExpires: "Tiempo en minutos para expirar una conversación",
          typebotKeywordFinish: "Palabra para finalizar el ticket",
          typebotKeywordRestart: "Palabra para reiniciar el flujo",
          typebotRestartMessage: "Mensaje al reiniciar la conversación",
          typebotUnknownMessage: "Mensaje de opción inválida",
          typebotDelayMessage: "Intervalo (ms) entre mensajes",
        },
        buttons: {
          okAdd: "Añadir",
          okEdit: "Guardar",
          cancel: "Cancelar",
          test: "Probar Bot",
        },
        messages: {
          testSuccess: "¡Integración probada con éxito!",
          addSuccess: "Integración añadida con éxito.",
          editSuccess: "Integración editada con éxito.",
        },
      },
      sideMenu: {
        name: "Menú Lateral Inicial",
        note: "Si está habilitado, el menú lateral se iniciará cerrado",
        options: {
          enabled: "Abierto",
          disabled: "Cerrado",
        },
      },
      promptModal: {
        form: {
          name: "Nombre",
          prompt: "Instrucción", // 'Prompt' en este contexto es una instrucción o indicación
          voice: "Voz",
          max_tokens: "Máximo de Tokens en la respuesta",
          temperature: "Temperatura",
          apikey: "Clave API",
          max_messages: "Máximo de mensajes en el Historial",
          voiceKey: "Clave de API de Voz",
          voiceRegion: "Región de Voz",
        },
        success: "¡Instrucción guardada con éxito!",
        title: {
          add: "Añadir Instrucción",
          edit: "Editar Instrucción",
        },
        buttons: {
          okAdd: "Añadir",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
      },
      prompts: {
        title: "Instrucciones",
        table: {
          name: "Nombre",
          queue: "Sector/Area",
          max_tokens: "Máx. Tokens Respuesta",
          actions: "Acciones",
        },
        confirmationModal: {
          deleteTitle: "Eliminar",
          deleteMessage: "¿Estás seguro? ¡Esta acción no se puede revertir!",
        },
        buttons: {
          add: "Añadir Instrucción",
        },
      },
      contactModal: {
        title: {
          add: "Añadir contacto",
          edit: "Editar contacto",
        },
        form: {
          mainInfo: "Datos del contacto",
          extraInfo: "Información adicional",
          name: "Nombre",
          number: "Número de WhatsApp",
          email: "Correo electrónico",
          extraName: "Nombre del campo",
          extraValue: "Valor",
          disableBot: "Deshabilitar chatbot",
          whatsapp: "Conexión de Origen: "
        },
        buttons: {
          addExtraInfo: "Añadir información",
          okAdd: "Añadir",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
        success: "Contacto guardado con éxito.",
      },
      queueModal: {
        title: {
          add: "Añadir Area",
          edit: "Editar Area",
        },
        confirmationModal: {
          "deleteTitle": "Eliminar",
        },
        form: {
          name: "Nombre",
          color: "Color",
          greetingMessage: "Mensaje de bienvenida",
          complationMessage: "Mensaje de finalización",
          outOfHoursMessage: "Mensaje fuera del horario de atención",
          ratingMessage: "Mensaje de evaluación",
          token: "Token",
          orderQueue: "Orden de la Area (Bot)",
          integrationId: "Integración",
        },
        buttons: {
          okAdd: "Añadir",
          okEdit: "Guardar",
          cancel: "Cancelar",
          attach: "Adjuntar Archivo",
        },
        serviceHours: {
          dayWeek: "Día de la semana",
          startTimeA: "Hora Inicial - 1",
          endTimeA: "Hora Final - 1",
          startTimeB: "Hora Inicial - 2",
          endTimeB: "Hora Final - 2",
          monday: "Lunes",
          tuesday: "Martes",
          wednesday: "Miércoles",
          thursday: "Jueves",
          friday: "Viernes",
          saturday: "Sábado",
          sunday: "Domingo",
        },
      },
      userModal: {
        title: {
          add: "Añadir usuario",
          edit: "Editar usuario",
        },
        form: {
          name: "Nombre",
          email: "Correo electrónico",
          password: "Contraseña",
          profile: "Perfil",
          whatsapp: "Conexión Predeterminada",
          allTicket: "Ticket Sin Area [Invisible]",
          allTicketEnabled: "Habilitado",
          allTicketDesabled: "Deshabilitado",
        },
        buttons: {
          okAdd: "Añadir",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
        success: "Usuario guardado con éxito.",
      },
      scheduleModal: {
        title: {
          add: "Nuevo Agendamiento",
          edit: "Editar Agendamiento",
        },
        form: {
          body: "Mensaje",
          contact: "Contacto",
          sendAt: "Fecha de Agendamiento",
          sentAt: "Fecha de Envío",
        },
        buttons: {
          okAdd: "Añadir",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
        success: "Agendamiento guardado con éxito.",
      },
      tagModal: {
        title: {
          add: "Nueva Etiqueta",
          edit: "Editar Etiqueta",
        },
        form: {
          name: "Nombre",
          color: "Color",
        },
        buttons: {
          okAdd: "Añadir",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
        success: "Etiqueta guardada con éxito.",
      },
      chat: {
        noTicketMessage: "Selecciona un ticket para empezar a conversar.",
      },
      uploads: {
        titles: {
          titleUploadMsgDragDrop: "ARRASTRA Y SUELTA ARCHIVOS EN EL CAMPO DE ABAJO",
          titleFileList: "Lista de archivo(s)"
        },
      },
      ticketsManager: {
        buttons: {
          newTicket: "Nuevo",
          closeallTicket: "Cerrar",
        },
      },
      ticketsQueueSelect: {
        placeholder: "Redireccionamiento de Áreas",
      },
      tickets: {
        inbox: {
          closedAllTickets: "¿Cerrar todos los tickets?",
          closedAll: "Cerrar Todos",
          newTicket: "Nuevo Ticket",
          yes: "SÍ",
          no: "NO",
          open: "Abiertos",
          resolverd: "Resueltos",
        },
        toasts: {
          deleted: "La atención en la que estabas fue eliminada.",
        },
        notification: {
          message: "Mensaje de",
        },
        tabs: {
          open: { title: "Abiertas" },
          closed: { title: "Resueltos" },
          search: { title: "Búsqueda" },
        },
        search: {
          placeholder: "Buscar atención y mensajes",
          filterConnections: "Filtro por conexiones",
          filterContacts: "Filtro por contacto",
          filterConections: "Filtro por Conexión",
          filterConectionsOptions: {
            open: "Abierto",
            closed: "Cerrado",
            pending: "Pendiente",
          },
          filterUsers: "Filtro por Usuarios",
          ticketsPerPage: "Tickets por página",
        },
        buttons: {
          showAll: "Todos",
        },
      },
      transferTicketModal: {
        title: "Transferir Ticket",
        fieldLabel: "Escribe para buscar usuarios",
        fieldQueueLabel: "Transferir a Area",
        fieldQueuePlaceholder: "Selecciona una Area",
        noOptions: "Ningún usuario encontrado con ese nombre",
        buttons: {
          ok: "Transferir",
          cancel: "Cancelar",
        },
      },
      ticketsList: {
        pendingHeader: "Esperando",
        assignedHeader: "Atendiendo",
        noTicketsTitle: "¡Nada aquí!",
        noTicketsMessage:
          "Ninguna atención encontrada con ese estado o término buscado.",
        buttons: {
          accept: "Aceptar",
          closed: "Finalizar",
          transfer: "Transferir",
          reopen: "Reabrir",
          exportAsPDF: "Exportar en PDF",
        },
      },
      newTicketModal: {
        title: "Crear Ticket",
        fieldLabel: "Escribe para buscar el contacto",
        add: "Añadir",
        buttons: {
          ok: "Guardar",
          cancel: "Cancelar",
        },
      },
      mainDrawer: {
        listItems: {
          dashboard: "Panel de control",
          connections: "Conexiones",
          tickets: "Atenciones",
          quickMessages: "Respuestas Rápidas",
          contacts: "Contactos",
          queues: "Áreas & Chatbot",
          tags: "Etiquetas",
          administration: "Administración",
          users: "Usuarios",
          settings: "Configuraciones",
          helps: "Ayuda",
          messagesAPI: "API",
          schedules: "Agendamientos",
          campaigns: "Campañas",
          annoucements: "Informativos",
          logpacktypebot: "Actualizaciones",
          chats: "Chat Interno",
          financeiro: "Financiero",
          files: "Lista de archivos",
          prompts: "Open.AI",
          reports: "Informes",
          queueIntegration: "Integraciones",
        },
        appBar: {
          notRegister: "Sin notificaciones",
          user: {
            profile: "Perfil",
            logout: "Cerrar sesión",
          },
        },
      },
      queueIntegration: {
        title: "Integraciones",
        table: {
          id: "ID",
          type: "Tipo",
          name: "Nombre",
          projectName: "Nombre del Proyecto",
          language: "Idioma",
          lastUpdate: "Última actualización",
          actions: "Acciones",
        },
        buttons: {
          add: "Añadir Proyecto",
        },
        searchPlaceholder: "Buscar...",
        confirmationModal: {
          deleteTitle: "Eliminar",
          deleteMessage:
            "¿Estás seguro? ¡Esta acción no se puede revertir! Y será eliminada de las Áreas y conexiones vinculadas.",
        },
      },
      reports: {
        title: "Informes de Atenciones",
        table: {
          id: "Ticket",
          user: "Usuario",
          dateOpen: "Fecha de Apertura",
          dateClose: "Fecha de Cierre",
          NPS: "NPS",
          status: "Estado",
          whatsapp: "Conexión",
          queue: "Area",
          actions: "Acciones",
          lastMessage: "Últ. Mensaje",
          contact: "Cliente",
          supportTime: "Tiempo de Atención",
        },
        buttons: {
          filter: "Aplicar Filtro",
        },
        searchPlaceholder: "Buscar...",
      },
      files: {
        title: "Lista de archivos",
        table: {
          name: "Nombre",
          contacts: "Contactos",
          actions: "Acción",
        },
        toasts: {
          deleted: "¡Lista eliminada con éxito!",
          deletedAll: "¡Todas las listas fueron eliminadas con éxito!",
        },
        buttons: {
          add: "Añadir",
          deleteAll: "Eliminar Todos",
        },
        confirmationModal: {
          deleteTitle: "Eliminar",
          deleteAllTitle: "Eliminar Todos",
          deleteMessage: "¿Estás seguro de que deseas eliminar esta lista?",
          deleteAllMessage: "¿Estás seguro de que deseas eliminar todas las listas?",
        },
      },
      messagesAPI: {
        title: "API",
        textMessage: {
          number: "Número",
          body: "Mensaje",
          token: "Token registrado",
        },
        mediaMessage: {
          number: "Número",
          body: "Nombre del archivo",
          media: "Archivo",
          token: "Token registrado",
        },
      },
      notifications: {
        noTickets: "Ninguna notificación.",
      },
      quickMessages: {
        title: "Respuestas Rápidas",
        searchPlaceholder: "Buscar...",
        noAttachment: "Sin adjunto",
        confirmationModal: {
          deleteTitle: "Eliminación",
          deleteMessage: "¡Esta acción es irreversible! ¿Deseas continuar?",
        },
        buttons: {
          add: "Añadir",
          attach: "Adjuntar Archivo",
          cancel: "Cancelar",
          edit: "Editar",
        },
        toasts: {
          success: "¡Atajo añadido con éxito!",
          deleted: "¡Atajo eliminado con éxito!",
        },
        dialog: {
          title: "Mensaje Rápido",
          shortcode: "Atajo",
          message: "Respuesta",
          save: "Guardar",
          cancel: "Cancelar",
          geral: "Permitir editar", // 'geral' -> general
          add: "Añadir",
          edit: "Editar",
          visao: "Permitir vista", // 'visao' -> vista/visión
          geral: 'Global', // Esta key se repite, considero que esta es la intención
        },
        table: {
          shortcode: "Atajo",
          message: "Mensaje",
          actions: "Acciones",
          mediaName: "Nombre del Archivo",
          status: 'Global',
        },
      },
      messageVariablesPicker: {
        label: "Variables disponibles",
        vars: {
          contactFirstName: "Primer Nombre",
          contactName: "Nombre",
          greeting: "Saludo",
          protocolNumber: "Protocolo",
          date: "Fecha",
          hour: "Hora",
        },
      },
      contactLists: {
        title: "Listas de Contactos",
        table: {
          name: "Nombre",
          contacts: "Contactos",
          actions: "Acciones",
        },
        buttons: {
          add: "Nueva Lista",
        },
        dialog: {
          name: "Nombre",
          company: "Empresa",
          okEdit: "Editar",
          okAdd: "Añadir",
          add: "Añadir",
          edit: "Editar",
          cancel: "Cancelar",
        },
        confirmationModal: {
          deleteTitle: "Eliminar",
          deleteMessage: "Esta acción no se puede revertir.",
        },
        toasts: {
          deleted: "Registro eliminado",
        },
      },
      contactListItems: {
        title: "Contactos",
        searchPlaceholder: "Búsqueda",
        buttons: {
          add: "Nuevo",
          lists: "Listas",
          import: "Importar",
        },
        dialog: {
          name: "Nombre",
          number: "Número",
          whatsapp: "WhatsApp",
          email: "Correo electrónico",
          okEdit: "Editar",
          okAdd: "Añadir",
          add: "Añadir",
          edit: "Editar",
          cancel: "Cancelar",
        },
        table: {
          name: "Nombre",
          number: "Número",
          whatsapp: "WhatsApp",
          email: "Correo electrónico",
          actions: "Acciones",
        },
        confirmationModal: {
          deleteTitle: "Eliminar",
          deleteMessage: "Esta acción no se puede revertir.",
          importMessage: "¿Deseas importar los contactos de esta hoja de cálculo?",
          importTitlte: "Importar",
        },
        toasts: {
          deleted: "Registro eliminado",
        },
      },
      campaigns: {
        title: "Campañas",
        searchPlaceholder: "Búsqueda",
        buttons: {
          add: "Nueva Campaña",
          contactLists: "Listas de Contactos",
        },
        table: {
          name: "Nombre",
          whatsapp: "Conexión",
          contactList: "Lista de Contactos",
          status: "Estado",
          scheduledAt: "Agendamiento",
          completedAt: "Completada",
          confirmation: "Confirmación",
          actions: "Acciones",
        },
        dialog: {
          new: "Nueva Campaña",
          update: "Editar Campaña",
          readonly: "Solo Lectura",
          form: {
            name: "Nombre",
            message1: "Mensaje 1",
            message2: "Mensaje 2",
            message3: "Mensaje 3",
            message4: "Mensaje 4",
            message5: "Mensaje 5",
            confirmationMessage1: "Mensaje de Confirmación 1",
            confirmationMessage2: "Mensaje de Confirmación 2",
            confirmationMessage3: "Mensaje de Confirmación 3",
            confirmationMessage4: "Mensaje de Confirmación 4",
            confirmationMessage5: "Mensaje de Confirmación 5",
            messagePlaceholder: "Contenido del mensaje",
            whatsapp: "Conexión",
            status: "Estado",
            scheduledAt: "Agendamiento",
            confirmation: "Confirmación",
            contactList: "Lista de Contactos",
            tagList: "Lista de Etiquetas",
            fileList: "Lista de Archivos",
          },
          buttons: {
            add: "Añadir",
            edit: "Actualizar",
            okadd: "Ok",
            cancel: "Cancelar Envíos",
            restart: "Reiniciar Envíos",
            close: "Cerrar",
            attach: "Adjuntar Archivo",
          },
        },
        confirmationModal: {
          deleteTitle: "Eliminar",
          deleteMessage: "Esta acción no se puede revertir.",
        },
        toasts: {
          success: "Operación realizada con éxito",
          cancel: "Campaña cancelada",
          restart: "Campaña reiniciada",
          deleted: "Registro eliminado",
        },
      },
      announcements: {
        active: 'Activo',
        inactive: 'Inactivo',
        title: "Informativos",
        searchPlaceholder: "Búsqueda",
        buttons: {
          add: "Nuevo Informativo",
          contactLists: "Listas de Informativos", // Cambiado de 'Listas de Informativos'
        },
        table: {
          priority: "Prioridad",
          title: "Título",
          text: "Texto",
          mediaName: "Archivo",
          status: "Estado",
          actions: "Acciones",
        },
        dialog: {
          edit: "Edición de Informativo",
          add: "Nuevo Informativo",
          update: "Editar Informativo",
          readonly: "Solo Visualización",
          form: {
            priority: "Prioridad",
            title: "Título",
            text: "Texto",
            mediaPath: "Archivo",
            status: "Estado",
          },
          buttons: {
            add: "Añadir",
            edit: "Actualizar",
            okadd: "Ok",
            cancel: "Cancelar",
            close: "Cerrar",
            attach: "Adjuntar Archivo",
          },
        },
        confirmationModal: {
          deleteTitle: "Eliminar",
          deleteMessage: "Esta acción no se puede revertir.",
        },
        toasts: {
          success: "Operación realizada con éxito",
          deleted: "Registro eliminado",
        },
      },
      campaignsConfig: {
        title: "Configuraciones de Campañas",
      },
      queues: {
        title: "Áreas & Chatbot",
        table: {
          id: "ID",
          name: "Nombre",
          color: "Color",
          greeting: "Mensaje de bienvenida",
          actions: "Acciones",
          orderQueue: "Orden de la Area (bot)",
        },
        buttons: {
          add: "Añadir Area",
        },
        confirmationModal: {
          deleteTitle: "Eliminar",
          deleteMessage:
            "¿Estás seguro? ¡Esta acción no se puede revertir! Las atenciones de esta Area seguirán existiendo, pero ya no tendrán ninguna Area asignada.",
        },
      },
      queueSelect: {
        inputLabel: "Áreas",
      },
      users: {
        title: "Usuarios",
        table: {
          id: "ID",
          name: "Nombre",
          status: "Estado",
          email: "Correo electrónico",
          profile: "Perfil",
          actions: "Acciones",
        },
        status: {
          online: "Usuarios en línea",
          offline: "Usuarios fuera de línea",
        },
        buttons: {
          add: "Añadir usuario",
        },
        toasts: {
          deleted: "Usuario eliminado con éxito.",
        },
        confirmationModal: {
          deleteTitle: "Eliminar",
          deleteMessage:
            "Todos los datos del usuario se perderán. Las atenciones abiertas de este usuario se moverán a la Area.",
        },
      },
      helps: {
        title: "Centro de Ayuda",
      },
      schedules: {
        title: "Agendamientos",
        confirmationModal: {
          deleteTitle: "¿Estás seguro de que quieres eliminar este Agendamiento?",
          deleteMessage: "Esta acción no se puede revertir.",
        },
        table: {
          contact: "Contacto",
          body: "Mensaje",
          sendAt: "Fecha de Agendamiento",
          sentAt: "Fecha de Envío",
          status: "Estado",
          actions: "Acciones",
        },
        buttons: {
          add: "Nuevo Agendamiento",
        },
        toasts: {
          deleted: "Agendamiento eliminado con éxito.",
        },
      },
      tags: {
        title: "Etiquetas",
        confirmationModal: {
          deleteTitle: "¿Estás seguro de que quieres eliminar esta Etiqueta?",
          deleteMessage: "Esta acción no se puede revertir.",
          deleteAllMessage: "¿Estás seguro de que deseas eliminar todas las Etiquetas?",
          deleteAllTitle: "Eliminar Todos",
        },
        table: {
          name: "Nombre",
          color: "Color",
          tickets: "Registros Etiquetados",
          actions: "Acciones",
        },
        buttons: {
          add: "Nueva Etiqueta",
          deleteAll: "Eliminar Todas",
        },
        toasts: {
          deletedAll: "¡Todas las Etiquetas eliminadas con éxito!",
          deleted: "Etiqueta eliminada con éxito.",
        },
      },
      settings: {
        success: "Configuraciones guardadas con éxito.",
        title: "Configuraciones",
        settings: {
          userCreation: {
            name: "Creación de usuario",
            options: {
              enabled: "Activado",
              disabled: "Desactivado",
            },
          },
        },
      },
      messagesList: {
        header: {
          assignedTo: "Asignado a:",
          buttons: {
            return: "Regresar",
            resolve: "Resolver",
            reopen: "Reabrir",
            accept: "Aceptar",
          },
        },
      },
      messagesInput: {
        placeholderOpen: "Escribe un mensaje",
        placeholderClosed:
          "Reabre o acepta este ticket para enviar un mensaje.",
        signMessage: "Firmar",
      },
      contactDrawer: {
        header: "Datos del contacto",
        buttons: {
          edit: "Editar contacto",
        },
        extraInfo: "Otras informaciones",
      },
      fileModal: {
        title: {
          add: "Añadir lista de archivos",
          edit: "Editar lista de archivos",
        },
        buttons: {
          okAdd: "Guardar",
          okEdit: "Editar",
          cancel: "Cancelar",
          fileOptions: "Añadir archivo",
        },
        form: {
          name: "Nombre de la lista de archivos",
          message: "Detalles de la lista",
          fileOptions: "Lista de archivos",
          extraName: "Mensaje para enviar con archivo",
          extraValue: "Valor de la opción",
        },
        success: "¡Lista de archivos guardada con éxito!",
      },
      ticketOptionsMenu: {
        schedule: "Agendamiento",
        delete: "Eliminar",
        transfer: "Transferir",
        registerAppointment: "Observaciones del Contacto",
        appointmentsModal: {
          title: "Observaciones del Contacto",
          textarea: "Observación",
          placeholder: "Inserta aquí la información que deseas registrar",
        },
        confirmationModal: {
          title: "Eliminar el ticket",
          titleFrom: "del contacto ",
          message:
            "¡Atención! Todos los mensajes relacionados con el ticket se perderán.",
        },
        buttons: {
          delete: "Eliminar",
          cancel: "Cancelar",
        },
      },
      confirmationModal: {
        buttons: {
          confirm: "Ok",
          cancel: "Cancelar",
        },
      },
      messageOptionsMenu: {
        delete: "Eliminar",
        reactionSuccess: "Reacción añadida",
        reply: "Responder",
        edit: 'Editar Mensaje',
        forward: "Reenviar",
        toForward: "Reenviar",
        react: "Reaccionar",
        confirmationModal: {
          title: "¿Borrar mensaje?",
          message: "Esta acción no se puede revertir.",
        },
      },
      backendErrors: {
        ERR_NO_OTHER_WHATSAPP: "Debe haber al menos un WhatsApp predeterminado.",
        ERR_NO_DEF_WAPP_FOUND:
          "No se encontró ningún WhatsApp predeterminado. Verifica la página de conexiones.",
        ERR_WAPP_NOT_INITIALIZED:
          "Esta sesión de WhatsApp no ha sido inicializada. Verifica la página de conexiones.",
        ERR_WAPP_CHECK_CONTACT:
          "No se pudo verificar el contacto de WhatsApp. Verifica la página de conexiones.",
        ERR_WAPP_INVALID_CONTACT: "Este no es un número de WhatsApp válido.",
        ERR_WAPP_DOWNLOAD_MEDIA:
          "No se pudo descargar el medio de WhatsApp. Verifica la página de conexiones.",
        ERR_INVALID_CREDENTIALS:
          "Error de autenticación. Por favor, inténtalo de nuevo.",
        ERR_SENDING_WAPP_MSG:
          "Error al enviar mensaje de WhatsApp. Verifica la página de conexiones.",
        ERR_DELETE_WAPP_MSG: "No se pudo eliminar el mensaje de WhatsApp.",
        ERR_OTHER_OPEN_TICKET: "Ya existe un ticket abierto para este contacto.",
        ERR_SESSION_EXPIRED: "Sesión expirada. Por favor, inicia sesión.",
        ERR_USER_CREATION_DISABLED:
          "La creación de usuario ha sido deshabilitada por el administrador.",
        ERR_NO_PERMISSION: "No tienes permiso para acceder a este recurso.",
        ERR_DUPLICATED_CONTACT: "Ya existe un contacto con este número.",
        ERR_NO_SETTING_FOUND: "Ninguna configuración encontrada con este ID.",
        ERR_NO_CONTACT_FOUND: "Ningún contacto encontrado con este ID.",
        ERR_NO_TICKET_FOUND: "Ningún ticket encontrado con este ID.",
        ERR_NO_USER_FOUND: "Ningún usuario encontrado con este ID.",
        ERR_NO_WAPP_FOUND: "Ningún WhatsApp encontrado con este ID.",
        ERR_CREATING_MESSAGE: "Error al crear mensaje en la base de datos.",
        ERR_CREATING_TICKET: "Error al crear ticket en la base de datos.",
        ERR_FETCH_WAPP_MSG:
          "Error al buscar el mensaje en WhatsApp, quizás sea demasiado antiguo.",
        ERR_QUEUE_COLOR_ALREADY_EXISTS:
          "Este color ya está en uso, elige otro.",
        ERR_WAPP_GREETING_REQUIRED:
          "El mensaje de bienvenida es obligatorio cuando hay más de una Area.",
        ERR_CHECK_NUMBER: "Número inválido. Verifica el número e inténtalo de nuevo.",
      },
    },
  },
};

export { messages };