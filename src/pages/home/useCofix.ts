import { useEffect, useState } from 'react'
import { ShortTermCofixRow } from '@/pages/api/cofix'

function useCofix() {
  const [rows, setRows] = useState<ShortTermCofixRow[]>([])

  useEffect(() => {
    const fetchRows = async () => {
      const query = `?year=2022`
      const response = (await fetch(`/api/cofix${query}`).then((res) => res.json())) as {
        result: ShortTermCofixRow[]
      }

      const result = response.result
      setRows(result)
    }

    void fetchRows()
  }, [])

  return { rows }
}

export default useCofix
