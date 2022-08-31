import { useState, useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotesModal from "./NotesModal";
import SubjectContext from "../../context/SubjectContext";
import { Box, Button } from "@mui/material";
import EditModal from "./EditModal";

const TopicsAccordian = (props) => {
  const { topicName, subject_id, topic_id } = props;
  const [expanded, setExpanded] = useState(false);
  const { sub, delTopics } = useContext(SubjectContext);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleTopicDelete = async () => {
    const res = await delTopics(topic_id);
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography variant="h6" sx={{ width: "33%", flexShrink: 0 }}>
          {topicName}
        </Typography>
        <EditModal type="topic" id={topic_id} name={topicName}></EditModal>
        <Typography sx={{ color: "text.secondary" }}>
          <Button variant="contained" color="error" onClick={handleTopicDelete}>
            Delete
          </Button>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography varaint="h6"> Notes List: </Typography>
        <Box
          p={2}
          display="flex"
          flexWrap="wrap"
          justifyContent="space-evenly"
          alignItems={"center"}
        >
          {sub?.notes.map((note, i) => {
            if (note.subject_id === subject_id && note.topic_id === topic_id) {
              return (
                <NotesModal
                  key={i}
                  title={note.title}
                  subject_id={subject_id}
                  topic_id={topic_id}
                  isNewNotes={0}
                  notes={note.notes}
                  notes_id={note.notes_id}
                ></NotesModal>
              );
            }
          })}
        </Box>
        <NotesModal
          key="new notes"
          title=""
          notes=""
          isNewNotes={1}
          subject_id={subject_id}
          topic_id={topic_id}
        ></NotesModal>
      </AccordionDetails>
    </Accordion>
  );
};

export default TopicsAccordian;
