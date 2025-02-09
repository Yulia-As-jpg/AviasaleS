import { Ticket } from '../api/ticketApi';

export const generateUniqKey = (ticket: Ticket): string =>
  `${ticket.carrier}${ticket.segments[0].date}${ticket.segments[0].origin}-${ticket.segments[0].destination}`;