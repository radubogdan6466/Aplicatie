import React, { useState, useEffect, useContext } from "react";
import { API } from "../../service/api";
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
import TabelTaxeSalarii from "../pdfs/tabelCosturi/tabelTaxeSalarii";
import { DataContext } from "../../context/DataProvider";
const TaxeSalarii = () => {
  const { account } = useContext(DataContext);
  const [angajati, setAngajati] = useState([]);
  const [departamentSelectat, setDepartamentSelectat] = useState("");
  const [pdfBlob, setPdfBlob] = useState(null);

  useEffect(() => {
    fetchAngajati();
  }, []);

  const fetchAngajati = async () => {
    try {
      const response = await API.getAllAngajati();
      if (response.isSuccess) {
        setAngajati(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateCostTotal = (angajat) => {
    return angajat.salBrut + angajat.bonus + angajat.beneficii;
  };

  const calculateTotalCosts = () => {
    return angajati.reduce((totalCosts, angajat) => {
      return totalCosts + calculateCostTotal(angajat);
    }, 0);
  };

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = "costuri_salariale.pdf";
    downloadLink.click();
  };
  const handleDepartamentChange = (event) => {
    setDepartamentSelectat(event.target.value);
  };
  return (
    <>
      <Box>
        <div>Total costuri total: {calculateTotalCosts()}</div>
        <select value={departamentSelectat} onChange={handleDepartamentChange}>
          <option value="">Toate departamentele</option>
          <option value="Vizual">Vizual</option>
          <option value="Plantare">Plantare</option>
          <option value="SMD">SMD</option>
          <option value="Testare">Testare</option>
          <option value="HR">HR</option>
          <option value="Financiar">Financiar</option>
          <option value="Lacuire">Lacuire</option>
          <option value="QA">QA</option>
        </select>

        {pdfBlob && (
          <Button variant="contained" onClick={handleDownload}>
            Descarcă PDF
          </Button>
        )}
      </Box>
      <PDFViewer width="100%" height={700}>
        <TabelTaxeSalarii
          angajati={angajati}
          departamentSelectat={departamentSelectat}
          departament={account.departament}
          account={account}
        />
      </PDFViewer>
    </>
  );
};

export default TaxeSalarii;
