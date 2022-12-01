import { CofixRow } from '@/domain/cofix'
import axios from 'axios'

export const fetchCofix = (query: string) =>
  axios.get<{ result: CofixRow[] }>(`/api/cofix${query}`).then((res) => res.data.result)
