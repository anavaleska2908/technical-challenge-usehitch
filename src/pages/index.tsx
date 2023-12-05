import { signIn, useSession } from "next-auth/react";
import { Header } from "~/components/Header";
import { Button, Container, Typography } from "@mui/material";
import { useCallback } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const onSubmit = useCallback(async () => {
    await signIn("google", {callbackUrl: "/dashboard"})
  }, [])

  if (sessionData?.user) {
    router.push("/dashboard")
  }

  return (
    <>
      <Header />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}>
        <Typography variant="h3" sx={{marginBottom: 2, textAlign: "center"}}>
          Sign in to create your own To-Dos
        </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSubmit()}
          >
            Sign In
          </Button>
      </Container>
    </>
  );
}
