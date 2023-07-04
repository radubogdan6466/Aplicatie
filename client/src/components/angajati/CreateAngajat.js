import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  styled,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";
import { useNavigate, useLocation } from "react-router-dom";

const Container = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
`;

const CreateAngajat = () => {
  const [angajat, setAngajat] = useState({
    name: "",
    prenume: "",
    dataNastere: null,
    adresa: "",
    telefon: "",
    email: "",
    cetatenie: "",
    cnp: "",
    stareCivila: "",
    salBrut: "",
    functia: "",
    dataAngajare: null,
    departament: "",
    bonus: 0,
    beneficii: 0,
    contIban: "",
    supervizor: "",
    dispOreSuplim: "",
    cas: "",
    cass: "",
    impozit: "",
    salNet: "",
    deducere: "",
  });
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
  const navigate = useNavigate();
  const location = useLocation();

  const [cnpError, setCnpError] = useState("");
  const [salBrutError, setSalBrutError] = useState("");
  const [telefonError, setTelefonError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAngajat((prevAngajat) => ({
      ...prevAngajat,
      [name]: value,
    }));

    if (name === "cnp") {
      if (!/^\d+$/.test(value)) {
        setCnpError("CNP-ul trebuie să conțină doar cifre.");
      } else if (value.length !== 13) {
        setCnpError("CNP-ul trebuie să aibă 13 caractere.");
      } else {
        setCnpError("");
      }
    }

    if (name === "salBrut") {
      if (!/^\d+$/.test(value)) {
        setSalBrutError("Salariul brut trebuie să conțină doar cifre.");
      } else {
        setSalBrutError("");
      }
    }

    if (name === "telefon") {
      if (!/^\d+$/.test(value)) {
        setTelefonError("Numărul de telefon trebuie să conțină doar cifre.");
      } else {
        setTelefonError("");
      }
    }

    const isDisabled =
      value === "" ||
      angajat.name === "" ||
      angajat.prenume === "" ||
      angajat.salBrut === "" ||
      angajat.cnp === "" ||
      angajat.dataNastere === "" ||
      angajat.adresa === "" ||
      angajat.dataAngajare === "" ||
      cnpError !== "" ||
      salBrutError !== "" ||
      !validateDateFormat(angajat.dataNastere) ||
      !validateDateFormat(angajat.dataAngajare);

    setIsButtonDisabled(isDisabled);
  };

  const handleSave = async () => {
    try {
      await API.createAngajat(angajat);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const validateDateFormat = (value) => {
    const pattern = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;
    return pattern.test(value);
  };

  return (
    <Container>
      <StyledFormControl>
        <TextField
          label="Nume"
          name="name"
          value={angajat.name}
          onChange={handleChange}
          variant="standard"
          margin="normal"
        />
        <TextField
          label="Prenume"
          name="prenume"
          value={angajat.prenume}
          onChange={handleChange}
          variant="standard"
          margin="normal"
        />

        <FormControl
          variant="standard"
          sx={{ m: 1, width: 180 }}
          fullWidth
          margin="normal"
        >
          <InputLabel id="departament-label">Departament</InputLabel>
          <Select
            labelId="departament-label"
            id="departament"
            name="departament"
            label="Departament"
            onChange={handleChange}
          >
            {departments.map((department) => (
              <MenuItem key={department} value={department}>
                {department}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Adresa"
          name="adresa"
          value={angajat.adresa}
          onChange={handleChange}
          variant="standard"
          margin="normal"
        />
        <TextField
          label="Data Nasterii"
          name="dataNastere"
          value={angajat.dataNastere}
          onChange={handleChange}
          variant="standard"
          margin="normal"
          error={!validateDateFormat(angajat.dataNastere)}
          helperText={
            !validateDateFormat(angajat.dataNastere)
              ? "Formatul trebuie să fie ZZ/LL/AAAA."
              : ""
          }
        />
        <TextField
          label="Data Angajarii"
          name="dataAngajare"
          value={angajat.dataAngajare}
          onChange={handleChange}
          variant="standard"
          margin="normal"
          error={!validateDateFormat(angajat.dataAngajare)}
          helperText={
            !validateDateFormat(angajat.dataAngajare)
              ? "Formatul trebuie să fie ZZ/LL/AAAA."
              : ""
          }
        />
        <TextField
          label="CNP"
          name="cnp"
          value={angajat.cnp}
          onChange={handleChange}
          variant="standard"
          margin="normal"
          error={cnpError !== ""}
          helperText={cnpError}
        />
        <TextField
          label="Salariu Brut"
          name="salBrut"
          value={angajat.salBrut}
          onChange={handleChange}
          variant="standard"
          margin="normal"
          error={salBrutError !== ""}
          helperText={salBrutError}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={isButtonDisabled}
        >
          Salveaza
        </Button>
      </StyledFormControl>
    </Container>
  );
};

export default CreateAngajat;
