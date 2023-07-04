import React from "react";
import imprimanta from "../../../../src/imprimanta.png";
import laptop from "../../../../src/laptop.png";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    marginTop: "40px",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: "16px",
  },
  title: {
    fontSize: "15px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  table: {
    width: "100%",
    marginBottom: "16px",
  },
  tableHeader: {
    backgroundColor: "#000000",
    color: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
  },
  tableHeaderText: {
    fontSize: "12px",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px solid #000000",
  },
  tableRowText: {
    fontSize: "10px",
    textAlign: "center",
    flex: 1,
  },
});

const TabelCostDept = ({
  angajati,
  departamentSelectat,
  account,
  departament,
}) => {
  const calculateCostTotal = (angajat) => {
    return angajat.salBrut + angajat.bonus + angajat.beneficii;
  };

  const filteredAngajati = angajati.filter(
    (angajat) =>
      departamentSelectat === "" || angajat.departament === departamentSelectat
  );

  const calculateTotalCosts = () => {
    return filteredAngajati.reduce((totalCosts, angajat) => {
      return totalCosts + calculateCostTotal(angajat);
    }, 0);
  };

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Raport costuri Bonus / Beneficii</Text>
          <Text style={styles.title}>Departament: {departamentSelectat}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Nume</Text>
            <Text style={styles.tableHeaderText}>Salariu de bază</Text>
            <Text style={styles.tableHeaderText}>Bonusuri</Text>
            <Text style={styles.tableHeaderText}>Beneficii</Text>
            <Text style={styles.tableHeaderText}>Cost salarial total</Text>
          </View>
          {filteredAngajati.map((angajat) => (
            <View style={styles.tableRow} key={angajat.id}>
              <Text style={styles.tableRowText}>{angajat.name}</Text>
              <Text style={styles.tableRowText}>{angajat.salBrut}</Text>
              <Text style={styles.tableRowText}>{angajat.bonus}</Text>
              <Text style={styles.tableRowText}>{angajat.beneficii}</Text>
              <Text style={styles.tableRowText}>
                {calculateCostTotal(angajat)}
              </Text>
            </View>
          ))}
          <Text>
            Total costuri salariale cu Bonus / Beneficii:
            {calculateTotalCosts()}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>Loc obtinere: {account.departament}</Text>
          <Text style={styles.text}>Destinatie: {departamentSelectat}</Text>
          <Text style={styles.text}>Numar de exemplare: 1</Text>
          <Text style={styles.text}>Frecventa: lunar</Text>
          <Text style={styles.text}>Dispozitiv sau periferic de iesire:</Text>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={imprimanta} />
              <View style={styles.divider} />
              <Image style={styles.image} source={laptop} />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default TabelCostDept;
