import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoCreateData, TodoCreateSchema } from "~/lib/schemas/TodoCreateSchema";
import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Paper, Stack, TextField, Typography } from "@mui/material";

export default function TodoCreate() {
  console.log("entrou")
  const createTodo = api.todo.create.useMutation({
    onSuccess: (data) => {
      console.log("Mutation success", data)
    },
    onError: (error) => {
      console.log("Mutation error", error)
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TodoCreateData>({
    resolver: zodResolver(TodoCreateSchema)
  });

  const formAddTodo = (data: TodoCreateData) => {
    const newData = {
      title: data.title,
      image: data?.image,
      completed: data?.completed,
    }
    createTodo.mutate(newData);

    toast.success(`Your new to-do ${newData.title} has been created.`)
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Typography
          variant="h4"
          component="h1"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          Create a New To-Do
        </Typography>
        <form onSubmit={handleSubmit(formAddTodo)}>
          <Box sx={{ display: "flex", flexDirection: "column"}}>
            <TextField
            label="Title"
            variant="outlined"
            margin="normal"
            size="small"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            label="Image"
            variant="outlined"
            margin="normal"
            size="small"
            {...register("image")}
            error={!!errors.image}
            helperText={errors.image?.message}
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox {...register("completed")} />}
              label="Done"
            />
          </FormGroup>
          <Button type="submit" variant="contained" color="primary">Create</Button>
          </Box>
        </form>
      </Container>
    </>
  )
}
