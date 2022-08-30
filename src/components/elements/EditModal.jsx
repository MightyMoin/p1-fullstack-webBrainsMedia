import { useContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
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

export default function EditModal({ type, id, name }) {
  const [open, setOpen] = useState(false);
  const [editedValue, setEdit] = useState(name);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { editSub, editTop } = useContext(SubjectContext);

  const helperForEdit = {
    topic: editTop,
    subject: editSub,
  };

  const handleChange = (e) => {
    setEdit(e.target.value);
  };

  const handleEdit = async () => {
    const res = await helperForEdit[type](id, editedValue);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} startIcon={<EditIcon />}></Button>
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
              Edit {type}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <TextField
                id="outlined-textarea"
                label={type}
                defaultValue={name}
                fullWidth
                onChange={(e) => handleChange(e)}
              />
            </Typography>
            <Button onClick={() => handleEdit()}>Edit</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
