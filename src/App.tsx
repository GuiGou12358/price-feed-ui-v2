import * as React from "react";
import Container from "@mui/material/Container";
import {ContentHeader} from "./components/ContentHeader";
import {Content} from "./components/Content";
import {AppHeader} from "./components/AppHeader";
import {AppMenu} from "./components/AppMenu";
import {Box, Grid} from "@mui/material";
import './assets/style.css';
import {ContractProvider} from "./context/ContractProvider";

export default function App() {
  return (
    <ContractProvider>
      <Container sx={{pt:2}} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <AppHeader />
          </Grid>
          <Grid item xs={3} sx={{margin:'auto'}}>
            <Box> <AppMenu /></Box>
          </Grid>
          <Grid item xs={12}>
            <ContentHeader />
            <Content />
          </Grid>
        </Grid>
      </Container>
    </ContractProvider>
  );
}
