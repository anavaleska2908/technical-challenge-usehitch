// pages/index.js
import { PrismaClient } from '@prisma/client';
import React from "react";

export default function Home({ users }: any) {
  return (
    <div>
      <h1>Users:</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return {
    props: {
      users,
    },
  };
}
