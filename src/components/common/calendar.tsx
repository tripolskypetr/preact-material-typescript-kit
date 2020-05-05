
/// <reference path="./typography.tsx"/>
/// <reference path="./color.tsx"/>

namespace Material {

  const {
    h,
    Fragment,
  } = preact;

  const {
    useState
  } = preactHooks;

  const {
    style
  } = typestyle;

  interface Day {
    value: moment.Moment
    active: boolean
    disabled: boolean
    selected: boolean
  }

  interface Week {
    days: Day[]
  }

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

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const CalendarCell = ({
    value = moment(),
    active = false,
    disabled = false,
    selected = false,
  }) => {
    return (
      <span className='d-flex align-items-center justify-content-center'>
        {value.format('DD')}
      </span>
    )
  }

  const calendarStyle = {
    container: style({
      display: 'flex',
      flexDirection: 'column'
    }),
    header: style({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    headerRow: style({
      display: 'flex',
      flexDirection: 'row',
    })
  };

  export const Calendar = ({
    now = moment(),
  }) => {

    const [state, setState] = useState({
      calendar: generate(now),
      now
    });

    const select = (value: moment.Moment) => {
      console.log(value)
    }

    const go = (dir: number) => {
      const now = state.now.add(dir, 'month');
      setState({ calendar: generate(now), now });
    }

    return (
      <div className={calendarStyle.container}>
        <div className={calendarStyle.header}>
          <div className={calendarStyle.headerRow}>
            <IconButton icon='keyboard_arrow_left'/>
            <SubtitleTypo2 style={{display: 'flex', alignItems: 'center', margin: 0, padding: 0}}>
              {state.now.format('MMMM YYYY')}
            </SubtitleTypo2>
            <IconButton icon='keyboard_arrow_right'/>
          </div>

        </div>
        <table>
          <tbody>
            <tr>
              {days.map((day) => (
                <td>
                  <CaptionTypo className='d-flex align-items-center justify-content-center' style={{ color: Color.SecondaryOnBackground }}>
                    {moment().day(day).format('ddd').substr(0, 1).toUpperCase()}
                  </CaptionTypo>
                </td>
              ))}
            </tr>
            {state.calendar.map((week: Week) => (
              <tr>
                {week.days.map((day: Day) => (
                  <td disabled={day.disabled} onClick={() => select(day.value)}>
                    <CalendarCell
                      active={day.active}
                      disabled={day.disabled}
                      selected={day.selected}
                      value={day.value} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

}
