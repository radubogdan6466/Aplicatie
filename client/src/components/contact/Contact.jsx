import React from "react";
import { Container, Box, styled, Typography } from "@mui/material";

const Text = styled(Typography)`
  color: #878787;
`;

const Contact = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" component="h1" align="center" mb={4}>
          Contact
        </Typography>
        <Typography variant="body1" align="center" mb={4}>
          Nume: Radu Cristian Bogdan
          <br />
          Adresă: Timișoara, strada Constantin Stere nr. 10B
          <br />
          Telefon: 0735 468 383
          <br />
          Email: radubogdan6466@gmail.com
        </Typography>
      </Box>
    </Container>
  );
};

export default Contact;
