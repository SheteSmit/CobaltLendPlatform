import { Box, Card, makeStyles, Typography } from "@material-ui/core"
import { scaleOrdinal } from "d3-scale"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { schemeCategory10 } from "d3-scale-chromatic"
// import ResponsiveContianer, {ContainerContext} from '../../components/ResponsiveContainer'

const data = [
  {
    name: "Page A",
    uv: 4000,
    female: 2400,
    male: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    female: 1398,
    male: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    female: 9800,
    male: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    female: 3908,
    male: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    female: 4800,
    male: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    female: 3800,
    male: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    female: 4300,
    male: 2100,
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 450,
    // height: 500,
  },
  container: {
    padding: "1rem",
    // backgroundColor: "rgb(25, 27, 31)",
  },
  dataContianer: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: "1rem",
    // justifyContent: 'space-around'
  },
  title: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "rgb(108, 114, 132)",
  },
  ammount: {
    fontSize: "2rem",
    fontWeight: 600,
    color: theme.palette.common.white,
  },
  date: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 500,
    color: "rgb(195, 197, 203)",
  },
  chartContainer: {
    width: "100%",
    height: 250,
  },
}))

const colors = scaleOrdinal(schemeCategory10).range()

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
  x + width / 2
}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
  x + width
}, ${y + height}
          Z`

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
}

export default function LineChartComponent() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Card className={classes.container}>
        <Box className={classes.dataContianer}>
        </Box>
        <Box className={classes.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar
                dataKey="female"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </div>
  )
}
