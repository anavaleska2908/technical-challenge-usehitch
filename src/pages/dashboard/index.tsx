'use client'
import { api } from "~/utils/api";
import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, Paper, TextField, Typography } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Link from "next/link";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {Header} from "~/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';


export default function TodoList() {
  const router = useRouter()
  const { data: sessionData } = useSession();
  const [data, setData] = useState<any>([]);
  const [deletedTodo, SetDeletedTodo] = useState<any>();

  const refreshData = () => router.replace(router.asPath);
  const allTodos = api.todo.getAll.useQuery();

  useEffect(() => {
    setData(allTodos.data);
    allTodos.refetch()
    refreshData()

    if (!sessionData?.user) {
      router.push("/")
    }
  }, [deletedTodo])

  const deleteTodo = api.todo.deleteTodo.useMutation();

  const handleDeleteTodo = (id: string) => {
    deleteTodo.mutate(id)
    SetDeletedTodo(id)
    toast.warning("To-do deleted.")
  }

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
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
            <Link href={"/todo/"}>
              <Button sx={{color: "text.primary"}}>
                <AddCircleOutlineOutlinedIcon sx={{ width: "2.5rem", height: "2.5rem"}} />
              </Button>
            </Link>
          </Box>

          {allTodos.data?.length ? allTodos.data.map((todo: any) => (
            <Container key={todo.id} sx={{ marginBottom: 4}}>
              <Paper elevation={0} variant="outlined">
                <Grid display="flex" justifyContent="center" sx={{ marginTop: 1, marginLeft: 1 }}>
                  {todo.image ? <Avatar alt="Todo Image" src={todo.image} /> : <Avatar alt="Initial Names">AV</Avatar>}
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
                      defaultValue={todo.title}
                      size="small"
                      disabled
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
                      control={<Checkbox defaultChecked={todo.completed} sx={{ '&:hover': { bgcolor: 'transparent' }}} color="success" disabled />}
                      label="Done"
                    />
                  </FormGroup>
                  <Button sx={{color: "text.primary"}} onClick={() => handleDeleteTodo(todo.id)}>
                    <DeleteOutlinedIcon />
                  </Button>
                  <Link href={`/todo/${todo.id}`}>
                    <Button sx={{color: "text.primary"}}>
                      <CreateOutlinedIcon />
                    </Button>
                  </Link>
                    </Box>
                  </Box>
                </Grid>
              </Paper>
            </Container>
          )) : (
          <Container
            sx={{display: "flex", justifyContent: "center",  alignItems: "center"}}>
            <Typography
              variant="h6"
              component="h1"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
                  }}>Create your first to-do</Typography>
          </Container>
      )}
        </Box>
      </Container>
    </>
  )
}
