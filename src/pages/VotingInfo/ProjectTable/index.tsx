import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.white,
      // color: theme.palette.common.white,
      fontWeight: 'bold',
      opacity: 0.8
      
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);


const useStyles = makeStyles((theme) => ({
  table: {
    // minWidth: 700,
  },
  root: {
    padding: '1rem 0',
    width: '100%',
    minWidth: 300,
  
  }
}));

interface props {
  exchange?: boolean
  data: any
}

export default function CustomizedTables({exchange, data}: props) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TableContainer component={Paper} elevation={0}>
        <Table className={classes.table} aria-label="customized table">
          {/* { exchange && (
          <TableHead>
            <TableRow>
              <StyledTableCell>Exchange Name</StyledTableCell>
              <StyledTableCell>url</StyledTableCell>    
            </TableRow>
          </TableHead>
          )} */}
          <TableBody>
            {data.map((row:any) => (
             <>
              { !exchange && (
                <StyledTableRow key={row.type}>
                  <StyledTableCell align="right">{row.type}</StyledTableCell>
                  <StyledTableCell align="left">{row.data}</StyledTableCell>
                </StyledTableRow>
              )}
              { exchange && (
                <StyledTableRow key={row.type}>
                  <StyledTableCell align="left">{row.type}</StyledTableCell>
                  <StyledTableCell align="left">{row.data}</StyledTableCell>
                </StyledTableRow>
              )}
            </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}