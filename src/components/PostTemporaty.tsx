import * as React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostCreateSchema } from "~/lib/schemas/PostCreateSchema";
import { Chip, Container, Grid, Paper, Typography } from "@mui/material";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';


export default function PostTemporary() {
  const { mutate } = api.post.create.useMutation({
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
  } = useForm<PostCreateSchema>({
    resolver: zodResolver(PostCreateSchema)
  });

  const formAddPost = (data: PostCreateSchema) => {
    console.log("oi")
    console.log(data)



    mutate(data);
  }


  return (
    // <Container component="main" maxWidth="xs" >
    //   <Paper
    //     elevation={3}
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center"
    //     }}>
    //     <Chip
    //       icon={<ArticleOutlinedIcon />}
    //       label="Novo Post"
    //       color="primary"
    //       variant="outlined"
    //       sx={{
    //         marginTop: 4,
    //       }}
    //     />
    //     <Box
    //       sx={{
    //         marginTop: 8,
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center"
    //       }}
    //     >
    //       <Typography component="h1" variant="h5">
    //         Crie um post
    //       </Typography>
    //       <Box
    //         component="form"
    //         onSubmit={handleSubmit(formAddPost)}
    //         noValidate
    //       >
    //         <Grid container spacing={2}>
    //           <Grid item xs={12} sm={6}>
    //             <TextField
    //               autoComplete="given-name"
    //               required
    //               fullWidth
    //               id="firstName"
    //               label="Nome"
    //               autoFocus
    //               {...register("name")}
    //             />
    //           </Grid>
    //         </Grid>
    //       </Box>
    //     </Box>
    //   </Paper>
    // </Container>
    <div>
      <form onSubmit={handleSubmit(formAddPost)}>
        <input
          placeholder="Name"
          type="text"
          id="name"
          {...register("name")}
        />
        {errors.name && <span>{errors.name.message}</span>}

        <input
          placeholder="Text"
          type="text"
          {...register("text")}
          id="text"
        />
        {errors.text && <span>{errors.text.message}</span>}
        <button>Create</button>
      </form>
    </div>
  )
}
