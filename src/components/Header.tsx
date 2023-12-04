"use client"
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { authOptions } from "~/server/auth";

import type { NextPage } from "next";
// import { requireAuth } from "~/server/requireAuth";

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  id?: string | null | undefined;
} | undefined

type Props = {
  user?: User
}

// export const getServerSideProps = requireAuth(async (ctx) => {
//   return { props: {}}
// })

export const Header: NextPage = () => {
  const { data: session } = useSession();
  // const sessionData = await getServerSession(authOptions);

  return (
    <>
      {session?.user ? (
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

            <Typography variant="h6" >
              Hello, {session?.user.name}
            </Typography>
            {/* <div className="my-4 bg-gray-700 rounded-lg p-4">
              <pre>
                <code>{JSON.stringify(session, null, 2)}</code>
              </pre>
            </div> */}
            {/* <Link href={"/"}> */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => signOut({ callbackUrl: "/"})}
              >
                Sign Out
              </Button>
            {/* </Link> */}
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

          <Typography variant="h6" >
            To-Do App
          </Typography>
          </Toolbar>
        </AppBar>
      )}
    </>
  )
}
