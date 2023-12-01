// import { api } from "~/utils/api";
// import { toast } from "react-toastify";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { TodoCreateSchema } from "~/lib/schemas/TodoCreateSchema";
// import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, Paper, Stack, TextField } from "@mui/material";
// import { useState, useEffect, SetStateAction } from "react";
// import { TodoListSchema } from "~/lib/schemas/TodoSchema";


// type UserIdProp = {
//   userId: string
// }

// type UseStateTodosProps = {
//   setTodos: React.Dispatch<SetStateAction<TodoListSchema>>
// }

// export default function TodoEditor({setCreateTodo, getTodoList}: any) {
//   // console.log("userId", userId)
//   const createTodo = api.todo.create.useMutation({
//     onSuccess: (data) => {
//       console.log("Mutation success", data)
//     },
//     onError: (error) => {
//       console.log("Mutation error", error)
//     }
//   });


//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<TodoCreateSchema>({
//     resolver: zodResolver(TodoCreateSchema)
//   });

//   const formAddTodo = (data: TodoCreateSchema) => {
//     console.log("oi")
//     console.log("todoDataFormAdd", data)
//     const newData = {
//       title: data.title,
//       image: data?.image,
//       completed: data?.completed,
//     }

//     console.log("todoNewDataFormAdd", newData)

//     createTodo.mutate(newData);

//     setCreateTodo(newData);
//     getTodoList();
//   }

//   return (
//     <>
//       <Container component="main" maxWidth="xs" >
//         <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//           <Paper elevation={0} variant="outlined" square={false}>
//             <Grid display="flex" justifyContent="center" sx={{marginTop: 1, marginLeft: 1}}>
//             <Box sx={{
//               marginRight: 1,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               paddingLeft: 2
//             }}>
//               <Stack component="form" onSubmit={handleSubmit(formAddTodo)}>
//                 <FormGroup sx={{ marginRight: 2}}>
//                   <TextField
//                         id="outlined-size-small"
//                         label="To-do Title"
//                         sx={{ marginTop: 1}}
//                         fullWidth
//                         {...register("title")}
//                         size="small"
//                       />
//                   <TextField
//                         id="outlined-size-small"
//                         label="To-do Image"
//                         sx={{ marginTop: 1}}
//                         fullWidth
//                         {...register("image")}
//                         size="small"
//                       />
//                   <Button variant="outlined" size="small" sx={{color: "text.primary", marginTop: 2, marginBottom: 2}}>Enviar</Button>

//               </FormGroup>
//               </Stack>

//             </Box>
//           </Grid>
//           </Paper>
//         </Grid>
//       </Container>
//       {/* <div>
//         <form onSubmit={handleSubmit(formAddTodo)}>
//           <input
//             placeholder="Title"
//             type="text"
//             id="title"
//             {...register("title")}
//           />
//           {errors.title && <span>{errors.title.message}</span>}

//           <input
//             placeholder="Image"
//             type="text"
//             {...register("image")}
//             id="image"
//           />
//           {errors.image && <span>{errors.image.message}</span>}

//           <input
//             placeholder="Completed"
//             type="checkbox"
//             {...register("completed")}
//             id="completed"
//           />
//           <button>Create</button>
//         </form>
//       </div> */}
//     </>
//   )
// }
