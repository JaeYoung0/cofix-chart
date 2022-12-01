import Cofix from '@/ui/pages/Cofix'
import { fetchCofix } from '@/services/cofix'
import { dehydrate, QueryClient } from '@tanstack/react-query'

function CofixPage() {
  return <Cofix />
}

export default CofixPage

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['short', 2022], () => fetchCofix(`?cofixType=short&year=2022`))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
