import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});

function createData(numberMatched: number, winners: number, prizePot: number) {
  return { numberMatched, winners, prizePot };
}

const rows = [
  createData(159, 6.0, 24),
  createData(159, 6.0, 24),
  createData(159, 6.0, 24),

];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No. Matched</TableCell>
            <TableCell align="right">Winners</TableCell>
            <TableCell align="right">Prize Pot</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.numberMatched}>
              <TableCell component="th" scope="row">
                {row.numberMatched}
              </TableCell>
              <TableCell align="right">{row.winners}</TableCell>
              <TableCell align="right">{row.prizePot}</TableCell>
            </TableRow>
          ))}
          <TableRow key="Row results">
            <TableCell component="th" scope="row">
                Burned
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">620</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}