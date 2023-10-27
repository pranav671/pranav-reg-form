import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
export default function Exp() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div style={{margin: '25%'}}>
      <Button onClick={handleOpen}>Open modal</Button>
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
              Enter the OTP sent to youe e-mail
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <input className='form-control w-50' id='OTPinput' placeholder='OTP'/>
              <button className='btn btn-primary mt-4' onClick={(e)=> {
                let ip = document.getElementById('OTPinput').value;
                if(ip < 400000)
                    console.log("first")
              }}>Submit</button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
