import { Box, Card, makeStyles, Typography,  } from '@material-ui/core';
import { BarChart, Bar, Cell, Legend, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, XAxis, YAxis, Area } from 'recharts';
import React from 'react';
import useWindowSize from '../../hooks/useWindowSize';
// import ResponsiveContianer, {ContainerContext} from '../../components/ResponsiveContainer'



const data = [
  {
    name: 1,
    eth: 4000,
    cblt: 2400,
    amt: 2400,
  },
  {
    name: 2,
    eth: 3000,
    cblt: 1398,
    amt: 2210,
  },
  {
    name: 3,
    eth: 2000,
    cblt: 9800,
    amt: 2290,
  },
  {
    name: 4,
    eth: 2780,
    cblt: 3908,
    amt: 2000,
  },
  {
    name: 5,
    eth: 1890,
    cblt: 4800,
    amt: 2181,
  },
  {
    name: 6,
    eth: 2390,
    cblt: 3800,
    amt: 2500,
  },
  {
    name: 7,
    uv: 3490,
    cblt: 4300,
    amt: 2100,
  },
]



const useStyles = makeStyles((theme) => ({
    root: {
      // width: 450,
      // height: 500,
    },
    container: {
      padding: '1rem',
      // backgroundColor: 'rgb(25, 27, 31)'
    },
    dataContianer: {
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '1rem',
      // justifyContent: 'space-around'
    },
    title: {
      fontSize: '1rem',
      fontWeight: 500,
      color: theme.palette.common.black,
  
    },
    ammount: {
      fontSize: '2rem',
      fontWeight: 600,
      color: theme.palette.common.white
    },
    date: {
      fontSize: theme.typography.pxToRem(12),
      fontWeight: 500,
      color: 'rgb(195, 197, 203)'
    },
    chartContainer: {
      width:'100%',
      height: 250
    }
}))

interface props {
  label?: string;
  injectedData?: any
  val1?: string 
  val2?: string
  val3?: string
  width?: string | number
  elevation?: number
}

export default function LineChartComponent({label, injectedData, val1, val2, val3, width, elevation = 2}: props) {
  const classes = useStyles()
  const screenSize = useWindowSize()

  return (
    <div  className={classes.root}>
      <Card className={classes.container} elevation={elevation}>
        <Box className={classes.dataContianer}>
          <Typography className={classes.title}>{label}</Typography>
          {/* <Typography className={classes.ammount}>$1.76b</Typography>
          <Typography className={classes.date}>jun 1, 2021</Typography> */}
        </Box>
        <Box className={classes.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              width={300}
              height={250}
              data={injectedData || data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
              >
                <XAxis dataKey="day" style={{fontSize: screenSize!.width > 650 ? 12 : 4}} interval={0}/>
                <YAxis />
                {/* <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="center" orientation="center" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" /> */}
                <Tooltip />
                <Legend />
                <Bar dataKey={val1 || 'uv'} fill="#8834d8" />
                {val2 && (
                   <Bar dataKey={val2} fill="#8884d8" />
                )}
                {val3 && (  
                  <Bar dataKey={val3} fill="#82ca9d" />
                )}

            </BarChart>
          </ResponsiveContainer> 
        </Box>
     </Card>
    </div>
  )
}