import { useEffect, useState } from 'react'
import type { CofixRow } from '@/pages/api/cofix'

function useCofix() {
  const [shortCofixRows, setShortCofixRows] = useState<CofixRow[]>([])
  const [newCofixRows, setNewCofixRows] = useState<CofixRow[]>([])

  useEffect(() => {
    const fetchShortCofixRows = async () => {
      const query = `?year=2022&cofixType=short`
      const response = (await fetch(`/api/cofix${query}`).then((res) => res.json())) as {
        result: CofixRow[]
      }

      const result = response.result
      setShortCofixRows(result)
    }
    void fetchShortCofixRows()
  }, [])

  useEffect(() => {
    const fetchNewCofixRows = async () => {
      const query = `?year=2022&cofixType=new`
      const response = (await fetch(`/api/cofix${query}`).then((res) => res.json())) as {
        result: CofixRow[]
      }

      const result = response.result
      setNewCofixRows(result)
    }

    void fetchNewCofixRows()
  }, [])

  return { shortCofixRows, newCofixRows }
}

export default useCofix
