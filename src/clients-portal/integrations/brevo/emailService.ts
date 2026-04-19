import { firestoreService } from '@/clients-portal/integrations/firebase/firestoreService';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY as string;
const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL as string) || 'fernandoecueto@gmail.com';
const ADMIN_EMAIL_FROM = import.meta.env.VITE_ADMIN_EMAIL_FROM as string;
const ADMIN_NAME =
  (import.meta.env.VITE_ADMIN_NAME as string) || 'Fernando E. Cueto';
const APP_NAME =
  (import.meta.env.VITE_APP_NAME as string) ||
  'Portal de Clientes FERNANDO E. CUETO';

interface EmailRecipient {
  email: string;
  name: string;
}

interface SendEmailParams {
  to: EmailRecipient[];
  subject: string;
  htmlContent: string;
}

interface CommentNotificationParams {
  taskId: string;
  taskNumber: string;
  taskTitle: string;
  taskCreatorId: string;
  commenterName: string;
  commentText: string;
  commentCreatedAt: string;
  filesCount: number;
  currentUserId: string;
}

interface TaskCompletedNotificationParams {
  taskNumber: string;
  taskTitle: string;
  taskCreatorId: string;
  completedAt: string;
}

interface NewTaskNotificationParams {
  taskNumber: string;
  taskTitle: string;
  taskDescription: string;
  creatorName: string;
  clientName: string;
  createdAt: string;
}

