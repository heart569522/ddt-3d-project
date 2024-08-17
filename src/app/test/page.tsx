import { getAverageEnvironment } from "@/actions/actions"

export default async function page() {
  const data = await getAverageEnvironment()
  console.log("🚀 ~ page ~ data:", data)
  return (
    'asds'
  )
}
