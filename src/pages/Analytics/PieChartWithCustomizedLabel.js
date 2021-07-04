import { Box, Card, makeStyles, Typography } from "@material-ui/core"
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts"
import React from "react"
// import ResponsiveContianer, {ContainerContext} from '../../components/ResponsiveContainer'

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 450,
    // height: 500,
  },
  container: {
    padding: "1rem",
    backgroundColor: "rgb(25, 27, 31)",
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);'
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

const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function LineChartComponent({label}) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Card className={classes.container}>
        <Box className={classes.dataContianer}>
          <Typography className={classes.title}>{label}</Typography>
        </Box>
        <Box className={classes.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </div>
  )
}
