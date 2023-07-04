import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../service/api";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ActualizareTichet = () => {
  const [tichet, setTichet] = useState({
    name: "",
    date: "",
    tipCerere: "",
    mesaj: "",
    status: "",
    raspuns: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.getTichetById(id);
        if (response.isSuccess) {
          setTichet(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTichet((prevTichet) => ({
      ...prevTichet,
      [name]: value,
    }));
  };

  const updateTichet = async () => {
    try {
      await API.updateTichet(tichet, id);
      navigate("/vizualizare-tichete");
    } catch (error) {
      console.log("Error updating tichet:", error);
    }
  };

  const actiune = ["Amanat", "Rezolvat", "Respins"];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Raspuns Tichet
      </Typography>
      <Box component="form" sx={{ "& .MuiTextField-root": { mt: 1 } }}>
        <Typography>{tichet.name}</Typography>
        <Typography>{tichet.date}</Typography>
        <Typography>{tichet.tipCerere}</Typography>
        <Typography>{tichet.mesaj}</Typography>
        <Container>
          <TextField
            fullWidth
            label="Raspuns"
            name="raspuns"
            value={tichet.raspuns}
            onChange={handleChange}
          />
          ;
        </Container>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select name="status" value={tichet.status} onChange={handleChange}>
            {actiune.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={updateTichet}>
          Trimite
        </Button>
      </Box>
    </Box>
  );
};

export default ActualizareTichet;
