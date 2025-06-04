export const getNotificationDescription = (notif, role, userId) => {
  const isNew = notif.created_at === notif.updated_at;

  if (role === "admin") {
    return isNew
      ? `${notif.customer_name || "User"} has posted a ticket.`
      : `Ticket #${notif.ticket_id} has been updated.`;
  }

  if (role === "agent") {
    return notif.agent_id === userId
      ? `Ticket #${notif.ticket_id} assigned to you has been updated.`
      : null;
  }

  if (role === "customer") {
    return notif.customer_id === userId
      ? `Your ticket (ID ${notif.ticket_id}) has been updated.`
      : null;
  }

  return null;
};
