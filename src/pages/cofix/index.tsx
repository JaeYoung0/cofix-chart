import Cofix from '@/ui/pages/Cofix'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { crawlCofixData } from '../api/cofix'

function CofixPage() {
  return <Cofix />
}

export default CofixPage

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery(['short', 2022], () =>
      crawlCofixData({ cofixType: 'short', year: 2022 }).then((res) => res?.result)
    ),

    queryClient.prefetchQuery(['new', 2022], () =>
      crawlCofixData({ cofixType: 'new', year: 2022 }).then((res) => res?.result)
    ),
  ])

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
