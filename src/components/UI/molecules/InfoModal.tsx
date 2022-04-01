import { Button, Link } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import * as React from "react";

interface InfoModalProps {
  open: boolean;
  onClose?: () => void;
}

const useStyles = makeStyles({
  infoModalBox: {
    background: "white",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    left: "50%",
    maxWidth: "320px",
    padding: "16px",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
  },
  infoModalButton: {
    marginTop: "16px",
    width: "100%",
    textTransform: "none",
  },
});

export const InfoModal: React.FC<InfoModalProps> = (props) => {
  const styles = useStyles();
  return (
    <>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.infoModalBox}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Try Our API
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Visit our{" "}
            <Link
              href="https://func-api-cwkbxbamwpffi.azurewebsites.net/playground"
              target="_blank"
              underline="hover"
              rel="noreferrer"
            >
              API playground
            </Link>{" "}
            to try our API.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Refer to our{" "}
            <Link
              href="https://func-api-cwkbxbamwpffi.azurewebsites.net/doc/"
              target="_blank"
              underline="hover"
              rel="noreferrer"
            >
              API documentation
            </Link>{" "}
            to learn how to use our API.
          </Typography>
          <Button
            className={styles.infoModalButton}
            onClick={props.onClose}
            variant="contained"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};
