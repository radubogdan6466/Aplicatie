import React, { useEffect, useState, useContext } from "react";
import { Typography, Box, styled, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { blue } from "@mui/material/colors";
import { API } from "../../service/api";
import EditIcon from "@mui/icons-material/Edit";

import LaunchIcon from "@mui/icons-material/Launch";
const Component = styled(Box)`
  margin-top: 30px;
  background: #f5f5f5;
  padding: 10px;
`;
const StyledButton = styled(Button)`
  margin: 0 8px;
  padding: 12px 24px;
  font-size: 16px;
`;
const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  margin-right: 20px;
`;

const StyledDate = styled(Typography)`
  font-size: 14px;
  color: #878787;
`;

const DeleteIcon = styled(Delete)`
  margin-left: auto;
`;

const Tichete = () => {
  const [tichete, setTichete] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await API.getAllTichete();
      if (response.isSuccess) {
        setTichete(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const stergeTichet = async (tichetId) => {
    await API.deleteTichet(tichetId);
    setTichete((prevTichet) =>
      prevTichet.filter((tichet) => tichet._id !== tichetId)
    );
  };
  return (
    <Box>
      {tichete.map((tichet) => {
        if (tichet.status === "Rezolvat" || tichet.status === "Respins") {
          return null; // Nu afișa tichetul
        }
        return (
          <Component key={tichet._id}>
            <Container>
              <Typography>Trimis de:&nbsp;&nbsp; </Typography>
              <Name> {tichet.name}</Name>
            </Container>
            <Container>
              <Typography>Data:&nbsp;&nbsp; </Typography>
              <StyledDate>{new Date(tichet.date).toDateString()}</StyledDate>
            </Container>

            <Container>
              <Typography>Status:&nbsp;&nbsp;</Typography>
              <Typography sx={{ color: blue[500] }}>{tichet.status}</Typography>
            </Container>

            <Container>
              <Typography>Cerere:&nbsp;&nbsp; </Typography>
              <Typography>{tichet.tipCerere}</Typography>
            </Container>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/vizualizare-tichete/tichet/${tichet._id}`}
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
            <DeleteIcon onClick={() => stergeTichet(tichet._id)} />
          </Component>
        );
      })}
    </Box>
  );
};

export default Tichete;
