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
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      
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

function createData(currency: string, ammount: number, apy: number) {
  return { currency, ammount, apy };
}

const rows = [
  createData('BTC (Tier 1)', 159, 6.0),
  createData('BTC (Tier 1)', 159, 6.0),
  createData('BTC (Tier 1)', 159, 6.0),
  createData('BTC (Tier 1)', 159, 6.0),
  createData('BTC (Tier 1)', 159, 6.0),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  root: {
    padding: '1rem 0',
    width: '100%',
    minWidth: 300,
  }
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Currency</StyledTableCell>
              <StyledTableCell align="left">Ammount**</StyledTableCell>
              <StyledTableCell align="left">APY</StyledTableCell>
    
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.currency}>
                <StyledTableCell component="th" scope="row">
                  {row.currency}
                </StyledTableCell>
                <StyledTableCell align="left">{row.ammount}</StyledTableCell>
                <StyledTableCell align="left">{row.apy}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}