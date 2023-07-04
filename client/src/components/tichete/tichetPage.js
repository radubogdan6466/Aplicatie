import React, { useState, useEffect, useContext } from "react";
import { Box, styled, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { API } from "../../service/api";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  margin-top: 30px;
  background: #f5f5f5;
  padding: 10px;
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
const StyledButton = styled(Button)`
  margin: 0 8px;
  padding: 12px 24px;
  font-size: 16px;
`;

const ViewTichet = () => {
  const [tichet, setTichet] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTichet = async () => {
      try {
        const response = await API.getTichetById(id);
        if (response.isSuccess) {
          setTichet(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTichet();
  }, [id]);

  const stergeTichet = async (tichetId) => {
    await API.deleteTichet(tichetId);
    navigate("/vizualizare-tichete");

    // Redirecționează utilizatorul la pagina cu lista de tichete
    // după ștergerea tichetului
  };

  if (!tichet) {
    return <div>Loading...</div>;
  }

  const updateTichet = () => {
    navigate(`/vizualizare-tichete/tichet/actualizare/${tichet._id}`);
  };
  return (
    <Box>
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
        <Container>
          <Typography>Mesaj:&nbsp;&nbsp; </Typography>
        </Container>
        <Container>
          <Typography>{tichet.mesaj}</Typography>
        </Container>
        <StyledButton variant="outlined" color="success" onClick={updateTichet}>
          <EditIcon />
          Raspunde
        </StyledButton>
        <DeleteIcon onClick={() => stergeTichet(tichet._id)} />
      </Component>
    </Box>
  );
};

export default ViewTichet;
