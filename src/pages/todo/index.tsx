'use client'
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoCreateData, TodoCreateSchema } from "~/lib/schemas/TodoCreateSchema";
import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, ImageList, Input, LinearProgress, TextField, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import {Header} from "~/components/Header";
import Link from "next/link";
import { Image } from "@mui/icons-material";
import { useEffect, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from "next/router";
import { toBase64 } from "~/utils/toBase64";

export default function TodoCreate() {
  const [base64, setBase64] = useState<string | null>(null);

  const createTodo = api.todo.create.useMutation();

  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!sessionData?.user) {
      router.push("/")
    }
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    // resolver: zodResolver(TodoCreateSchema)
  });



  const formAddTodo = async (data: any) => {
    const base64 = await toBase64(data.image[0] as unknown as File);
    setBase64(base64 as string);

    const formData = new FormData();
    formData.append("file", base64 as string);
    formData.append("upload_preset", "technicalChallengeUsehitch");
    formData.append("cloud_name", "anavaleskasantos");
    try {
      const uploadResponse = await fetch("https://api.cloudinary.com/v1_1/anavaleskasantos/image/upload", {
        method: "POST",

        body: formData
      });

      if (!uploadResponse.ok) {
        throw new Error("Image upload failed.")
      }

      const imageData = await uploadResponse.json();
      const imageUrl = imageData.secure_url;

      const newData = {
        title: data.title,
        completed: data.completed,
        image: imageUrl
      }

      createTodo.mutate(newData);
      reset();
      toast.success(`Your new to-do ${newData.title} has been created.`)
      router.push("/dashboard")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs" sx={{marginTop: 4}}>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
          <Typography
            variant="h5"
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
          <Link href={"/dashboard"}>
            <Button variant="contained" color="primary">
              Voltar
            </Button>
          </Link>
        </Box>

        <form onSubmit={handleSubmit(formAddTodo)}>
          <Box sx={{ display: "flex", flexDirection: "column"}}>
            <TextField
            label="Title"
            variant="outlined"
            margin="normal"
            size="small"
            {...register("title", {required: true})}
            error={!!errors.title}
            // helperText={errors.title?.message}
          />
          <input
            type="file"
            accept="image/*"
            {...register("image")}
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox {...register("completed")} />}
              label="Done"
            />
            </FormGroup>
            <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
          </Box>
        </form>
      </Container>
    </>
  )
}
