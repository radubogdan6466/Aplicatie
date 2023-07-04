import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Box,
  Button,
  Typography,
  styled,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #000000;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const loginInitialValues = {
  username: "",
  password: "",
  departament: "",
};

const Login = ({ isUserAuthenticated }) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [error, showError] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  useEffect(() => {
    showError(false);
  }, [login]);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    if (login.username === "" || login.password === "") {
      showError("Date de autentificare trebuie completate");
      return;
    }

    try {
      let response = await API.userLogin(login);
      if (response.isSuccess) {
        showError("");

        sessionStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`
        );
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${response.data.refreshToken}`
        );
        setAccount({
          name: response.data.name,
          username: response.data.username,
          departament: response.data.departament,
        });

        isUserAuthenticated(true);
        setLogin(loginInitialValues);
        navigate("/");
      } else {
        showError("Date de autentificare incorecte");
      }
    } catch (error) {
      showError("A apărut o eroare în timpul autentificării");
    }
  };

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Wrapper>
          <TextField
            sx={{ m: 2, width: "30ch" }}
            variant="outlined"
            value={login.username}
            onChange={(e) => onValueChange(e)}
            name="username"
            label="Username"
            defaultValue="small"
            margin="normal"
            required
            fullWidth
            autoFocus
          />

          <FormControl sx={{ m: 2, width: "30ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Parola"
            />
          </FormControl>

          {error && (
            <Box>
              <Error style={{ fontSize: 15 }}>{error}</Error>
            </Box>
          )}
          <LoginButton
            type="submit"
            fullWidth
            variant="outlined"
            onClick={() => loginUser()}
            sx={{ m: 2, width: "33ch" }}
          >
            Login
          </LoginButton>
        </Wrapper>
      </Box>
    </Container>
  );
};

export default Login;
