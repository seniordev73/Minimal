import merge from 'lodash/merge';
import FullCalendar from '@fullcalendar/react';
import { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core';
import { EventResizeDoneArg } from '@fullcalendar/interaction';
import { useState, useCallback, useRef } from 'react';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { createEvent, updateEvent, deleteEvent } from 'src/redux/slices/calendar';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
import { CALENDAR_COLOR_OPTIONS } from 'src/_mock/_calendar';
// types
import { ICalendarEvent, ICalendarView } from 'src/types/calendar';

// ----------------------------------------------------------------------

export default function useCalendar() {
  const calendarRef = useRef<FullCalendar>(null);

  const calendarEl = calendarRef.current;

  const smUp = useResponsive('up', 'sm');

  const dispatch = useDispatch();

  const [selectedRange, setSelectedRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const [date, setDate] = useState(new Date());

  const [openForm, setOpenForm] = useState(false);

  const [currentEventId, setCurrentEventId] = useState<string | null>(null);

  const [view, setView] = useState<ICalendarView>(smUp ? 'dayGridMonth' : 'listWeek');

  const { events: eventData } = useSelector((state) => state.calendar);

  const events = eventData.map((event) => ({
    ...event,
    textColor: event.color,
  }));

  const currentEvent = useSelector(() => {
    if (currentEventId) {
      return events.find((event) => event.id === currentEventId);
    }

    return null;
  });

  const onOpenForm = useCallback(() => {
    setOpenForm(true);
  }, []);

  const onCloseForm = useCallback(() => {
    setOpenForm(false);
    setSelectedRange(null);
    setCurrentEventId(null);
  }, []);

  const onInitialView = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      const newView = smUp ? 'dayGridMonth' : 'listWeek';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [calendarEl, smUp]);

  const onChangeView = useCallback(
    (newView: ICalendarView) => {
      if (calendarEl) {
        const calendarApi = calendarEl.getApi();

        calendarApi.changeView(newView);
        setView(newView);
      }
    },
    [calendarEl]
  );

  const onDateToday = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  const onDatePrev = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  const onDateNext = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  const onSelectRange = useCallback(
    (arg: DateSelectArg) => {
      if (calendarEl) {
        const calendarApi = calendarEl.getApi();

        calendarApi.unselect();
      }
      onOpenForm();
      setSelectedRange({
        start: arg.start,
        end: arg.end,
      });
    },
    [calendarEl, onOpenForm]
  );

  const onClickEvent = useCallback(
    (arg: EventClickArg) => {
      onOpenForm();
      setCurrentEventId(arg.event.id);
    },
    [onOpenForm]
  );

  const onResizeEvent = useCallback(
    ({ event }: EventResizeDoneArg) => {
      try {
        dispatch(
          updateEvent(event.id, {
            allDay: event.allDay,
            start: event.start,
            end: event.end,
          })
        );
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  const onDropEvent = useCallback(
    ({ event }: EventDropArg) => {
      try {
        dispatch(
          updateEvent(event.id, {
            allDay: event.allDay,
            start: event.start,
            end: event.end,
          })
        );
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  const onCreateEvent = useCallback(
    (newEvent: ICalendarEvent) => {
      dispatch(createEvent(newEvent));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  const onUpdateEvent = useCallback(
    (newEvent: ICalendarEvent) => {
      if (currentEventId) {
        dispatch(updateEvent(currentEventId, newEvent));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, currentEventId]
  );

  const onDeleteEvent = useCallback(
    (eventId: string) => {
      dispatch(deleteEvent(eventId));
    },
    [dispatch]
  );

  const onClickEventInFilters = useCallback(
    (eventId: string) => {
      if (eventId) {
        onOpenForm();
        setCurrentEventId(eventId);
      }
    },
    [onOpenForm]
  );

  const initialEvent = useCallback(() => {
    const initial: ICalendarEvent = {
      title: '',
      description: '',
      color: CALENDAR_COLOR_OPTIONS[1],
      allDay: false,
      start: selectedRange ? new Date(selectedRange.start).toISOString() : new Date().toISOString(),
      end: selectedRange ? new Date(selectedRange.end).toISOString() : new Date().toISOString(),
    };

    if (currentEvent || selectedRange) {
      return merge({}, initial, currentEvent);
    }

    return initial;
  }, [currentEvent, selectedRange]);

  return {
    calendarRef,
    //
    view,
    date,
    events,
    initialEvent,
    currentEvent,
    currentEventId,
    //
    onDatePrev,
    onDateNext,
    onDateToday,
    onDropEvent,
    onChangeView,
    onInitialView,
    onSelectRange,
    onClickEvent,
    onResizeEvent,
    onDeleteEvent,
    onCreateEvent,
    onUpdateEvent,
    //
    openForm,
    onOpenForm,
    onCloseForm,
    //
    onClickEventInFilters,
  };
}
