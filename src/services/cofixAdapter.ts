import { CofixType } from '@/domain/cofix'
import { fetchCofix } from '@/services/cofix'
import { useQuery } from '@tanstack/react-query'

export function useCofix({ year, cofixType }: { year: number; cofixType: CofixType }) {
  const query = `?year=${year}&cofixType=${cofixType}`

  return useQuery({
    queryKey: [cofixType, year],
    queryFn: () => fetchCofix(query),
    refetchOnMount: false,
    // staleTime: 60 * 1000, // 1분, default 0
  })
}
