import React from "react";
import grayBgImg from "@/components/src/img/grayBgImg.png";
import Sidebar from "@/components/Layout/navigation/Sidebar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import BatchEdit from "@/components/Modules/batches/BatchEdit";
import RemoveUser from "@/components/Modules/batches/RemoveUser";
import BatchHistory from '@/components/Modules/batches/BatchHistory'

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import BackButton from "@/components/Layout/elements/BackButton";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BatchDetails = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function tableData( name, date, user, status) {
    return { name, date, user, status };
  } 

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${grayBgImg.src})`,
        backgroundAttachment: "fixed",
        backgroundSize: "100%",
        backgroundPosition: "center top",
        widows: "100vw",
        minHeight: "100vh",
      }}
    >
      <div className="flex min-h-screen h-full">
        <Sidebar nav_index={0} />
        <div className="flex-1  p-5  ">
          <div className="m-0 p-5 w-full h-fit">
            <div className="flex justify-between w-full mx-auto my-10 gap-10 ">

              <div className="">
              <h1 className=" my-auto text-2xl mt-3 "><BackButton /> Batch Details.</h1>
              </div>
              <div className="">
                <div className=" w-full  ">
                 
                 <Button variant="contained" className="bg-dark-purple"  onClick={handleOpen} startIcon={<EditIcon />}>Change Teacher</Button>
                </div>
              </div>
            </div>
            <Divider variant="middle" />
          </div>
          <div className="m-0 p-10 w-full bg-white h-fit border-4 border-white rounded-xl">
            <BatchEdit actionBtn="Edit Batch" link="" />
          </div>
          <div className="bg-white p-0 my-5 h-fit rounded-lg">
              <BatchHistory title='Batch History' action='chip' data={[
  // createData({chapter}, {date}, {totalStudents}, {Status}),
  tableData("Huruf", "02/03/2023 at 9:30 Am", "24 Students", "In progress"),
  tableData("Huruf", "01/03/2023 at 9:30 Am", "24 Students", "In progress"),
  tableData("Hamza", "28/02/2023 at 9:30 Am", "24 Students", "Completed"),
  tableData("Hamza", "27/02/2023 at 9:30 Am", "24 Students", "In progress"),

]} />
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <RemoveUser
                user="Teacher 1"
                isReplace={true}
                type="Teacher"
                action="Change"
              />
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
