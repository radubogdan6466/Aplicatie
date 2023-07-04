import React, { useState, useEffect } from "react";
import styles from "./styleContract";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";

const ContractAngajare = ({ angajat }) => {
  return (
    <Document>
      <Page size={"A4"} style={styles.body}>
        <View style={styles.container}>
          <Text style={styles.title}>Contract individual de munca</Text>
          <Text style={styles.subtitle}>Angajator: Tema PSI</Text>
          <Text style={styles.sectionTitle}>Clauze contractuale</Text>
          <Text style={styles.paragraph}>
            Incheiat astazi, {angajat.dataAngajare}, intre angajatorul Tema PSI,
            cu sediul in UVT si codul fiscal CUI300667, reprezentat de Otniel
            Didraga in calitate de angajator, si salariatul {angajat.name}{" "}
            {angajat.prenume}, CNP {angajat.cnp}, domiciliat in {angajat.adresa}
            , in calitate de salariat.
          </Text>
          <Text style={styles.sectionTitle}>
            Articolul 1. Obiectul contractului
          </Text>
          <Text style={styles.paragraph}>
            Angajatorul angajeaza salariatul in calitate de CEO in conformitate
            cu prevederile legislatiei muncii si ale prezentului contract.
          </Text>
          <Text style={styles.sectionTitle}>
            Articolul 2. Durata contractului
          </Text>
          <Text style={styles.paragraph}>
            Prezentul contract individual de munca este incheiat pe durata
            nedeterminata, incepand cu data de {angajat.dataAngajare}
          </Text>
          <Text style={styles.sectionTitle}>
            Articolul 3. Conditii de munca
          </Text>
          <Text style={styles.paragraph}>
            Salariul de incadrare al salariatului va fi in conformitate cu grila
            de salarizare stabilita de angajator, {angajat.salBrut} si va fi
            platit lunar, in lei, prin Transfer bancar.
          </Text>
          <Text style={styles.sectionTitle}>
            Articolul 4. Obligatiile angajatorului
          </Text>
          <Text style={styles.paragraph}>
            Angajatorul are urmatoarele obligatii: - Sa asigure un mediu de
            lucru sigur si sanatos; - Sa plateasca salariul la termenele
            stabilite; - Sa respecte prevederile legale privind munca si
            protectia salariatului.
          </Text>
          <Text style={styles.sectionTitle}>
            Articolul 5. Obligatiile salariatului
          </Text>
          <Text style={styles.paragraph}>
            Salariatul are urmatoarele obligatii: - Sa presteze munca conform
            atributiilor sale; - Sa respecte regulile interne si prevederile
            legale in vigoare; - Sa informeze angajatorul in cazul absentei la
            locul de munca.
          </Text>
          <Text style={styles.sectionTitle}>
            Articolul 6. Incetarea contractului
          </Text>
          <Text style={styles.paragraph}>
            Prezentul contract poate inceta in urmatoarele cazuri: - Acordul
            partilor; - Respingerea cererii de prelungire a contractului; -
            Demisie din initiativa salariatului; - Demisie din initiativa
            angajatorului; - Expirarea duratei contractului.
          </Text>
          <Text style={styles.sectionTitle}>Articolul 7. Litigii</Text>
          <Text style={styles.paragraph}>
            Eventualele litigii aparute intre parti in legatura cu executarea
            prezentului contract se vor solutiona pe cale amiabila. In cazul in
            care nu se poate ajunge la un acord, litigiul va fi solutionat in
            instanta de judecata competenta.
          </Text>
        </View>
      </Page>
    </Document>
  );
};
{
  /** <PDFViewer style={{ width: "90%", height: "500px" }}>
        <ContractAngajare />
      </PDFViewer> */
}
export default ContractAngajare;
