import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoUpdateSchema, TodoUpdateData } from "~/lib/schemas/TodoUpdateSchema";
import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Paper, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { TodoData } from "~/lib/schemas/TodoSchema";


export default function TodoUpdate() {
  const [updateData, setUpdateData] = useState<TodoUpdateData>({})
  const [getData, setGetData] = useState<TodoData | undefined>()

  const router = useRouter();
  const { id } = router.query;
  const idTodo = String(id);

  const fetchTodo = api.todo.getTodoById.useQuery(idTodo);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<TodoUpdateData>({
    resolver: zodResolver(TodoUpdateSchema)
  });

  const updateTodo = api.todo.update.useMutation();

  const formUpdateTodo = (data: TodoUpdateData) => {
    const newData = {
      id: idTodo,
      title: data?.title,
      image: data?.image,
      completed: data?.completed,
    }
    updateTodo.mutate(newData);
    fetchTodo.refetch();
    toast.success(`Your to-do ${newData.title} has been updated.`)
  }

  return (
    <>
      {fetchTodo.data && (
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
          Update To-Do
        </Typography>
        <form onSubmit={handleSubmit(formUpdateTodo)}>
          <Box sx={{ display: "flex", flexDirection: "column"}}>
            <TextField
            variant="outlined"
            margin="normal"
            size="small"
            defaultValue={fetchTodo.data?.title}
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            size="small"
            defaultValue={fetchTodo.data?.image}
            {...register("image")}
            error={!!errors.image}
            helperText={errors.image?.message}
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox {...register("completed")} defaultChecked={fetchTodo.data?.completed} onChange={(event) => setValue('completed', event.target.checked)}/>}
              label="Done"
            />
          </FormGroup>
          <Button type="submit" variant="contained" color="primary">Update</Button>
          </Box>
        </form>
      </Container>
      )}
    </>
  )
}
