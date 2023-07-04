import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  styled,
} from "@mui/material";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

// components

const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledForm = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #ccc;
`;

const StyledTextarea = styled("textarea")`
  width: 100%;
  height: 200px;
  resize: vertical;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 10px;
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  width: 150px;
  height: 40px;
  margin-bottom: 10px;
`;

// Define initialValue here
const initialValue = {
  name: "",
  date: new Date(),
  mesaj: "",
  status: "In asteptare",
  tipCerere: "",
};

const InregistrareTichet = () => {
  const [tichet, setTichet] = useState(initialValue);
  const [toggle, setToggle] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { account } = useContext(DataContext);

  const handleChange = (e) => {
    setTichet({
      ...tichet,
      name: account.username,
      mesaj: e.target.value,
    });
  };

  const handleTipCerereChange = (event) => {
    setTichet({
      ...tichet,
      tipCerere: event.target.value,
    });
  };

  const addTichet = async () => {
    await API.createTichet(tichet);
    setTichet(initialValue);
    setToggle((prev) => !prev);
    setIsSubmitted(true);
  };

  const handleCloseSnackbar = () => {
    setIsSubmitted(false);
  };

  const isInputValid = tichet.mesaj.trim() !== "";

  return (
    <Container>
      <StyledForm>
        <StyledTextarea
          placeholder="Scrie cererea aici"
          onChange={handleChange}
          value={tichet.mesaj}
        />
        <StyledFormControl>
          <InputLabel id="tip-cerere-label">Tip cerere</InputLabel>
          <Select
            labelId="tip-cerere-label"
            id="tip-cerere-select"
            value={tichet.tipCerere}
            onChange={handleTipCerereChange}
          >
            <MenuItem value="">Selectează tipul cererii</MenuItem>
            <MenuItem value="Inregistrare angajat nou">
              Înregistrare angajat nou
            </MenuItem>
            <MenuItem value="Acces la resurse">Acces la resurse</MenuItem>
            <MenuItem value="Asistență IT">Asistență IT</MenuItem>
            <MenuItem value="Integrare sistem">Integrare sistem</MenuItem>
            <MenuItem value="Cerere de aprobare">Cerere de aprobare</MenuItem>
            <MenuItem value="Cerere de informații">
              Cerere de informații
            </MenuItem>
            <MenuItem value="Cerere de actualizare date">
              Cerere de actualizare date
            </MenuItem>
          </Select>
        </StyledFormControl>

        <StyledButton
          color="primary"
          variant="contained"
          onClick={addTichet}
          disabled={!isInputValid}
        >
          Trimite cererea
        </StyledButton>
      </StyledForm>

      <Snackbar
        open={isSubmitted}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Tichet trimis cu succes!"
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      />
    </Container>
  );
};

export default InregistrareTichet;
