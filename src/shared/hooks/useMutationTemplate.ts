import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { postData } from "~/shared/network/api";

interface ParamType {
  sample: string;
}

const useMutationCreateS102Data = (arg: ParamType) => {
  const queryClient = useQueryClient();
  const createS102DataMutation = useMutation(() => postData("s102/", arg), {
    onSuccess: () => {
      toast.success("Successfully created ISO 102 data");
      queryClient.invalidateQueries("iso_102").catch(() => {
        console.log("Error: useMutationCreateS102Data.ts");
      });
    },
  });

  return createS102DataMutation;
};

export default useMutationCreateS102Data;
