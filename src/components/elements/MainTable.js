import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import TopicsAccordian from "./TopicsAccordian";

const columns = [
  { id: "subject", label: "Subject", minWidth: 170 },
  { id: "topics", label: "Topic", minWidth: 170 },
];

function createData(subject, topics) {
  return { subject, topics };
}

const rows = [
  createData("Maths", ["Algebra", "Geometry"]),
  createData("Maths", ["Algebra", "Geometry"]),
  createData("Maths", ["Algebra", "Geometry"]),
  createData("Maths", ["Algebra", "Geometry"])
];

export default function StickyHeadTable() {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "80vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography variant="h5" gutterBottom>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    if (column.id === 'topics'){
                      const elem = row[column.id];
                      return <TableCell>{
                        elem.map(el => {
                          return <TopicsAccordian topicName={el} ></TopicsAccordian>
                        })
                      }</TableCell>
                    }else {
                      return <TableCell> {row[column.id]} </TableCell>
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
