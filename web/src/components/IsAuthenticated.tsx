import { gql, useQuery } from "@apollo/client";
import React from "react";
import { redirect } from "react-router-dom";

export const IS_LOGGED_IN = gql`
  {
    me {
      id
    }
  }
`;

interface Props {
  children?: React.ReactNode;
}

function IsAuthenticated({ children }: Props) {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  if (!data.me) {
    return <>{redirect("/login")}</>;
  }

  return <>{children}</>;
}

export default IsAuthenticated;
