import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import { TextField } from "@mui/material";
import { addSubjects } from "../../backend/methods/dbQueries"; 

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function NotesModal() {
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = React.useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setSubject(e.target.value);
  }

  const handleSubjectSubmit = async () => {
    const res = await addSubjects(subject);
    if ( res ) {
        handleClose();
    } else {
        alert("Subject is not been added :(")
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        Add Subject
        <AddIcon />{" "}
      </Button>
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add a new subject
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <TextField
                id="outlined-textarea"
                label="Subject"
                placeholder="Eg: Maths, Physics etc"
                fullWidth
                onChange={(e) => handleChange(e)}
              />
            </Typography>
            <Button onClick={ () => handleSubjectSubmit() } >Submit</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
