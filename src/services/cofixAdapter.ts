import { CofixType } from '@/domain/cofix'
import { fetchCofix } from '@/services/cofix'
import { useQuery } from '@tanstack/react-query'

export function useCofix({ year, cofixType }: { year: number; cofixType: CofixType }) {
  const query = `?year=${year}&cofixType=${cofixType}`

  return useQuery({
    queryKey: [year, cofixType],
    queryFn: (ctx) => {
      console.log('@@ctx', ctx)
      return fetchCofix(query)
    },
  })
}