const buildEmailHtml = (params: {
  taskNumber: string;
  taskTitle: string;
  commenterName: string;
  commentText: string;
  commentDate: string;
  commentTime: string;
  filesCount: number;
  recipientName: string;
}): string => {
  const {
    taskNumber,
    taskTitle,
    commenterName,
    commentText,
    commentDate,
    commentTime,
    filesCount,
    recipientName,
  } = params;

  const filesNote =
    filesCount > 0
      ? `<p style="margin:8px 0 0 0; font-size:13px; color:#6b7280;">
           📎 ${filesCount} archivo${filesCount !== 1 ? 's' : ''} adjunto${filesCount !== 1 ? 's' : ''} al comentario
         </p>`
      : '';

  const commentSection = commentText
    ? `<div style="background:#f9fafb; border-left:3px solid #4f46e5; padding:12px 16px; border-radius:4px; margin:16px 0;">
         <p style="margin:0; font-size:14px; color:#374151; white-space:pre-wrap; line-height:1.6;">${commentText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
         ${filesNote}
       </div>`
    : filesNote
      ? `<div style="background:#f9fafb; border-left:3px solid #4f46e5; padding:12px 16px; border-radius:4px; margin:16px 0;">${filesNote}</div>`
      : '';

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed); padding:28px 32px; border-radius:8px 8px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0; font-size:12px; color:rgba(255,255,255,0.7); text-transform:uppercase; letter-spacing:1px;">${APP_NAME}</p>
                    <h1 style="margin:6px 0 0 0; font-size:20px; font-weight:700; color:#ffffff;">Nuevo comentario en Tarea</h1>
                  </td>
                  <td align="right">
                    <span style="display:inline-block; background:rgba(255,255,255,0.2); color:#fff; font-size:13px; font-weight:600; padding:4px 12px; border-radius:20px;">${taskNumber}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff; padding:28px 32px;">

              <p style="margin:0 0 20px 0; font-size:15px; color:#374151;">
                Hola <strong>${recipientName}</strong>, hay un nuevo comentario en la tarea:
              </p>

              <!-- Task title -->
              <div style="background:#ede9fe; padding:12px 16px; border-radius:6px; margin-bottom:20px;">
                <p style="margin:0; font-size:13px; color:#6d28d9; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">Tarea</p>
                <p style="margin:4px 0 0 0; font-size:15px; color:#1f2937; font-weight:600;">${taskTitle.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>

              <!-- Comment meta -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                <tr>
                  <td style="padding:6px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:36px; height:36px; background:#4f46e5; border-radius:50%; text-align:center; vertical-align:middle;">
                          <span style="color:#fff; font-size:13px; font-weight:700;">${commenterName
                            .split(' ')
                            .slice(0, 2)
                            .map(n => n[0]?.toUpperCase() || '')
                            .join('')}</span>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0; font-size:14px; font-weight:600; color:#111827;">${commenterName.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                          <p style="margin:2px 0 0 0; font-size:12px; color:#9ca3af;">${commentDate} · ${commentTime}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${commentSection}

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:16px 32px; border-radius:0 0 8px 8px; border-top:1px solid #e5e7eb;">
              <p style="margin:0; font-size:12px; color:#9ca3af; text-align:center;">
                Este mensaje fue generado automáticamente por ${APP_NAME}. Por favor no respondas a este correo.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

const buildTaskCompletedEmailHtml = (params: {
  taskNumber: string;
  taskTitle: string;
  completedDate: string;
  completedTime: string;
  recipientName: string;
}): string => {
  const { taskNumber, taskTitle, completedDate, completedTime, recipientName } =
    params;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#059669,#10b981); padding:28px 32px; border-radius:8px 8px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0; font-size:12px; color:rgba(255,255,255,0.75); text-transform:uppercase; letter-spacing:1px;">${APP_NAME}</p>
                    <h1 style="margin:6px 0 0 0; font-size:20px; font-weight:700; color:#ffffff;">✅ Tarea completada</h1>
                  </td>
                  <td align="right">
                    <span style="display:inline-block; background:rgba(255,255,255,0.25); color:#fff; font-size:13px; font-weight:600; padding:4px 12px; border-radius:20px;">${taskNumber}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff; padding:28px 32px;">

              <p style="margin:0 0 20px 0; font-size:15px; color:#374151;">
                Hola <strong>${recipientName}</strong>, tu Tarea ha sido marcada como completada:
              </p>

              <!-- Task title -->
              <div style="background:#ecfdf5; border-left:4px solid #10b981; padding:16px 20px; border-radius:6px; margin-bottom:24px;">
                <p style="margin:0; font-size:13px; color:#065f46; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">Tarea</p>
                <p style="margin:6px 0 0 0; font-size:16px; color:#1f2937; font-weight:600;">${taskTitle.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>

              <!-- Completion date -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding-right:16px; vertical-align:middle;">
                    <div style="width:40px; height:40px; background:#ecfdf5; border-radius:50%; display:flex; align-items:center; justify-content:center; text-align:center; line-height:40px; font-size:18px;">📅</div>
                  </td>
                  <td style="vertical-align:middle;">
                    <p style="margin:0; font-size:13px; color:#6b7280; font-weight:500;">Completada el</p>
                    <p style="margin:2px 0 0 0; font-size:15px; color:#111827; font-weight:600;">${completedDate} · ${completedTime}</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0; font-size:14px; color:#6b7280; line-height:1.6;">
                Si tienes alguna consulta sobre esta Tarea, puedes responder directamente a través del portal.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:16px 32px; border-radius:0 0 8px 8px; border-top:1px solid #e5e7eb;">
              <p style="margin:0; font-size:12px; color:#9ca3af; text-align:center;">
                Este mensaje fue generado automáticamente por ${APP_NAME}. Por favor no respondas a este correo.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

const buildNewTaskEmailHtml = (params: {
  taskNumber: string;
  taskTitle: string;
  taskDescription: string;
  creatorName: string;
  clientName: string;
  createdDate: string;
  createdTime: string;
}): string => {
  const {
    taskNumber,
    taskTitle,
    taskDescription,
    creatorName,
    clientName,
    createdDate,
    createdTime,
  } = params;

  const descriptionPreview =
    taskDescription.length > 300
      ? `${taskDescription.slice(0, 300)}…`
      : taskDescription;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#dc2626,#ea580c); padding:28px 32px; border-radius:8px 8px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0; font-size:12px; color:rgba(255,255,255,0.75); text-transform:uppercase; letter-spacing:1px;">${APP_NAME}</p>
                    <h1 style="margin:6px 0 0 0; font-size:20px; font-weight:700; color:#ffffff;">🔔 Nueva tarea registrada</h1>
                  </td>
                  <td align="right">
                    <span style="display:inline-block; background:rgba(255,255,255,0.25); color:#fff; font-size:13px; font-weight:600; padding:4px 12px; border-radius:20px;">${taskNumber}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff; padding:28px 32px;">

              <p style="margin:0 0 20px 0; font-size:15px; color:#374151;">
                Hola <strong>${ADMIN_NAME}</strong>, se ha registrado una nueva tarea que requiere tu atención:
              </p>

              <!-- Task title -->
              <div style="background:#fef2f2; border-left:4px solid #dc2626; padding:16px 20px; border-radius:6px; margin-bottom:20px;">
                <p style="margin:0; font-size:13px; color:#991b1b; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">Tarea</p>
                <p style="margin:6px 0 0 0; font-size:16px; color:#1f2937; font-weight:600;">${taskTitle.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>

              <!-- Meta info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px; border:1px solid #e5e7eb; border-radius:6px; overflow:hidden;">
                <tr>
                  <td style="padding:10px 16px; background:#f9fafb; border-bottom:1px solid #e5e7eb; width:40%;">
                    <p style="margin:0; font-size:12px; color:#6b7280; font-weight:600; text-transform:uppercase; letter-spacing:0.4px;">Informador</p>
                  </td>
                  <td style="padding:10px 16px; background:#ffffff; border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0; font-size:14px; color:#111827; font-weight:500;">${creatorName.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px; background:#f9fafb; border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0; font-size:12px; color:#6b7280; font-weight:600; text-transform:uppercase; letter-spacing:0.4px;">Cliente</p>
                  </td>
                  <td style="padding:10px 16px; background:#ffffff; border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0; font-size:14px; color:#111827; font-weight:500;">${clientName.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px; background:#f9fafb;">
                    <p style="margin:0; font-size:12px; color:#6b7280; font-weight:600; text-transform:uppercase; letter-spacing:0.4px;">Fecha</p>
                  </td>
                  <td style="padding:10px 16px; background:#ffffff;">
                    <p style="margin:0; font-size:14px; color:#111827; font-weight:500;">${createdDate} · ${createdTime}</p>
                  </td>
                </tr>
              </table>

              <!-- Description -->
              <p style="margin:0 0 8px 0; font-size:13px; color:#6b7280; font-weight:600; text-transform:uppercase; letter-spacing:0.4px;">Descripción</p>
              <div style="background:#f9fafb; border:1px solid #e5e7eb; padding:14px 16px; border-radius:6px;">
                <p style="margin:0; font-size:14px; color:#374151; white-space:pre-wrap; line-height:1.7;">${descriptionPreview.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:16px 32px; border-radius:0 0 8px 8px; border-top:1px solid #e5e7eb;">
              <p style="margin:0; font-size:12px; color:#9ca3af; text-align:center;">
                Este mensaje fue generado automáticamente por ${APP_NAME}. Por favor no respondas a este correo.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

const sendEmail = async (params: SendEmailParams): Promise<void> => {
  if (!BREVO_API_KEY) {
    console.warn('No hay mail service API key?.');
    return;
  }

  const response = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { name: APP_NAME, email: ADMIN_EMAIL_FROM },
      to: params.to,
      subject: params.subject,
      htmlContent: params.htmlContent,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`[Brevo] Error ${response.status}: ${errorBody}`);
  }
};

export const brevoEmailService = {
  async sendCommentNotification(
    params: CommentNotificationParams
  ): Promise<void> {
    if (!BREVO_API_KEY) {
      console.warn('No hay mail service API key?.');
      return;
    }

    const {
      taskCreatorId,
      currentUserId,
      taskNumber,
      taskTitle,
      commenterName,
      commentText,
      commentCreatedAt,
      filesCount,
    } = params;
    const commenterIsCreator = currentUserId === taskCreatorId;

    const date = new Date(commentCreatedAt);
    const commentDate = date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const commentTime = date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const subject = `💬 [${taskNumber}] Nuevo comentario — ${taskTitle.slice(0, 60)}${taskTitle.length > 60 ? '…' : ''}`;

    if (commenterIsCreator) {
      // El creador de la tarea comentó → solo notificar al admin
      await sendEmail({
        to: [{ email: ADMIN_EMAIL, name: ADMIN_NAME }],
        subject,
        htmlContent: buildEmailHtml({
          taskNumber,
          taskTitle,
          commenterName,
          commentText,
          commentDate,
          commentTime,
          filesCount,
          recipientName: ADMIN_NAME,
        }),
      });
    } else {
      // El admin u otro usuario comentó → notificar al admin y al creador de la tarea
      const creatorProfile =
        await firestoreService.getUserProfile(taskCreatorId);

      // Notificación al admin
      await sendEmail({
        to: [{ email: ADMIN_EMAIL, name: ADMIN_NAME }],
        subject,
        htmlContent: buildEmailHtml({
          taskNumber,
          taskTitle,
          commenterName,
          commentText,
          commentDate,
          commentTime,
          filesCount,
          recipientName: ADMIN_NAME,
        }),
      });

      // Notificación al creador si tiene email y es diferente al admin
      if (creatorProfile?.email && creatorProfile.email !== ADMIN_EMAIL) {
        await sendEmail({
          to: [{ email: creatorProfile.email, name: creatorProfile.name }],
          subject,
          htmlContent: buildEmailHtml({
            taskNumber,
            taskTitle,
            commenterName,
            commentText,
            commentDate,
            commentTime,
            filesCount,
            recipientName: creatorProfile.name,
          }),
        });
      }
    }
  },

  async sendNewTaskNotification(
    params: NewTaskNotificationParams
  ): Promise<void> {
    if (!BREVO_API_KEY) {
      console.warn('No hay mail service API key?.');
      return;
    }

    const {
      taskNumber,
      taskTitle,
      taskDescription,
      creatorName,
      clientName,
      createdAt,
    } = params;

    const date = new Date(createdAt);
    const createdDate = date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const createdTime = date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const subject = `🔔 [${taskNumber}] Nueva Tarea — ${taskTitle.slice(0, 55)}${taskTitle.length > 55 ? '…' : ''}`;

    await sendEmail({
      to: [{ email: ADMIN_EMAIL, name: ADMIN_NAME }],
      subject,
      htmlContent: buildNewTaskEmailHtml({
        taskNumber,
        taskTitle,
        taskDescription,
        creatorName,
        clientName,
        createdDate,
        createdTime,
      }),
    });
  },

  async sendTaskCompletedNotification(
    params: TaskCompletedNotificationParams
  ): Promise<void> {
    if (!BREVO_API_KEY) {
      console.warn('No hay mail service API key?.');
      return;
    }

    const { taskNumber, taskTitle, taskCreatorId, completedAt } = params;

    const creatorProfile = await firestoreService.getUserProfile(taskCreatorId);
    if (!creatorProfile) {
      console.warn('No se encontró el perfil del creador de la tarea.');
      return;
    }

    const date = new Date(completedAt);
    const completedDate = date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const completedTime = date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const subject = `✅ [${taskNumber}] La tarea ha sido completada`;

    await sendEmail({
      to: [{ email: creatorProfile.email, name: creatorProfile.name }],
      subject,
      htmlContent: buildTaskCompletedEmailHtml({
        taskNumber,
        taskTitle,
        completedDate,
        completedTime,
        recipientName: creatorProfile.name,
      }),
    });
  },
};
