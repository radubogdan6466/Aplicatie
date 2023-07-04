import React, { useState, useEffect } from "react";
import { Page, Text, Document, View } from "@react-pdf/renderer";
import styles from "./styleFluturas.js.js";
import { format } from "date-fns";
import ro from "date-fns/locale/ro";

const Fluturas = ({ angajat }) => {
  const [currentMonth, setCurrentMonth] = useState("");

  const salariuOra = angajat.salBrut / 168;
  const avansSalariu = angajat.salNet * 0.3;
  const restPlata = angajat.salNet - avansSalariu;

  useEffect(() => {
    getCurrentMonth();
  }, []);

  const getCurrentMonth = () => {
    const date = new Date();
    const formattedMonth = format(date, "MMMM", { locale: ro });
    const formattedYear = format(date, "yyyy");
    const currentMonth = `${formattedMonth} ${formattedYear}`;
    setCurrentMonth(currentMonth);
    const previousDate = new Date();

    previousDate.setMonth(previousDate.getMonth() - 1);
    const previousFormattedMonth = format(previousDate, "MMMM", { locale: ro });
    const previousFormattedYear = format(previousDate, "yyyy");
    const previousMonth = `${previousFormattedMonth} ${previousFormattedYear}`;

    return [currentMonth, previousMonth];
  };
  return (
    <Document>
      <Page size={"A5"} style={styles.body}>
        <Text>Sc Uvt</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>
                Nume:
                <Text style={{ height: 10 }}>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                {angajat.name}
              </Text>
              <Text style={styles.tableCell}>
                Prenume:
                <Text style={{ height: 10 }}>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                {angajat.prenume}
              </Text>
            </View>

            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                Functia:
                <Text style={{ height: 10 }}>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                {angajat.functia}
              </Text>
              <Text style={styles.tableCell}>
                Raport salariu luna:
                <Text style={{ height: 10 }}>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                {currentMonth}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol2}>
              <Text style={styles.tableCell}>
                Sal de incadrare:
                <Text style={{ height: 10 }}>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                {angajat.salBrut}
              </Text>
              <Text style={styles.tableCell}>
                Salariu orar:
                <Text style={{ height: 10 }}>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                {angajat.salBrut / 160}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol5}>
              <Text style={styles.tableCell}>Ore regim normal:</Text>
              <Text style={styles.tableCell}>Ore CO:</Text>
              <Text style={styles.tableCell}>Ore BO:</Text>
              <Text style={styles.tableCell}>Ore suplim:</Text>
              <Text style={styles.tableCell}>Pers. intretinute:</Text>
              <Text style={styles.tableCell}>Venit impozabil:</Text>
            </View>

            <View style={styles.tableCol6}>
              <Text style={styles.tableCell}>160</Text>
              <Text style={styles.tableCell}>0</Text>
              <Text style={styles.tableCell}>0</Text>
              <Text style={styles.tableCell}>0</Text>
              <Text style={styles.tableCell}>0</Text>
              <Text style={styles.tableCell}>0</Text>
            </View>

            <View style={styles.tableCol5}>
              <Text style={styles.tableCell}>Suma regim normal:</Text>
              <Text style={styles.tableCell}>Sume CO:</Text>
              <Text style={styles.tableCell}>Sume BO:</Text>
              <Text style={styles.tableCell}>Sume ore Suplim</Text>
              <Text style={styles.tableCell}>CASS 10%</Text>
              <Text style={styles.tableCell}>CAS 25%</Text>
              <Text style={styles.tableCell}>Deducere</Text>
              <Text style={styles.tableCell}>Impozit venit 10%</Text>
              <Text style={styles.tableCell}>Salariu net</Text>
              <Text style={styles.tableCell}>Avans Salariu</Text>
              <Text style={styles.tableCell}>Rest de plata</Text>
            </View>

            <View style={styles.tableCol6}>
              <Text style={styles.tableCell}> {angajat.salBrut}</Text>
              <Text style={styles.tableCell}>0</Text>
              <Text style={styles.tableCell}>0</Text>
              <Text style={styles.tableCell}>0</Text>

              <Text style={styles.tableCell}>{angajat.cass}</Text>
              <Text style={styles.tableCell}>{angajat.cas}</Text>
              <Text style={styles.tableCell}>{angajat.deducere}</Text>
              <Text style={styles.tableCell}>{angajat.impozit} </Text>
              <Text style={styles.tableCell}>{angajat.salNet}</Text>
              <Text style={styles.tableCell}>{avansSalariu}</Text>
              <Text style={styles.tableCell}>{restPlata}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Fluturas;
