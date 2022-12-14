import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useAuth = ({ redirectTo }) => {
  const { push } = useRouter();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      setUser(currentUser);
      return;
    }

    push(redirectTo);
  }, []);

  return {
    user,
  };
};

export default useAuth;
