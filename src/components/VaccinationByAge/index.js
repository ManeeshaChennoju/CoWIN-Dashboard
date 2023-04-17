import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {data} = props
  return (
    <div className="chart_container">
      <h1 className="char_heading">Vaccination by Age</h1>
      {/* <ResponsiveContainer width="100%" height={300}> */}
      <PieChart width={600} height={500}>
        <Pie
          cx="70%"
          cy="50%"
          data={data}
          startAngle={0}
          endAngle={360}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
          align="center"
        >
          <Cell name="18-44" fill="#f54394" />
          <Cell name="44-60" fill="#5a8dee" />
          <Cell name="Above 60" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
      {/* </ResponsiveContainer> */}
    </div>
  )
}

export default VaccinationByAge
