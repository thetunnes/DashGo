import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "../api";


type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

type GetUsersResponseProps = {
  totalCount: number;
  users: User[]
}

export async function getUsers(page: number): Promise<GetUsersResponseProps> {
  const { data, headers } = await api.get("/users", {
    params: {
      page,
    }  
  });

  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.created_at).toLocaleDateString("pt-Br", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  console.log(users);
  return {
    users,
    totalCount
  } ;
}

export function useUsers(page: number, options: UseQueryOptions) {
  return useQuery(["users", { page }], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options
  });
}
