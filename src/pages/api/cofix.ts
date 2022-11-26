import { NextApiRequest, NextApiResponse } from 'next'
import * as cheerio from 'cheerio'

export type ShortTermCofixRow = {
  startDate: string // YYYY/MM/DD
  endDate: string // YYYY/MM/DD
  value: string // 1.98
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<{
    result: ShortTermCofixRow[]
  }>
) => {
  if (req.method === 'GET') {
    const year = req.query.year as string

    try {
      const response = await fetch(
        `https://portal.kfb.or.kr/fingoods/cofix.php?BasicYear=${year}&BasicYear_W=${year}`
      )
      const htmlString = await response.text()
      const targetContext = `#Content > div.contentArea > div:nth-child(10) > table > tbody > tr` // copy selector from chrome elements tab
      const $ = cheerio.load(htmlString)
      const data: ShortTermCofixRow[] = []

      $(targetContext).each((idx, el) => {
        if (idx === 0) return // ignore title row
        const tds = $(el).find('td')
        const period = $(tds[1]).text() // "2022/11/12 ~ 2022/11/18"
        const [startDate, endDate] = period.split(' ~ ')
        const cofixValue = $(tds[2]).text()
        const tableRow = { startDate, endDate, value: cofixValue }
        data.push(tableRow)
      })

      res.status(200).json({ result: data.reverse() })
    } catch (error) {
      res.status(404).end()
    }
  }
}
