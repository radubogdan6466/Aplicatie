import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Typography,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../../service/api";

const Component = styled(Box)`
  width: 440px;
  margin: auto;
`;

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
  departament: "",
};

const departments = [
  "Vizual",
  "Plantare",
  "SMD",
  "Testare",
  "HR",
  "Financiar",
  "Lacuire",
  "QA",
];

const Inregistrare = () => {
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState("");

  const navigate = useNavigate();

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      showError("");
      setSignup(signupInitialValues);
      navigate("/");
    } else {
      showError("Something went wrong! Please try again later.");
    }
  };

  return (
    <Component>
      <Box>
        <Wrapper>
          <TextField
            variant="standard"
            onChange={onInputChange}
            name="name"
            label="Nume"
          />
          <TextField
            variant="standard"
            onChange={onInputChange}
            name="username"
            label="Username"
          />
          <TextField
            variant="standard"
            onChange={onInputChange}
            name="password"
            label="Password"
          />
          <FormControl
            variant="standard"
            sx={{ width: 370 }}
            fullWidth
            margin="normal"
          >
            <InputLabel id="departament-label">Departament</InputLabel>
            <Select
              labelId="departament-label"
              id="departament"
              name="departament"
              label="Departament"
              onChange={onInputChange}
            >
              {departments.map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {error && <Error>{error}</Error>}

          <Button color="primary" variant="contained" onClick={signupUser}>
            Inregistreaza
          </Button>
        </Wrapper>
      </Box>
    </Component>
  );
};

export default Inregistrare;
