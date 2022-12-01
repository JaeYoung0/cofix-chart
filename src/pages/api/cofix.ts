import { CofixRow, CofixType } from '@/domain/cofix'
import { NextApiRequest, NextApiResponse } from 'next'
import * as cheerio from 'cheerio'

// utils
const getTargetContext = (cofixType: CofixType) => {
  // copy selector from chrome elements tab

  if (!cofixType) throw new Error('cannot find cofixType')
  if (cofixType === 'new')
    return `#Content > div.contentArea > div:nth-child(6) > table > tbody > tr`
  else if (cofixType === 'short')
    return `#Content > div.contentArea > div:nth-child(10) > table > tbody > tr`
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

    const crawledData = await crawlCofixData({ cofixType, year: Number(year) })

    res.status(200).json(crawledData ?? { result: [{ startDate: '', endDate: '', value: '' }] })
  }
}

export const crawlCofixData = async ({
  cofixType,
  year,
}: {
  cofixType: CofixType
  year: number
}) => {
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

    return { result: data.reverse() ?? [] }
  } catch (err) {
    console.log('@@err', err)

    console.error(err)
  }
}
