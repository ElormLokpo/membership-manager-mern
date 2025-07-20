import { ClipLoader } from "react-spinners";

interface ILoader {
  loading: boolean;
}

const color = "#ffffff";

export const Loader = ({ loading = true }: ILoader) => {
  return (
    <ClipLoader
      color={color}
      loading={loading}
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
