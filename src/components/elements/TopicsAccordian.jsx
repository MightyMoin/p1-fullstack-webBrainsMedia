import { useState, useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotesModal from "./NotesModal";
import SubjectContext from "../../context/SubjectContext";

const TopicsAccordian = (props) => {
  const { topicName, topicNotes, subject_id, topic_id } = props;
  const [expanded, setExpanded] = useState(false);
  const { sub } = useContext(SubjectContext);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          {topicName}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {topicNotes?.length ? `${topicNotes.length} notes` : "No Notes"}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
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
        <NotesModal
          isNewNotes={1}
          subject_id={subject_id}
          topic_id={topic_id}
        ></NotesModal>
      </AccordionDetails>
    </Accordion>
  );
};

export default TopicsAccordian;
