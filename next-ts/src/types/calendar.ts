import { EventInput } from '@fullcalendar/core';

// ----------------------------------------------------------------------

export type ICalendarFilterValue = string[] | Date | null;

export type ICalendarFilters = {
  colors: string[];
  startDate: Date | null;
  endDate: Date | null;
};

// ----------------------------------------------------------------------

export type ICalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

export type ICalendarEvent = {
  id?: string;
  title: string;
  description: string;
  color: string;
  allDay: boolean;
  start: Date | string | null;
  end: Date | string | null;
};

export type ICalendarState = {
  events: EventInput[];
};
