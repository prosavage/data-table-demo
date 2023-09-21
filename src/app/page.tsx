import { Table } from "./components/Table";
import { Title } from "./components/Title";
import { loadData } from "@/data";

export default function Home() {

  const data = loadData();


  return (
    <main className="flex min-h-screen flex-col p-1 sm:p-8 md:p-10 lg:p-12">
      <Title />
      <Table mkData={data} />
    </main>
  )
}
