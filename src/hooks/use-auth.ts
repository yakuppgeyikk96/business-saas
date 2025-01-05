import { useGetCurrentUserQuery } from "@/services/authApi";
import { useAppSelector } from "@/store";
import { selectIsAuthenticated } from "@/store/auth/selectors";
import { useLocation } from "react-router-dom";

const useAuth = () => {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const { isLoading } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  return { isAuthenticated, isLoading, locationState: location.state };
};

export default useAuth;
