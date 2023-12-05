'use client'
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { TodoUpdateData } from "~/lib/schemas/TodoUpdateSchema";
import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TodoData } from "~/lib/schemas/TodoSchema";
import { useSession } from "next-auth/react";
import {Header} from "~/components/Header";
import Image from "next/image";
import { toBase64 } from "~/utils/toBase64";
import Link from "next/link";


export default function TodoUpdate() {
  const { data: sessionData } = useSession();
  const [base64, setBase64] = useState<any>(null);

  const router = useRouter();
  const { id } = router.query;
  const idTodo = String(id);

  const fetchTodo = api.todo.getTodoById.useQuery(idTodo);
  const updateTodo = api.todo.update.useMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<TodoUpdateData>();

  const formUpdateTodo = async (data: any) => {
    if (data.image) {
      const base64 = await toBase64(data?.image[0] as unknown as File);
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
          title: data?.title,
          completed: data?.completed,
          image: imageUrl ?? fetchTodo.data?.image,
          id: idTodo
        }

        updateTodo.mutate(newData);
        router.push("/dashboard")

      } catch (error) {
        console.log(error);
      }
    }

      const newData = {
        title: data?.title,
        completed: data?.completed,
        image: fetchTodo.data?.image as string,
        id: idTodo
      }

      updateTodo.mutate(newData);
      router.push("/dashboard")
    }
  useEffect(() => {
    if (!sessionData?.user) {
      router.push("/")
    }
  }, [])

  return (
    <>
      <Header />
      {fetchTodo.data && (
        <Container component="main" maxWidth="xs">
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
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
            <Link href={"/dashboard"}>
              <Button variant="contained" color="primary">
                Voltar
              </Button>
            </Link>
          </Box>
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
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
            />
            <Image src={fetchTodo.data.image ?? ""} width={120} height={70} alt="Uploaded Image"/>
          </Box>
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
