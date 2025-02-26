type Chore = {
  id: string
  name: string
  description: string
  completed: boolean
}

function ChoreComponent() {
  return (
    <div>
      <h1>Chore</h1>
    </div>
  )
}

export default ChoreComponent
export type { Chore }
