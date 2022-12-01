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
import { CofixRow } from '@/domain/cofix'
import { useCofix } from '@/services/cofixAdapter'

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
  const { data: rows } = useCofix({ year: 2022, cofixType: 'short' })
  if (!rows) return null

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
  const { data: rows } = useCofix({ year: 2022, cofixType: 'new' })

  if (!rows) return null

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

const CofixChart = {
  Short: ShortCofixChart,
  New: NewCofixChart,
}

export default CofixChart
