import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Button,
  TableRow,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Download } from "@mui/icons-material";

import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { format } from "date-fns";
import ro from "date-fns/locale/ro";
import DeleteIcon from "@mui/icons-material/Delete";
import { blue } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
//pdf
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import Fluturas from "../pdfs/fluturas/fluturas";
import ContractAngajare from "../pdfs/contract/ContractAngajat";
//import ActualizareAngajat from "../create/ActualizareAngajat";

const StyledTable = styled(Table)`
  width: fitting;
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
`;
const PDFViewerContainer = styled(Box)`
  width: 100%;
  height: 600px;
  margin-bottom: 16px;
`;

const PDFDownloadLinkContainer = styled(Box)`
  margin-bottom: 16px;
`;
const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const StyledButton = styled(Button)`
  margin: 0 8px;
  padding: 12px 24px;
  font-size: 16px;
`;
const StyledDownloadButton = styled(Button)`
  padding: 10px 20px;
  font-size: 16px;
  text-transform: none;
`;

const DetaliiAngajat = () => {
  const [angajat, setAngajat] = useState({});
  const { account } = useContext(DataContext);
  const [isFluturasVisible, setIsFluturasVisible] = useState(false);
  const [isContractVisible, setIsContractVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("");
  useEffect(() => {
    getCurrentMonth();
  }, []);
  const getCurrentMonth = () => {
    const date = new Date();
    const formattedMonth = format(date, "MMMM", { locale: ro });
    const formattedYear = format(date, "yyyy");
    const currentMonth = `${formattedMonth} ${formattedYear}`;
    setCurrentMonth(currentMonth);
  };
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

  const deleteAngajat = async () => {
    await API.deleteAngajat(angajat._id);
    navigate("/");
  };

  const toggleFluturasVisibility = () => {
    setIsFluturasVisible(!isFluturasVisible);
  };
  const toggleContractVisibility = () => {
    setIsContractVisible(!isContractVisible);
  };

  const updateAngajat = () => {
    navigate(`/actualizare-angajat/${angajat._id}`);
  };
  const FluturasDownloadButton = () => (
    <StyledDownloadButton
      variant="contained"
      color="primary"
      startIcon={<Download />}
      component={PDFDownloadLink}
      document={<Fluturas angajat={angajat} />}
      fileName={`Salariu_${angajat.name}_${currentMonth}.pdf`}
    >
      {({ loading }) =>
        loading ? "Se descarcă fluturașul..." : "Descarcă fluturașul"
      }
    </StyledDownloadButton>
  );
  const ContractDownloadButton = () => (
    <StyledDownloadButton
      variant="contained"
      color="primary"
      startIcon={<Download />}
      component={PDFDownloadLink}
      document={<ContractAngajare angajat={angajat} />}
      fileName={`Contract_${angajat.name}.pdf`}
    >
      {({ loading }) =>
        loading ? "Se descarcă contractul..." : "Descarcă contractul"
      }
    </StyledDownloadButton>
  );
  const angajatLipsaDate = [];
  if (angajat.name === "") {
    angajatLipsaDate.push("Nume");
  }
  if (angajat.adresa === "") {
    angajatLipsaDate.push("Adresa");
  }
  if (angajat.prenume === "") {
    angajatLipsaDate.push("Prenume");
  }
  if (angajat.dataNastere === "") {
    angajatLipsaDate.push("Data Nastere");
  }
  if (angajat.email === "") {
    angajatLipsaDate.push("Email");
  }
  if (angajat.cetatenie === "") {
    angajatLipsaDate.push("Cetatenie");
  }
  if (angajat.cnp === "") {
    angajatLipsaDate.push("CNP");
  }
  if (angajat.stareCivila === "") {
    angajatLipsaDate.push("Starea civila");
  }
  if (angajat.salBrut === "") {
    angajatLipsaDate.push("Salariu brut");
  }
  if (angajat.functia === "") {
    angajatLipsaDate.push("Functie");
  }
  if (angajat.dataAngajare === "") {
    angajatLipsaDate.push("Data angajarii");
  }
  if (angajat.departament === "") {
    angajatLipsaDate.push("Departament");
  }
  if (angajat.contIban === "") {
    angajatLipsaDate.push("Cont bancar");
  }
  if (angajat.supervizor === "") {
    angajatLipsaDate.push("Supervizorul angajatului");
  }
  if (angajat.dispOreSuplim === "") {
    angajatLipsaDate.push(
      "Nu s-a sepcificat daca este disponibil pentru ore splimentare"
    );
  }
  return (
    <Box>
      <StyledTable>
        <TableHead sx={{ backgroundColor: blue[500] }}>
          <THead>
            <TableCell>Nume</TableCell>
            <TableCell>Prenume</TableCell>
            <TableCell>Dept</TableCell>
            <TableCell>Data Nasterii</TableCell>
            <TableCell>Adresa</TableCell>
            <TableCell>Telefon</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Cetatenie</TableCell>
            <TableCell>CNP</TableCell>
            <TableCell>Stare Civila</TableCell>
            <TableCell>Salariu Brut</TableCell>
            <TableCell>Functia</TableCell>
            <TableCell>Data Angajare</TableCell>
            <TableCell>bonus</TableCell>
            <TableCell>beneficii</TableCell>
            <TableCell>
              Disponibil <br /> suplimentare
            </TableCell>
            <TableCell>IBan</TableCell>
            <TableCell>supervizor</TableCell>
            <TableCell>CAS</TableCell>
            <TableCell>CASS</TableCell>
            <TableCell>impozit</TableCell>
            <TableCell>Salariu net</TableCell>
            <TableCell>Deducere</TableCell>
          </THead>
        </TableHead>
        <TableBody>
          <TRow>
            <TableCell>{angajat.name}</TableCell>
            <TableCell>{angajat.prenume}</TableCell>
            <TableCell>{angajat.departament}</TableCell>
            <TableCell>{angajat.dataNastere}</TableCell>
            <TableCell>{angajat.adresa}</TableCell>
            <TableCell>{angajat.telefon}</TableCell>
            <TableCell>{angajat.email}</TableCell>
            <TableCell>{angajat.cetatenie}</TableCell>
            <TableCell>{angajat.cnp}</TableCell>
            <TableCell>{angajat.stareCivila}</TableCell>
            <TableCell>{angajat.salBrut}</TableCell>
            <TableCell>{angajat.functia}</TableCell>
            <TableCell>{angajat.dataAngajare}</TableCell>
            <TableCell>{angajat.bonus}</TableCell>
            <TableCell>{angajat.beneficii}</TableCell>
            <TableCell>{angajat.dispOreSuplim}</TableCell>
            <TableCell>{angajat.contIban}</TableCell>
            <TableCell>{angajat.supervizor}</TableCell>
            <TableCell>{angajat.cas}</TableCell>
            <TableCell>{angajat.cass}</TableCell>
            <TableCell>{angajat.impozit}</TableCell>
            <TableCell>{angajat.salNet}</TableCell>
            <TableCell>{angajat.deducere}</TableCell>
          </TRow>
        </TableBody>
      </StyledTable>

      {account.username === "admin" && (
        <ButtonContainer>
          <StyledButton
            variant="outlined"
            color="success"
            onClick={updateAngajat}
          >
            <EditIcon />
            Editeaza
          </StyledButton>
          <StyledButton
            onClick={async () => await deleteAngajat()}
            startIcon={<DeleteIcon />}
            color="error"
            variant="outlined"
          >
            Sterge
          </StyledButton>
        </ButtonContainer>
      )}
      {angajatLipsaDate.length > 0 && (
        <Typography variant="body1">
          Angajatul are următoarele date lipsă:
          <List>
            {angajatLipsaDate.map((dateLipsa) => (
              <ListItem key={dateLipsa}>
                <ListItemText primary={dateLipsa} />
              </ListItem>
            ))}
          </List>
        </Typography>
      )}
      <Grid container spacing={2} sx={{ marginTop: "16px" }}>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="success"
            onClick={toggleFluturasVisibility}
          >
            {isFluturasVisible ? "Ascunde fluturaș" : "Afișează fluturaș"}
          </Button>
          {isFluturasVisible && (
            <>
              <PDFDownloadLinkContainer>
                <FluturasDownloadButton />
              </PDFDownloadLinkContainer>
              <PDFViewerContainer>
                <PDFViewer width="100%" height="100%">
                  <Fluturas angajat={angajat} />
                </PDFViewer>
              </PDFViewerContainer>
            </>
          )}
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="success"
            onClick={toggleContractVisibility}
          >
            {isContractVisible ? "Ascunde Contractul" : "Afișează Contractul"}
          </Button>
          {isContractVisible && (
            <>
              <PDFDownloadLinkContainer>
                <ContractDownloadButton />
              </PDFDownloadLinkContainer>
              <PDFViewerContainer>
                <PDFViewer width="100%" height="100%">
                  <ContractAngajare angajat={angajat} />
                </PDFViewer>
              </PDFViewerContainer>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetaliiAngajat;
