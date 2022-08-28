import {useState, useContext} from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import TopicsAccordian from "./TopicsAccordian";
import { getAllData } from "../../backend/methods/dbQueries";
import SubjectContext from "../../context/SubjectContext";


const columns = [
  { id: "subject", label: "Subject", minWidth: 170 },
  { id: "topics", label: "Topic", minWidth: 170 },
];

function createData(subject, topics) {
  return { subject, topics };
}

const rows = [
  createData("Maths", [{"name" :"Algebra", "notes" : ["n1", "n2"]}, {"name" :"Geometry", "notes" : ["n1", "n2","n3"]}]),
  createData("Maths", [{"name" :"Algebra", "notes" : ["n1", "n2"]}, {"name" :"Geometry", "notes" : ["n1", "n2","n3"]}]),
  createData("Maths", [{"name" :"Algebra", "notes" : ["n1", "n2"]}, {"name" :"Geometry", "notes" : ["n1", "n2","n3"]}]),
  createData("Maths", [{"name" :"Algebra", "notes" : ["n1", "n2"]}, {"name" :"Geometry", "notes" : ["n1", "n2","n3"]}])
];

export default function StickyHeadTable() {
  const { sub } = useContext(SubjectContext);
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
                <TableRow role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    if (column.id === 'topics'){
                      const elem = row[column.id];
                      return <TableCell>{
                        elem.map(el => {
                          return <TopicsAccordian topicName={el.name} topicNotes={el.notes} ></TopicsAccordian>
                        })
                      }</TableCell>
                    }else {
                      return <TableCell> <Typography variant="h6">{row[column.id]}</Typography> </TableCell>
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
