import React from "react";
import { gql, useQuery } from "@apollo/client";

const USERS_QUERY = gql`
  query USERS_QUERY {
    users {
      id
      name
      email
    }
  }
`;

type userType = {
  id: string;
  name: string;
  email: string;
};

const Users = () => {
  const { loading, error, data } = useQuery(USERS_QUERY);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <div>Users</div>
      <div>
        {data.users.map((user: userType) => (
          <p key={user.id}>{user.email}</p>
        ))}
      </div>
    </>
  );
};

export default Users;
