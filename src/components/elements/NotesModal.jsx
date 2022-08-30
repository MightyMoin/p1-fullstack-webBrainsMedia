import { useState, useContext, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import SubjectContext from "../../context/SubjectContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  maxHeight: "50vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function NotesModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { editNotes, addNote, delNotes } = useContext(SubjectContext);
  const { title, isNewNotes, notes, subject_id, topic_id, notes_id } = props;
  const [currTitle, setTitle] = useState(title);
  const [currNotes, setNotes] = useState(notes);

  const handleNewNotesSubmit = async () => {
    const res = await addNote(currTitle, currNotes, subject_id, topic_id);
    if (res) {
      setTitle("");
      setNotes("");
      handleClose();
    } else {
      alert("Notes not added :(");
    }
  };

  const handleNotesSubmit = async () => {
    const res = await editNotes(notes_id, currTitle, currNotes);
    if (!res) {
      handleClose();
    } else {
      alert("Notes not updated :(");
    }
  };

  const handleNotesDelete = async () => {
    const res = await delNotes(notes_id);
    if (!res) {
      setTitle("");
      setNotes("");
      handleClose();
    } else {
      alert("Notes not deleted :(");
    }
  };

  return (
    <div>
      {isNewNotes ? (
        <Button
          onClick={handleOpen}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Notes
        </Button>
      ) : (
        <Button onClick={handleOpen}>
          {currTitle}
          <KeyboardArrowRightIcon />{" "}
        </Button>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              width={"100%"}
              display={"inline-flex"}
              justifyContent="end"
              alignItems={"top"}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={handleNotesDelete}
              >
                Delete
              </Button>
            </Box>
            <TextField
              label="Notes Title"
              placeholder="Add Title"
              defaultValue={currTitle}
              onChange={(e) => setTitle(e.target.value)}
            ></TextField>

            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <TextField
                label="Notes"
                placeholder="Add Notes"
                defaultValue={currNotes}
                fullWidth
                onChange={(e) => setNotes(e.target.value)}
                rows={10}
                multiline
              />
            </Typography>

            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={isNewNotes ? handleNewNotesSubmit : handleNotesSubmit}
              endIcon={<SendIcon />}
            >
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
