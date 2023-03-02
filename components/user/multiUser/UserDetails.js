import React from "react";
import BatchDetailsMin from "@/components/Modules/batches/BatchDetaisMin";
import AttendanceListStudent from "@/components/Modules/batches/AttendanceListStudent";
import AttendanceListTeacher from "@/components/Modules/batches/AttendanceListTeacher";
import CardLayout from "@/components/Layout/card/CardLayout";
import AddStudent from "@/components/user/admin/AddStudent";
import AddTeacher from "@/components/user/admin/AddTeacher";
import SelectDropdown from "@/components/Layout/elements/SelectDropdown";

const LiveBatchDetails = ({
  user,
  isStudent,
  userType,
  profileData,
  batchesData,
}) => {
  console.log(` and isStudent = ${isStudent} `);

  function tableData(name, date, user, status) {
    return { name, date, user, status };
  }


  return (
    <div>
      <div>
        {isStudent && (
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-1">
              <AddStudent
                batchesData={batchesData}
                profileData={profileData}
                userType={userType}
                link="/admin/students"
                user={user}
                isStusent={isStudent}
              />
            </div>
            <div className="col-span-1">
              {/* {isStudent && (<AttendanceListStudent chapter="Huruf" date="21/02/2023" lastCol="Attended" />)}
            {!isStudent && (<AttendanceListTeacher chapter="Huruf" date="21/02/2023" lastCol="Attended" />)} */}
              <AttendanceListStudent
                chapter="Huruf"
                date="21/02/2023"
                lastCol="Attended"
              />
            </div>
          </div>
        )}
        {!isStudent && (
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-1">
              <AddTeacher
                link="/admin/students"
                user={user}
                action="edit"
                isStusent={isStudent}
              />
            </div>
            <div className="col-span-1">
              {/* {isStudent && (<AttendanceListStudent chapter="Huruf" date="21/02/2023" lastCol="Attended" />)}
            {!isStudent && (<AttendanceListTeacher chapter="Huruf" date="21/02/2023" lastCol="Attended" />)} */}
               <AttendanceListTeacher
                comp= <div className=" p-5 bg-white rounded-md">
                <SelectDropdown lable="Select Student" type="student" />
                </div>
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveBatchDetails;
