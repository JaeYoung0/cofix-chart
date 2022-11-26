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
import useCofix from './useCofix'

function CofixChart() {
  const { rows } = useCofix()

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  const labels = rows.map((item) => {
    const [_, month, day] = item.startDate.split('/')
    return `${month}/${day}`
  })

  const data = {
    labels,
    datasets: [
      {
        label: '단기 COFIX',
        data: rows.map((item) => item.value),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return <Bar options={options} data={data} />
}

export default CofixChart
