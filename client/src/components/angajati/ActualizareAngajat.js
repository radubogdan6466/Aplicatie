import React, { useState, useEffect, useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../service/api";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DataContext } from "../../context/DataProvider";

const ActualizareAngajat = () => {
  const { account, enabled } = useContext(DataContext);

  const [angajat, setAngajat] = useState({
    name: "",
    prenume: "",
    departament: "",
    dataNastere: "",
    adresa: "",
    telefon: "",
    email: "",
    cetatenie: "",
    cnp: "",
    stareCivila: "",
    salBrut: 0,
    functia: "",
    dataAngajare: "",
    bonus: "",
    beneficii: "",
    dispOreSuplim: "",
    contIban: "",
    supervizor: "",
    departament: "",
    cas: 0,
    cass: 0,
    impozit: 0,
    salNet: 0,
    deducere: 0,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.getAngajatById(id);
        if (response.isSuccess) {
          setAngajat(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newValue = value;

    if (name === "salBrut") {
      newValue = parseFloat(value);
      const cas = 0.25 * newValue;
      const cass = 0.1 * newValue;
      const impozit = 0.1 * newValue;
      const salNet = newValue - cas - cass - impozit;
      let deducere = 0;
      if (newValue <= 4000) {
        deducere = 600;
      } else if (newValue > 4000 && newValue <= 5000) {
        deducere = 300;
      }
      setAngajat((prevAngajat) => ({
        ...prevAngajat,
        [name]: newValue,
        cas: cas,
        cass: cass,
        impozit: impozit,
        salNet: salNet,
        deducere: deducere,
      }));
    } else {
      setAngajat((prevAngajat) => ({
        ...prevAngajat,
        [name]: newValue,
      }));
    }
  };

  const updateAngajat = async () => {
    try {
      await API.updateAngajat(angajat, id);
      navigate(`/detalii-angajat/${id}`);
    } catch (error) {
      console.log("Error updating angajat:", error);
    }
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
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Actualizare Angajat
      </Typography>
      <Box component="form" sx={{ "& .MuiTextField-root": { mt: 1 } }}>
        <TextField
          fullWidth
          label="Nume"
          name="name"
          value={angajat.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Prenume"
          name="prenume"
          value={angajat.prenume}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Data Nasterii"
          name="dataNastere"
          value={angajat.dataNastere}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Adresa"
          name="adresa"
          value={angajat.adresa}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Telefon"
          name="telefon"
          value={angajat.telefon}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={angajat.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Cetatenie"
          name="cetatenie"
          value={angajat.cetatenie}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="CNP"
          name="cnp"
          value={angajat.cnp}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Stare Civila"
          name="stareCivila"
          value={angajat.stareCivila}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Functia"
          name="functia"
          value={angajat.functia}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Data Angajare"
          name="dataAngajare"
          value={angajat.dataAngajare}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Bonus"
          name="bonus"
          value={angajat.bonus}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="beneficii"
          name="beneficii"
          value={angajat.beneficii}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Cont IBAN"
          name="contIban"
          value={angajat.contIban}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Supervizor"
          name="supervizor"
          value={angajat.supervizor}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Disponibilitate lucru suplimentar"
          name="dispOreSuplim"
          value={angajat.dispOreSuplim}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Salariu Brut"
          name="salBrut"
          value={angajat.salBrut}
          onChange={handleChange}
          disabled={account.username === "admin" && enabled}
        />
        <TextField
          fullWidth
          label="CAS"
          name="cas"
          value={angajat.cas}
          onChange={handleChange}
          disabled={account.username === "admin" && enabled}
        />

        <TextField
          fullWidth
          label="CASS"
          name="cass"
          value={angajat.cass}
          onChange={handleChange}
          disabled={account.username === "admin" && enabled}
        />
        <TextField
          fullWidth
          label="Impozit"
          name="impozit"
          value={angajat.impozit}
          onChange={handleChange}
          disabled={account.username === "admin" && enabled}
        />

        <TextField
          fullWidth
          label="Salariu Net"
          name="salNet"
          value={angajat.salNet}
          onChange={handleChange}
          disabled={account.username === "admin" && enabled}
        />
        <TextField
          fullWidth
          label="Deducere"
          name="deducere"
          value={angajat.deducere}
          onChange={handleChange}
          disabled={account.username === "admin" && enabled}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Departament
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            name="departament"
            label="Departament"
            onChange={handleChange}
            value={angajat.departament}
          >
            {departments.map((department) => (
              <MenuItem variant="outlined" key={department} value={department}>
                {department}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={updateAngajat}>
          Actualizare
        </Button>
      </Box>
    </Box>
  );
};

export default ActualizareAngajat;
