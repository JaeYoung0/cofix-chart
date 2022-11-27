import { NextApiRequest, NextApiResponse } from 'next'
import * as cheerio from 'cheerio'
import { CofixType } from '../../components/CofixChart'

// utils
const getTargetContext = (cofixType: CofixType) => {
  // copy selector from chrome elements tab

  if (!cofixType) throw new Error('cannot find cofixType')
  if (cofixType === 'new')
    return `#Content > div.contentArea > div:nth-child(6) > table > tbody > tr`
  else if (cofixType === 'short')
    return `#Content > div.contentArea > div:nth-child(10) > table > tbody > tr`
}

export type CofixRow = {
  startDate: string // YYYY/MM/DD
  endDate: string // YYYY/MM/DD
  value: string // 1.98
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<{
    result: CofixRow[]
  }>
) => {
  if (req.method === 'GET') {
    const year = req.query.year as string
    const cofixType = req.query.cofixType as CofixType

    try {
      const response = await fetch(
        `https://portal.kfb.or.kr/fingoods/cofix.php?BasicYear=${year}&BasicYear_W=${year}`
      )
      const htmlString = await response.text()
      const $ = cheerio.load(htmlString)
      const data: CofixRow[] = []

      if (cofixType === 'short') {
        $(getTargetContext(cofixType)).each((idx, el) => {
          if (idx === 0) return // ignore title row
          const tds = $(el).find('td') // 공시일 | 대상기간 | 단기 COFIX
          const period = $(tds[1]).text() // "2022/11/12 ~ 2022/11/18"
          const [startDate, endDate] = period.split(' ~ ')
          const value = $(tds[2]).text()
          const tableRow = { startDate, endDate, value }
          data.push(tableRow)
        })
      } else if (cofixType === 'new') {
        $(getTargetContext(cofixType)).each((idx, el) => {
          if (idx === 0) return // ignore title row
          const tds = $(el).find('td') // 공시일 | 대상월 | 신규취급액기준 COFIX | 잔액기준 COFIX | 신 잔액기준 COFIX
          const startDate = $(tds[1]).text()
          const endDate = ''
          const value = $(tds[4]).text()
          const tableRow = { startDate, endDate, value }
          data.push(tableRow)
        })
      }
      res.status(200).json({ result: data.reverse() })
    } catch (error) {
      res.status(404).end()
    }
  }
}
