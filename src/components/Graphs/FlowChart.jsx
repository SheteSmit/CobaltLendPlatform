import { Box, Card, makeStyles, Typography } from "@material-ui/core"
import {
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
} from "recharts"
import React from "react"
import useWindowSize from "../../hooks/useWindowSize"
// import ResponsiveContianer, {ContainerContext} from '../../components/ResponsiveContainer'

const data = [
  {
    name: 1,
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 2,
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 3,
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 4,
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 5,
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 6,
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 7,
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 450,
    // height: 500,
  },
  container: {
    padding: "1rem 2rem 1rem 1rem",
    backgroundColor: theme.palette.common.white,
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
    color: theme.palette.common.black,
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

export default function LineChartComponent({label, injectedData}) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Card className={classes.container}>
        <Box className={classes.dataContianer}>
          <Typography className={classes.title}>{label}</Typography>
          {/* <Typography className={classes.ammount}>$1.76b</Typography>
          <Typography className={classes.date}>jun 1, 2021</Typography> */}
        </Box>
        <Box className={classes.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={350}
              height={250}
              data={data}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <XAxis dataKey="name" />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </div>
  )
}
