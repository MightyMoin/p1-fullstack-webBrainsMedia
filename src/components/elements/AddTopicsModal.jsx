import { useContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import SubjectContext from "../../context/SubjectContext";

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

export default function AddTopicsModal({ subject_id }) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { addNewTopic } = useContext(SubjectContext);

  const handleChange = (e) => {
    setTopic(e.target.value);
  };

  const handleTopicSubmit = async () => {
    const res = await addNewTopic(topic, subject_id);
    if (res) {
      handleClose();
    } else {
      alert("Topic is not been added :(");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" startIcon={<AddIcon />}>
        Add
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
              Add a new topic
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <TextField
                id="outlined-textarea"
                label="Topic"
                placeholder="Eg: Maths, Physics etc"
                fullWidth
                onChange={(e) => handleChange(e)}
              />
            </Typography>
            <Button onClick={() => handleTopicSubmit()}>Submit</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
