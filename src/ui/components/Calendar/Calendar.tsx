import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import * as S from './style'
import locale from 'dayjs/locale/ko'
import weekdayPlugin from 'dayjs/plugin/weekday'
import objectPlugin from 'dayjs/plugin/toObject'
import isTodayPlugin from 'dayjs/plugin/isToday'
import ChevronIcon from '@/ui/components/Icon/svgs/chevron.svg'

dayjs.extend(weekdayPlugin)
dayjs.extend(objectPlugin)
dayjs.extend(isTodayPlugin)

// day <- 요일
// date <- 날짜 (1일, 2일 ..)

const formateDateObject = (currentCalendar: dayjs.Dayjs, date: dayjs.Dayjs) => ({
  day: date.toObject().date,
  month: date.toObject().months,
  year: date.toObject().years,
  isCurrentMonth: date.toObject().months === currentCalendar.month(),
  isCurrentDay: date.isToday(),
})

type WeekDates = ReturnType<typeof formateDateObject>[]

function Calendar() {
  const now = dayjs().locale({
    ...locale,
  })

  const [currentCalendar, setCurrentCalendar] = useState<dayjs.Dayjs>(now)
  const [allDates, setAllDates] = useState<{ dates: WeekDates }[]>([{ dates: [] }])

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

  useEffect(() => {
    getAllDates()
  }, [currentCalendar])

  return (
    <S.Container>
      <S.HeaderWrapper>
        <ChevronIcon className="left" onClick={() => goPrevMonth()} />
        <span>{currentCalendar.format('YYYY년 MMM')}</span>
        <ChevronIcon className="right" onClick={() => goNextMonth()} />
      </S.HeaderWrapper>
      <S.DaysWrapper>
        {Array(7)
          .fill(0)
          .map((_, idx) => {
            return <S.Day key={idx}>{now.weekday(idx).format('dddd')}</S.Day>
          })}
      </S.DaysWrapper>
      <S.DatesWrapper>
        {allDates.map((weekdates, index) => {
          return (
            <S.Row key={index}>
              {weekdates.dates.map((date, idx) => (
                <S.Cell
                  key={idx}
                  className={`${
                    !date.isCurrentMonth ? 'disabled' : date.isCurrentDay ? 'selected' : ''
                  }`}
                >
                  {date.day}
                </S.Cell>
              ))}
            </S.Row>
          )
        })}
      </S.DatesWrapper>
    </S.Container>
  )
}

export default Calendar
