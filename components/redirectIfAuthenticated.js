import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PropTypes from "prop-types";

const redirectIfAuthenticated = (WrappedComponent) => {
  const RequiresAuthentication = (props) => {
    const membership = useSelector(({ user }) => user.membership);
    const router = useRouter();

    useEffect(() => {
      // if a there isn't a logged in user and their membership has been set to "guest"
      // then redirect them to "/signin"
      if (membership !== "guest") router.push("/dashboard");
    }, [membership]);

    // if there's a loggedInUser, show the wrapped page, otherwise show a loading indicator
    return membership && membership === "guest" ? (
      <WrappedComponent {...props} />
    ) : (
      <div>Loading...</div>
    );
  };

  return RequiresAuthentication;
};

redirectIfAuthenticated.propTypes = {
  WrappedComponent: PropTypes.node.isRequired,
};

export default redirectIfAuthenticated;