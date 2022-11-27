import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { CofixRow } from '../pages/api/cofix'
import useCofix from '../hooks/useCofix'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
}

const getData = (rows: CofixRow[]) => rows.map((item) => item.value)

function ShortCofixChart() {
  const { shortCofixRows: rows } = useCofix()

  const getLabels = (rows: CofixRow[]) =>
    rows.map((item) => {
      const [_, month, day] = item.startDate.split('/')
      return `${month}/${day}`
    })

  const data = {
    labels: getLabels(rows),
    datasets: [
      {
        label: '단기 COFIX',
        data: getData(rows),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return <Bar options={options} data={data} />
}

function NewCofixChart() {
  const { newCofixRows: rows } = useCofix()

  const getLabels = (rows: CofixRow[]) =>
    rows.map((item) => {
      const [year, month] = item.startDate.split('/')
      return `${year}/${month}`
    })

  const data = {
    labels: getLabels(rows),
    datasets: [
      {
        label: '신 잔액 COFIX',
        data: getData(rows),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return <Bar options={options} data={data} />
}

export type CofixType = Lowercase<keyof typeof CofixChart>

const CofixChart = {
  Short: ShortCofixChart,
  New: NewCofixChart,
}

export default CofixChart
