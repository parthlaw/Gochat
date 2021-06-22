import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { ContextProvider } from "../context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(ContextProvider);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};
export default PrivateRoute;
