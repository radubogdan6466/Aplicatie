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
    fontSize: "15px",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  tableHeaderImg: {
    fontSize: "40px",
    textAlign: "center",
    flex: 1,
  },
  texthead: {
    fontWeight: "bold",
    fontSize: "13px",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px solid #000000",
  },

  tableRowText: {
    fontSize: "13px",
    textAlign: "center",
    flex: 1,
  },
});

const TabelTaxeSalarii = ({
  angajati,
  departamentSelectat,
  account,
  departament,
}) => {
  const filteredAngajati = angajati.filter(
    (angajat) =>
      departamentSelectat === "" || angajat.departament === departamentSelectat
  );
  const calculateTotalSalarii = () => {
    return filteredAngajati.reduce((totalSalarii, angajat) => {
      return totalSalarii + angajat.salBrut;
    }, 0);
  };

  const calculateTotalBonusuri = () => {
    return filteredAngajati.reduce((totalBonusuri, angajat) => {
      return totalBonusuri + angajat.bonus;
    }, 0);
  };

  const calculateTotalBeneficii = () => {
    return filteredAngajati.reduce((totalBeneficii, angajat) => {
      return totalBeneficii + angajat.beneficii;
    }, 0);
  };

  const calculateNumarAngajati = () => {
    return filteredAngajati.length;
  };

  const calculateTotalCas = () => {
    return filteredAngajati.reduce((totalCas, angajat) => {
      const cas = angajat.salBrut * 0.25; // Calculăm 25% din salBrut
      return totalCas + cas;
    }, 0);
  };
  const calculateTotalCass = () => {
    return filteredAngajati.reduce((totalCass, angajat) => {
      const cass = angajat.salBrut * 0.1; // Calculăm 25% din salBrut
      return totalCass + cass;
    }, 0);
  };
  const calculateTotalDeducerePersonala = () => {
    return filteredAngajati.reduce((totalDeducere, angajat) => {
      let deducere = 0;
      if (angajat.salBrut <= 4000) {
        deducere = 600;
      } else if (angajat.salBrut > 4000 && angajat.salBrut <= 5000) {
        deducere = 300;
      }
      return totalDeducere + deducere;
    }, 0);
  };
  const calculateTotalImpozitVenit = () => {
    return filteredAngajati.reduce((totalImpozit, angajat) => {
      const impozit = (angajat.salBrut - angajat.cas - angajat.cass) * 0.1;
      return totalImpozit + impozit;
    }, 0);
  };
  const calculateTotalSalariuNet = () => {
    let totalSalariuNet = 0;
    filteredAngajati.forEach((angajat) => {
      totalSalariuNet += angajat.salNet;
    });
    return totalSalariuNet;
  };

  const calculateTotalCAM = () => {
    return filteredAngajati.reduce((totalCAM, angajat) => {
      const cam = angajat.salBrut * 0.0225;
      return totalCAM + cam;
    }, 0);
  };

  const calculateTotalSalariuComplet = () => {
    return calculateTotalSalarii() + calculateTotalCAM();
  };

  const calculateTotalTaxeAngajat = () => {
    return (
      calculateTotalCas() + calculateTotalCass() + calculateTotalImpozitVenit()
    );
  };

  const calculateTotalTaxeAngajator = () => {
    return calculateTotalCAM();
  };

  const calculateTotalTaxeIncasate = () => {
    return calculateTotalTaxeAngajat() + calculateTotalTaxeAngajator();
  };

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Raport Taxe</Text>
          <Text style={styles.title}>Departament: {departamentSelectat}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Angajat</Text>
            <Text style={styles.tableHeaderText}>Lei</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>Salariu Brut</Text>
            <Text style={styles.tableRowText}>{calculateTotalSalarii()}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>
              Asigurari Sociale (CAS) - 25%
            </Text>
            <Text style={styles.tableRowText}>
              {calculateTotalCas(filteredAngajati)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>
              Asigurari Sociale de Sanatate (CASS) - 10%
            </Text>
            <Text style={styles.tableRowText}>
              {calculateTotalCass(filteredAngajati)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>Deducere personala (DP)</Text>
            <Text style={styles.tableRowText}>
              {calculateTotalDeducerePersonala(filteredAngajati)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>Impozit pe venit (IV) - 10%</Text>
            <Text style={styles.tableRowText}>
              {calculateTotalImpozitVenit(filteredAngajati)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>Salariu Net</Text>
            <Text style={styles.tableRowText}>
              {calculateTotalSalariuNet(filteredAngajati)}
            </Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Angajator</Text>
            <Text style={styles.tableHeaderText}>Lei</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>
              Contributie Asiguratorie pentru Munca (CAM) - 2.25%
            </Text>
            <Text style={styles.tableRowText}>
              {calculateTotalCAM(filteredAngajati)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>Salariu Complet</Text>
            <Text style={styles.tableRowText}>
              {calculateTotalSalariuComplet(filteredAngajati)}
            </Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>TOTAL TAXE</Text>
            <Text style={styles.tableHeaderText}>Lei</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>Angajatul plateste statului</Text>
            <Text style={styles.tableRowText}>
              {calculateTotalTaxeAngajat(filteredAngajati)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>
              Angajatorul plateste statului
            </Text>
            <Text style={styles.tableRowText}>
              {calculateTotalTaxeAngajator(filteredAngajati)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>Total taxe incasate de stat</Text>
            <Text style={styles.tableRowText}>
              {calculateTotalTaxeIncasate(filteredAngajati)}
            </Text>
          </View>
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

export default TabelTaxeSalarii;

/**
 *
 * 
 *  Loc obţinere: Contabilitate
Destinaţie: Contabilitate
Număr de exemplare: 1
Frecvenţa: lunar
Dispozitiv sau periferic de ieşire: 










 * 
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Nr.crt.</Text>
            <Text style={styles.tableHeaderText}>Indicator</Text>
            <Text style={styles.tableHeaderText}>2007</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>1</Text>
            <Text style={styles.tableRowText}>Salarii de baza</Text>
            <Text style={styles.tableRowText}>{calculateTotalSalarii()}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>2</Text>
            <Text style={styles.tableRowText}>Bonusuri</Text>
            <Text style={styles.tableRowText}>{calculateTotalBonusuri()}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>3</Text>
            <Text style={styles.tableRowText}>Beneficii</Text>
            <Text style={styles.tableRowText}>{calculateTotalBeneficii()}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>4</Text>
            <Text style={styles.tableRowText}>Fond de salarii</Text>
            <Text style={styles.tableRowText}>3921</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>5</Text>
            <Text style={styles.tableRowText}>C.A.S.</Text>
            <Text style={styles.tableRowText}>1093</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>6</Text>
            <Text style={styles.tableRowText}>Fond de şomaj</Text>
            <Text style={styles.tableRowText}>1863</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>Total cheltuieli salariale</Text>

            <Text style={styles.tableRowText}>{calculateNumarAngajati()}</Text>
          </View>
        </View>

        <Text>Sursa: Financiar</Text>
 */
