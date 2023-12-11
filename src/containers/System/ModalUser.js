import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import userService from "../../services/userService";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Form,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import { useState } from "react";

const ModalUser = ({ isOpen, toggle, user }) => {
  const title = user ? "Edit User" : "Create New User";
  const [defaulValue, setDefaultValue] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm();

  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => {
        setValue(key, user[key]);
      });
    } else {
      // console.log("usaEff create user");
      resetForm();
    }
  }, [user, setValue]);
  const resetForm = () => {
    // Đặt lại form với giá trị mặc định từ user
    reset({
      email: user?.email || "",
      password: user?.password || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      address: user?.address || "",
      phoneNumber: user?.phoneNumber || "",
      gender: user?.gender || "",
    });
  };
  const submitHandle = async (data) => {
    // alert(JSON.stringify(user?.id));
    try {
      if (user?.id) {
        const updateUser = await userService.updateUser(data);
        console.log("update User", updateUser);
      } else {
        const response = await userService.createUser(data);
        // console.log("create new:", response);
      }
      toggle();
    } catch (error) {
      console.error(`update fail :${error}`);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(submitHandle)}>
          <div>
            <Label className="form-label">Email</Label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <Input readOnly={user ? true : false} {...field} />
              )}
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>

          {!user && (
            <div>
              <label className="form-label">Password</label>
              <Controller
                name="password"
                control={control}
                readOnly={user ? true : false}
                rules={{
                  required: "Password is required",
                  pattern: {
                    // value: /^\S+@\S+$/i,s
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <Input
                    readOnly={user ? true : false}
                    type="password"
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password.message}</p>
              )}
            </div>
          )}

          <div>
            <label className="form-label">FirstName</label>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: "firstName is required",
                pattern: {
                  // value: /^\S+@\S+$/i,s
                  message: "Invalid firstName format",
                },
              }}
              render={({ field }) => <Input type="text" {...field} />}
            />
            {errors.firstName && (
              <p style={{ color: "red" }}>{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">LastName</label>
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: "LastName is required",
                pattern: {
                  // value: /^\S+@\S+$/i,s
                  message: "Invalid lastName format",
                },
              }}
              render={({ field }) => <Input type="text" {...field} />}
            />
            {errors.lastName && (
              <p style={{ color: "red" }}>{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <label className="form-label">Address</label>
            <Controller
              name="address"
              control={control}
              rules={{
                required: "Address is required",
                pattern: {
                  // value: /^\S+@\S+$/i,s
                  message: "Invalid address format",
                },
              }}
              render={({ field }) => <Input type="text" {...field} />}
            />
            {errors.address && (
              <p style={{ color: "red" }}>{errors.address.message}</p>
            )}
          </div>
          <div>
            <label className="form-label">Phone Number</label>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: "phoneNumber is required",
                pattern: {
                  //  value: /^\S+@\S+$/i,
                  message: "Invalid PhoneNumber format",
                },
              }}
              render={({ field }) => <Input type="text" {...field} />}
            />
            {errors.phoneNumber && (
              <p style={{ color: "red" }}>{errors.phoneNumber.message}</p>
            )}
          </div>
          <div>
            <Label for="gender">Gender</Label>
            <Controller
              name="gender"
              control={control}
              // defaultValue={user?.gender || ""}
              // Set a default value if needed
              rules={{
                required: "Gender is required",
                message: "Select gender format",
              }}
              render={({ field }) => (
                <Input type="select" {...field}>
                  <option value={""}>Select a gender</option>
                  <option value={true}>Male</option>
                  <option value={false}>Female</option>
                </Input>
              )}
            />
            {errors.gender && (
              <p style={{ color: "red" }}>{errors.gender.message}</p>
            )}
          </div>

          <Input
            className="mt-3 btn btn-primary"
            type="submit"
            value={user ? "Update" : "Create"}
          />
          {/* <button type="button" onClick={resetForm}>
            Reset Form
          </button> */}
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ModalUser;
