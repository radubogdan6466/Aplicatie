import React, { useState, useContext, useEffect } from "react";
import { Typography, Box, styled } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { blue } from "@mui/material/colors";

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

const DeleteIcon = styled(Delete)`
  margin-left: auto;
`;

const TicheteRezolvate = () => {
  const [tichete, setTichete] = useState([]);
  const { account } = useContext(DataContext);

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

  const handleRemoveComment = async (tichetId) => {
    await API.deleteTichet(tichetId);
    setTichete((prevTichete) =>
      prevTichete.filter((tichet) => tichet._id !== tichetId)
    );
  };

  return (
    <Box>
      {tichete.map((tichet) => {
        if (tichet.status === "In asteptare") {
          return null; // Nu afișa tichetul
        }
        return (
          <Component key={tichet.id}>
            <Container>
              <Typography>Trimis de:&nbsp;&nbsp; </Typography>
              <Name> {tichet.name}</Name>
            </Container>
            <Container>
              <Typography>Data:&nbsp;&nbsp; </Typography>
              <StyledDate>{new Date(tichet.date).toDateString()}</StyledDate>
            </Container>
            <Container>
              <Typography>Status:&nbsp;&nbsp; </Typography>
              <Typography>{tichet.status}</Typography>
            </Container>
            <Container>
              <Typography>Mesaj:&nbsp;&nbsp; </Typography>
            </Container>
            <Container>
              <Typography>{tichet.mesaj}</Typography>
            </Container>
            <Container>
              <Typography>Raspuns:&nbsp;&nbsp; </Typography>
            </Container>
            <Container>
              <Typography sx={{ color: blue[500] }}>
                {tichet.raspuns}
              </Typography>
            </Container>
            {account.username === "admin" && (
              <DeleteIcon onClick={() => handleRemoveComment(tichet._id)} />
            )}
          </Component>
        );
      })}
    </Box>
  );
};

export default TicheteRezolvate;
