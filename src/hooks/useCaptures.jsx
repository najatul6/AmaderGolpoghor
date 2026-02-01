import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

const useCaptures = () => {
  const secureAxios = useSecureAxios();

  const {
    data: captures = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["captures"],
    queryFn: async () => {
      const res = await secureAxios.get("/admin/captures");
      return res.data;
    },
  });
  return [captures, refetch, isLoading];
};

export default useCaptures;