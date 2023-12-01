import { api } from "~/utils/api";
import { TodoData, TodoSchema } from "~/lib/schemas/TodoSchema";
import { TodoCreateSchema } from "~/lib/schemas/TodoCreateSchema";
import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, Paper, TextField, Typography } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

export default function TodoList() {

  const { data: allTodos } = api.todo.getAll.useQuery();

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 3,
              marginTop: 2
            }}
          >
            List To-Dos
          </Typography>
          {allTodos?.length ? allTodos.map(({id, title, image, completed}: any) => {
        return (
          <>
            <Container key={id} sx={{ marginBottom: 4}}>
              <Paper elevation={2} variant="outlined">
                <Grid display="flex" justifyContent="center" sx={{ marginTop: 1, marginLeft: 1 }}>
                  {image ? <Avatar alt="Todo Image" src={image} /> : <Avatar alt="Initial Names">AV</Avatar>}
                  <Box sx={{
                    marginRight: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingLeft: 2
                    }}>
                    <TextField
                    id="outlined-size-small"
                    label="To-do Title"
                    sx={{ marginTop: 1}}
                    fullWidth
                    defaultValue={title}
                    size="small"
                    />
                    <Box sx={{
                    marginRight: 1,
                      display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 2
                    }}>

                  <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked={completed} sx={{ '&:hover': { bgcolor: 'transparent' }}} color="success"  />}
                    label="Done"
                  />
                </FormGroup>
                <Button sx={{color: "text.primary"}}><DeleteOutlinedIcon /></Button>
                <Button sx={{color: "text.primary"}}><CreateOutlinedIcon /></Button>
                    </Box>
                  </Box>
                </Grid>
              </Paper>

            </Container>
          </>
        )
      }) : (
          <Container>
            <Typography
              variant="h6"
              component="h1"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}>Create your first to-do...</Typography>
          </Container>
      )
      }
        </Box>

      </Container>


    </>
  )
}
