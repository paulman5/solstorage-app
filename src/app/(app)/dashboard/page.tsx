import { Button } from "@/components/ui/button"
import { getUserAuth } from "@/lib/auth/utils"
import Link from "next/link"
import { DataTable } from "@/components/ui/data-table"

export default async function Home() {
  const userAuth = await getUserAuth()
  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold ">The contract vault</h1>
      </div>
      <div>
        <DataTable />
      </div>
    </main>
  )
}
