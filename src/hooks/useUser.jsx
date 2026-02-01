import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";
import useAuth from "./useAuth";

const useUser = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();

  const {
    data: DBuser,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["DBuser", user?.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  return [DBuser, refetch, isLoading];
};

export default useUser;