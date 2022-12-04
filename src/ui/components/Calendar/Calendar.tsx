import { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import * as S from './style'
import locale from 'dayjs/locale/ko'
import weekdayPlugin from 'dayjs/plugin/weekday'
import objectPlugin from 'dayjs/plugin/toObject'
import isTodayPlugin from 'dayjs/plugin/isToday'
import isBetweenPlugin from 'dayjs/plugin/isBetween'

import ChevronIcon from '@/ui/components/Icon/svgs/chevron.svg'

dayjs.extend(weekdayPlugin)
dayjs.extend(objectPlugin)
dayjs.extend(isTodayPlugin)
dayjs.extend(isBetweenPlugin)

// day <- 요일
// date <- 날짜 (1일, 2일 ..)

const formateDateObject = (currentCalendar: dayjs.Dayjs, date: dayjs.Dayjs) => ({
  day: date.toObject().date,
  month: date.toObject().months,
  year: date.toObject().years,
  isCurrentMonth: date.toObject().months === currentCalendar.month(),
  isCurrentDay: date.isToday(),
  unixStamp: date.unix(), // unix time: 1970년 1월 1일 00:00:00 UTC 로부터 현재까지의 누적된 초(seconds) 값
})

type DateCell = ReturnType<typeof formateDateObject>

type WeekDates = DateCell[]

function Calendar() {
  const now = dayjs().locale({
    ...locale,
  })

  const [currentCalendar, setCurrentCalendar] = useState<Dayjs>(now)
  const [allDates, setAllDates] = useState<{ dates: WeekDates }[]>([{ dates: [] }])
  const [range, setRange] = useState<number[]>([
    now.startOf('date').unix(),
    now.startOf('date').unix(),
  ])

  const [unixStampOfOveredDate, setUnixStampOfOveredDate] = useState(0)

  const goNextMonth = () => {
    const target = currentCalendar.add(1, 'month')
    setCurrentCalendar(target)
  }

  const goPrevMonth = () => {
    const target = currentCalendar.subtract(1, 'month')
    setCurrentCalendar(target)
  }

  const getAllDates = () => {
    let date = currentCalendar.startOf('month').weekday(0) // 현재 달력에 해당하는 달의 첫번째 날에 해당하는 주의 첫번째 날 = 달력의 시작점
    const nextMonth = currentCalendar.add(1, 'month').month()

    let weekDates: WeekDates = []
    const allDates: { dates: WeekDates }[] = []

    // 현재 date에 해당하는 주의 첫번째 날에 해당하는 달이 다음달이 아닐때까지 루프 돌리기
    let dayCounter = 1
    while (date.weekday(0).toObject().months !== nextMonth) {
      const formated = formateDateObject(currentCalendar, date)
      weekDates.push(formated)
      if (dayCounter === 7) {
        allDates.push({ dates: weekDates })
        weekDates = []
        dayCounter = 0
      }
      dayCounter++
      date = date.add(1, 'day')
    }

    setAllDates(allDates)
  }

  const handleClickCell = (date: DateCell) => {
    if (range.length === 2 || range.length === 0) {
      setRange([date.unixStamp])
    } else if (range.length === 1) {
      setRange([...range, date.unixStamp].sort((a, b) => a - b))
    }
  }

  useEffect(() => {
    getAllDates()
  }, [currentCalendar])

  const getCellClassName = (date: DateCell) => {
    const isBetween = () => {
      if (range.length === 2)
        return dayjs.unix(date.unixStamp).isBetween(dayjs.unix(range[0]), dayjs.unix(range[1]))
      else if (range.length === 1 && unixStampOfOveredDate)
        return dayjs
          .unix(date.unixStamp)
          .isBetween(dayjs.unix(range[0]), dayjs.unix(unixStampOfOveredDate))
      else return false
    }

    if (date.unixStamp === range[0]) return 'start'
    else if (date.unixStamp === range[1]) return 'end'
    else if (isBetween()) return 'between'
    else if (date.unixStamp === now.unix()) return 'today'
    else return ''
  }

  return (
    <S.Container>
      {/* TODO. helper function */}
      <S.HelperBox>
        <button>오늘</button>
        <button>어제</button>
        <button>이번 주</button>
        <button>저번 주</button>
        <button>이번 달</button>
        <button>저번 달</button>
        <button>최근 7일</button>
        <button>최근 14일</button>
        <button>최근 30일</button>
      </S.HelperBox>
      <S.CalendarBox>
        <S.HeaderBox>
          <ChevronIcon className="left" onClick={() => goPrevMonth()} />
          <span>{currentCalendar.format('YYYY년 MMM')}</span>
          <ChevronIcon className="right" onClick={() => goNextMonth()} />
        </S.HeaderBox>
        <S.DaysBox>
          {Array(7)
            .fill(0)
            .map((_, idx) => {
              return <S.Day key={idx}>{now.weekday(idx).format('dd')}</S.Day>
            })}
        </S.DaysBox>
        <S.DatesBox>
          {allDates.map((weekdates, index) => {
            return (
              <S.Row key={index}>
                {weekdates.dates.map((date, idx) => (
                  <S.Cell
                    onClick={() => handleClickCell(date)}
                    onMouseOver={() => {
                      if (range.length === 2) return
                      setUnixStampOfOveredDate(date.unixStamp)
                    }}
                    onMouseLeave={() => {
                      setUnixStampOfOveredDate(0)
                    }}
                    key={idx}
                    className={getCellClassName(date)}
                  >
                    <span>{date.day}</span>
                  </S.Cell>
                ))}
              </S.Row>
            )
          })}
        </S.DatesBox>
        <S.SelectedRangeBox>
          {range[0] && <span>{dayjs.unix(range[0]).format('YYYY-MM-DD')}</span>}
          {` ~ `}
          {range[1] && <span>{dayjs.unix(range[1]).format('YYYY-MM-DD')}</span>}
        </S.SelectedRangeBox>
      </S.CalendarBox>
    </S.Container>
  )
}

export default Calendar
