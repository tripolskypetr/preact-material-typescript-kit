namespace Material {

  const {
    h
  } = preact;

  const {
    useState,
    useEffect,
  } = preactHooks;

  interface Day {
    value: moment.Moment
    active: boolean
    disabled: boolean
    selected: boolean
  }

  interface Week {
    days: Day[]
  }

  const DayOfWeek = ({
    value = moment(),
    active = false,
    disabled = false,
    selected = false,
    ...otherProps
  }) => (
      <p className={classNames("calendar-day__cell", {
        'calendar-day__cell--disabled': disabled,
        'calendar-day__cell--selected': selected,
        'calendar-day__cell--active': active,
      })} {...otherProps}>{value.format('DD')}</p>
    );

  const currentYear = new Date().getFullYear();

  const PickYear = ({
    onChange = (e: moment.Moment) => debug.log({ e }),
  }) => {

    const [state, setState] = useState({
      year: '',
      month: '',
    });

    const TOTAL_YEARS = 100;

    const years = [...new Array(TOTAL_YEARS)]
      .map((...args) => args[1])
      .map((i) => moment().add(TOTAL_YEARS / 2, 'years').subtract(i, 'years'));

    const months = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december'
    ].map((m) => moment().month(m));

    const setYear = (year: string) => setState({ month: state.month, year });
    const setMonth = (month: string) => setState({ month, year: state.year });

    useEffect(() => {
      const { year, month } = state;
      if (year && month) {
        const date = moment().month(month).year(Number(year));
        onChange(date);
      }
    }, [state, onChange, state.year, state.month]);

    return (
      <div className="calendar-picker">
        {state.year === '' ? years.map((year: moment.Moment) => (
          <div key={year.format('YYYY')} className={classNames("calendar-picker__chip", {
            'calendar-picker__chip--active': year.year() === currentYear
          })} onClick={() => setYear(year.format('YYYY'))}>
            {year.format('YYYY')}
          </div>
        )) : state.month === '' ? months.map((m) => (
          <div key={m.format('MMMM')} className="calendar-picker__chip" onClick={() => setMonth(m.format('MMMM'))}>
            {m.format('MMMM')}
          </div>
        )) : null}
      </div>
    );
  }

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const generate = (now: moment.Moment = moment()) => {
    const startDay = now.clone().startOf('month').startOf('week')
    const endDay = now.clone().endOf('month').endOf('week')
    const date = startDay.clone().subtract(1, 'day')
    const calendar = [];
    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone()
            const active = moment().isSame(value, 'date')
            const disabled = !now.isSame(value, 'month')
            const selected = now.isSame(value, 'date')
            return {
              value, active, disabled, selected
            }
          })
      })
    }
    return calendar;
  }

  const updateSelectedDay = (day: Day, calendar: Week[]) => {
    calendar.forEach((week: Week) => week.days.forEach((d: Day) => {
      if (d.value.format('MMDD') === day.value.format('MMDD')) {
        d.selected = true;
      } else {
        d.selected = false;
      }
    }));
    return calendar;
  }

  export const Calendar = ({
    now = moment(),
    onChange = (e: string) => debug.log({ e }),
  }) => {

    const [state, setState] = useState({ calendar: generate(now), now });
    const [pickYear, setPickYear] = useState(false);

    const go = (dir: number, day?: Day) => {
      const now = state.now.add(dir, 'month');
      const calendar = generate(now);
      setPickYear(false);
      if (day) {
        updateSelectedDay(day, calendar);
        onChange(day.value.format('MM-DD-YYYY'));
      }
      setState({ calendar, now });
    };

    const select = (day: Day) => {
      const { calendar, now } = state;
      updateSelectedDay(day, calendar);
      setState({ calendar, now });
      onChange(day.value.format('MM-DD-YYYY'));
    };

    const pick = (now: moment.Moment) => {
      setState({ calendar: generate(now), now });
      setPickYear(false);
    };

    return (
      <div className="calendar">

        <div className="calendar__header">
          <div className="calendar__headerTitle">
            {state.now.format('MMMM YYYY')}
            <span className="material-icons calendar__headerControl--icon" onClick={() => setPickYear(true)}>keyboard_arrow_down</span>
          </div>
          <div className="calendar__fill" />
          <div className="calendar__headerControl">
            <span className="material-icons calendar__headerControl--icon" onClick={() => go(-1)}>keyboard_arrow_left</span>
            <span className="material-icons calendar__headerControl--icon" onClick={() => go(1)}>keyboard_arrow_right</span>
          </div>
        </div>

        {pickYear && <PickYear onChange={pick} />}

        {!pickYear && (
          <div className="calendar__table">
            {days.map((day) => <div key={day} className="calendar__cell calendar__cell--header">{moment().day(day).format('ddd').substr(0, 1)}</div>)}
            {
              state.calendar.map((week: Week) => week.days.map((day: Day) => (
                <div key={day.value.format('MMDDYY')} className="calendar__cell">
                  <DayOfWeek
                    onClick={() => {
                      if (day.disabled) {
                        go(day.value.date() > 15 ? -1 : 1, day);
                      } else {
                        select(day);
                      }
                    }}
                    active={day.active}
                    disabled={day.disabled}
                    selected={day.selected}
                    value={day.value} />
                </div>
              )))
            }
          </div>
        )}

        <div className="calendar__fill" />

      </div>
    );
  }

}
