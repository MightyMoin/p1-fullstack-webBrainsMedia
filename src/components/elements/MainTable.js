import { useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import TopicsAccordian from "./TopicsAccordian";
import SubjectContext from "../../context/SubjectContext";
import AddTopicsModal from "./AddTopicsModal";
import { Box } from "@mui/system";
import EditModal from "./EditModal";

export default function StickyHeadTable() {
  const { sub, deleteSub } = useContext(SubjectContext);
  const handleSubDelete = async (subject_id) => {
    const res = await deleteSub(subject_id);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ height: "80vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key="subjects" style={{ minWidth: 170 }}>
                <Typography variant="h5" gutterBottom>
                  Subjects
                </Typography>
              </TableCell>
              <TableCell key="topics" style={{ minWidth: 170 }}>
                <Typography variant="h5" gutterBottom>
                  Topics
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sub?.subjects.map((row) => {
              return (
                <TableRow role="checkbox" tabIndex={-1} key={row.subject_id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Typography display="inline-block" variant="h6">
                        {row.name}
                      </Typography>
                      <Box display="inline-flex">
                        <EditModal
                          type="subject"
                          id={row.subject_id}
                          name={row.name}
                        ></EditModal>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleSubDelete(row.subject_id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {sub.topics.map((topic) => {
                      if (topic.subject_id === row.subject_id) {
                        return (
                          <TopicsAccordian
                            topicName={topic.name}
                            topicNotes={topic.notes}
                            subject_id={topic.subject_id}
                            topic_id={topic.topic_id}
                          ></TopicsAccordian>
                        );
                      } else {
                        return <></>;
                      }
                    })}
                    <Box padding={2}>
                      <AddTopicsModal
                        subject_id={row.subject_id}
                      ></AddTopicsModal>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
