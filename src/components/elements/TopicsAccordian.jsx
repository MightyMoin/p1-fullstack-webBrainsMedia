import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotesModal from "./NotesModal";

const TopicsAccordian = (props) => {
  const { topicName, topicNotes, subject_id, topic_id } = props;
  const [expanded, setExpanded] = React.useState(false);

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
        {topicNotes?.map((notes, i) => {
          return <NotesModal key={i} title={notes}></NotesModal>;
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default TopicsAccordian;
