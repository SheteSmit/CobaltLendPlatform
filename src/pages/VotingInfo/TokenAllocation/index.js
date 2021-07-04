import { Box, Card, makeStyles, Typography } from "@material-ui/core"
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts"
import React from "react"

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 450,
    // height: 500,
  },
  container: {
    padding: "1rem",
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

const data = [
  { name: "Overhead", value: 400 },
  { name: "Payroll", value: 300 },
  { name: "Loan Repay", value: 300 },
  { name: "Inventory", value: 200 },
  { name: "Insurance", value: 400 },
  { name: "Taxes", value: 300 },
  { name: "Marketing", value: 300 },
  { name: "R&D", value: 200 },
  { name: "Admin", value: 200 },
]

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? "start" : "end"

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

const CustomActiveShapePieChart = (props) => {
  const [state, setState] = React.useState(0)

  const classes = useStyles()

  const onPieEnter = (_, index) => {
    setState(index)
  }

  return (
    <div className={classes.root}>
      <Box className={classes.dataContianer}>
        {/* <Typography className={classes.title}>
            TVL
          </Typography>
          <Typography className={classes.ammount}>
            $1.76b
          </Typography>
          <Typography className={classes.date}>
            jun 1, 2021
          </Typography> */}
      </Box>
      <Box className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              activeIndex={state}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </div>
  )
}

export default CustomActiveShapePieChart
