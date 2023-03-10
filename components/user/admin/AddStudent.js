import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import Link from "next/link";

import MultipleSelectChip from "@/components/Layout/elements/MultiChipSelector";
import { Checkbox, Divider, FormControlLabel, Grid } from "@mui/material";
import InputWithLable from "@/components/Layout/elements/InputWithLable";
import { createStudentTeacher } from "@/backend/CreateUser/CreateStudentTeacherDB";
import { fetchBatchesData } from "@/backend/Announcement/AnnouncementDB";
import AuthContext from "@/components/Context/store/auth-context";
import { addStudentToBatch } from "@/backend/Batches/AddStudentToBatchDB";
import { fetchStudentBasedonEmail } from "@/backend/UserProfile/StudentTeacherProfileDB";
import { updateStudentDetail } from "@/backend/Students/StudentDB";
import BatchContext from "@/components/Context/store/batch-context";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const names = ["Batch 1", "Batch 2", "Batch 3", "Batch 4", "Batch 5"];

export default function AddUser({
  link,
  user,
  title,
  setOpen,
  userType,
  profileData,
  batchesData,
  batchName,
}) {
  const theme = useTheme();

  //inputFields
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [batch, setBatch] = React.useState(batchName);
  const [edit, setEdit] = React.useState(false);

  //get batches
  const auth = React.useContext(AuthContext);
  const batchCtx = React.useContext(BatchContext);

  React.useEffect(() => {
    const fetchBatches = async () => {
      const data = await fetchBatchesData();
      auth.setBatchesData(data);
    };
    fetchBatches();
  }, []);

  user = user.charAt(0).toUpperCase() + user.slice(1);

  if (userType === "EditStudent") {
    React.useEffect(() => {
      setEdit(true);
      if (profileData && batchesData) {
        setName(profileData[0].name);
        setContact(profileData[0].contact);
        setEmail(profileData[0].email);
      }
    }, [edit, profileData, batchesData]);
  }

  let studentProfile;
  if (profileData) {
    studentProfile = profileData;
  }

  //add a student to DB and Batch
  const addStudentHandler = async (e) => {
    e.preventDefault();
    console.log("adding student");

    if (name && contact && email && batch) {
      const password = uuidv4() + "@123AM"; // Generate a unique password for each user

      const data = await createStudentTeacher(email, password, "student");

      if (!data) {
        throw new Error(`Error creating user ${email}: ${error.message}`);
      }
      await axios
        .post("/api/send-email", {
          email,
          password,
          userPath: "student",
          name,
          contact,
          batch,
        })
        .then((res) => console.log("res: ", res))
        .catch((err) => console.log("error: ", err));

      console.log(`User ${data.email} created successfully`);
      setOpen(false);
      batchCtx.setSubmittedHandler(true);
    } else {
      console.log("Please fill in all fields");
    }
  };

  const editStudentDetail = async (e) => {
    e.preventDefault();
    console.log("updateStudentSetail");
    updateStudentDetail(email, name, contact, batch);
    batchCtx.setSubmittedHandler(true);
  };

  return (
    <>
      <div className=" p-5 rounded-md bg-white  pl-2">
        <h1 className="text-2xl pl-2 pb-2">{title || user + " Details"}</h1>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
          className=" border-t-2 border-gray-300 mt-1"
        >
          <InputWithLable
            value={name}
            defaultValue={name}
            setValue={setName}
            lable="Name"
            id="name"
            type="text"
          />
          <InputWithLable
            value={contact}
            defaultValue={contact}
            setValue={setContact}
            lable="Contact"
            id="contact"
            type="number"
          />
          <InputWithLable
            value={email}
            defaultValue={email}
            setValue={setEmail}
            lable="Email"
            id="email"
            type="email"
          />
        </Box>

        <FormControl sx={{ m: 1, width: "250", minWidth: "100%" }}>
          <div className="grid grid-cols-5 ">
            <div className="col-span-1 mt-3">
              <label className=" mt-3">Batch</label>
            </div>
            <div className="col-span-4">
              <Select
                labelId="demo-controlled-open-select-label"
                className="w-full"
                size="small"
                id="demo-controlled-open-select"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
              >
                {auth.batchesList.map((batch) => (
                  <MenuItem value={batch.batch_name}>
                    {batch.batch_name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </FormControl>

        <div className="items-center  py-3 text-right mt-2">
          <Button
            onClick={
              userType === "EditStudent" ? editStudentDetail : addStudentHandler
            }
            variant="contained"
            className="w-full bg-dark-purple my-3 mx-2"
            disableElevation
          >
            {title || "Edit " + user + " Details"}
          </Button>
        </div>
      </div>
    </>
  );
}
