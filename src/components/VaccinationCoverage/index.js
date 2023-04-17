import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {data} = props

  const barStyles = {
    borderRadiusTopLeft: '50px',
    borderRadiusTopRight: '50px',
  }

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="chart_container">
      <h1 className="char_heading">Vaccination Coverage</h1>
      {/* <ResponsiveContainer width="100%" height={500}> */}
      <BarChart data={data} width={1000} height={300} margin={{top: 5}}>
        <XAxis
          dataKey="vaccineDate"
          tick={{stroke: 'gray', strokeWidth: 0.2}}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{stroke: 'gray', strokeWidth: 0}}
        />
        <Legend wrapperStyle={{padding: 30}} />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill="#2d87bb"
          barSize="30%"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          barSize="30%"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
      {/* </ResponsiveContainer> */}
    </div>
  )
}

export default VaccinationCoverage
