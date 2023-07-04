import React, { useEffect, useState, useContext } from "react";
import { Box, TextField, MenuItem, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { blue } from "@mui/material/colors";
import { API } from "../../service/api";
// components
import {
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableHead,
  styled,
  Button,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
const StyledTable = styled(Table)`
  width: fitting;
  overflow-y: auto;
  min-height: 100px;
  min-width: 620px;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    margin: 0;
    padding: 10px;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 11px;
    justify-content: center;
    text-align: center;
  }
}`;

const Angajati = () => {
  const [angajati, setAngajati] = useState([]);
  const [numeFilter, setNumeFilter] = useState("");
  const [prenumeFilter, setPrenumeFilter] = useState("");
  const [cnpFilter, setCnpFilter] = useState("");
  const [departamentFilter, setDepartamentFilter] = useState("");
  const { account } = useContext(DataContext);
  const [filteredAngajati, setFilteredAngajati] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAngajati();
  }, [
    angajati,
    account,
    numeFilter,
    prenumeFilter,
    cnpFilter,
    departamentFilter,
    showAll,
  ]);

  const fetchData = async () => {
    try {
      const response = await API.getAllAngajati();
      if (response.isSuccess) {
        setAngajati(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNumeFilter = (event) => {
    setNumeFilter(event.target.value);
  };

  const handlePrenumeFilter = (event) => {
    setPrenumeFilter(event.target.value);
  };

  const handleCnpFilter = (event) => {
    setCnpFilter(event.target.value);
  };

  const handleDepartamentFilter = (event) => {
    setDepartamentFilter(event.target.value);
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const filterAngajati = () => {
    let filtered = angajati;

    if (account.username !== "admin") {
      filtered = angajati.filter(
        (angajat) => angajat.departament === account.departament
      );
    }

    if (departamentFilter) {
      filtered = filtered.filter(
        (angajat) => angajat.departament === departamentFilter
      );
    }

    const filteredAngajati = filtered.filter((angajat) => {
      const lowerCaseName = angajat.name?.toLowerCase() || "";
      const lowerCasePrenume = angajat.prenume?.toLowerCase() || "";
      const lowerCaseNumeFilter = numeFilter.toLowerCase();
      const lowerCasePrenumeFilter = prenumeFilter.toLowerCase();
      const lowerCaseCnpFilter = cnpFilter.toLowerCase();

      return (
        lowerCaseName.includes(lowerCaseNumeFilter) &&
        lowerCasePrenume.includes(lowerCasePrenumeFilter) &&
        angajat.cnp.includes(lowerCaseCnpFilter)
      );
    });

    setFilteredAngajati(filteredAngajati);
  };

  const visibleAngajati = showAll
    ? filteredAngajati
    : filteredAngajati.slice(0, 6);

  return (
    <div style={{ marginBottom: 20, marginLeft: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Nume"
            value={numeFilter}
            onChange={handleNumeFilter}
            variant="outlined"
            fullWidth
            style={{ marginBottom: 10 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Prenume"
            value={prenumeFilter}
            onChange={handlePrenumeFilter}
            variant="outlined"
            fullWidth
            style={{ marginBottom: 10 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="CNP"
            value={cnpFilter}
            onChange={handleCnpFilter}
            variant="outlined"
            fullWidth
            style={{ marginBottom: 10 }}
          />
        </Grid>
        <Grid item xs={6}>
          {account.username === "admin" && (
            <TextField
              select
              label="Departament"
              value={departamentFilter}
              onChange={handleDepartamentFilter}
              variant="outlined"
              fullWidth
              style={{ marginBottom: 10 }}
            >
              <MenuItem value="">Toate departamentele</MenuItem>
              <MenuItem value="Vizual">Vizual</MenuItem>
              <MenuItem value="Plantare">Plantare</MenuItem>
              <MenuItem value="SMD">SMD</MenuItem>
              <MenuItem value="Testare">Testare</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Financiar">Financiar</MenuItem>
              <MenuItem value="Lacuire">Lacuire</MenuItem>
              <MenuItem value="QA">QA</MenuItem>
            </TextField>
          )}
        </Grid>
      </Grid>
      {account.departament}
      <StyledTable>
        <TableHead sx={{ backgroundColor: blue[500] }}>
          <THead>
            <TableCell>Nume</TableCell>
            <TableCell>Prenume</TableCell>
            <TableCell>CNP</TableCell>
            <TableCell>id</TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {visibleAngajati.length ? (
            visibleAngajati.map((angajat) => (
              <TRow key={angajat.id}>
                <TableCell>{angajat.name}</TableCell>
                <TableCell>{angajat.prenume}</TableCell>
                <TableCell>{angajat.cnp}</TableCell>
                <TableCell>{angajat._id}</TableCell>
                <TableCell>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/detalii-angajat/${angajat._id}`}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      style={{
                        marginBottom: 10,
                        marginRight: 10,
                        width: 80,
                        height: 30,
                      }}
                    >
                      <LaunchIcon />
                    </Button>
                  </Link>
                </TableCell>
              </TRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} style={{ textAlign: "center" }}>
                Nu există angajat cu aceste date
              </TableCell>
            </TableRow>
          )}
          {!showAll && filteredAngajati.length > 6 && (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: "center" }}>
                <Button variant="contained" onClick={handleShowAll}>
                  Vezi toți angajații
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </div>
  );
};

export default Angajati;
