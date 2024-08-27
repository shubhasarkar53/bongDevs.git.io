import { Avatar, Box, Container, Grid, Paper, Typography } from "@mui/material";

function Profile({userEmail}) {

    return (
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              <Grid item xs={12} display="flex" justifyContent="center">
                <Avatar
                  sx={{ width: 100, height: 100, bgcolor: "primary.main" }}
                  alt={userEmail}
                >
                  {userEmail && userEmail.charAt(0).toUpperCase()}
                </Avatar>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="h5" fontWeight="bold">
                  {userEmail || "User Name"}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      );
    }

export default Profile;
