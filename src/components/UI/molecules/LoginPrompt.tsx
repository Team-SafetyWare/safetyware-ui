import { FetchResult, useQuery } from "@apollo/client";
import { Divider, TextField } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { default as React, useCallback, useState } from "react";
import Logo from "../../../assets/logo.png";
import { setCurrentUser, setToken, User } from "../../../index";
import { GET_USERS, LoginData, useLogin } from "../../../util/queryService";
import { LoginButton } from "../atoms/LoginButton";
import { useHistory } from "react-router-dom";

interface Creds {
  email: string;
  password: string;
}

const useStyles = makeStyles({
  loginBox: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
  },

  loginDiv: {
    display: "flex",
    flexDirection: "column",
  },

  loginOptionDivider: {
    color: "white",
    marginBottom: "24px",
    marginTop: "24px",

    "&::before": {
      borderColor: "white",
    },

    "&::after": {
      borderColor: "white",
    },
  },

  inputLabel: {
    color: "white",

    "&.Mui-focused": {
      color: "white",
    },
  },

  input: {
    backgroundColor: "#901324",
    borderRadius: "4px",
    color: "white",

    "& .MuiOutlinedInput-notchedOutline": {
      border: "0px",
    },
  },
});

export const LoginPrompt: React.FC = () => {
  const styles = useStyles();

  // eslint-disable-next-line prefer-const
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const { data: usersData } = useQuery(GET_USERS);
  let users: User[] = usersData?.userAccounts ?? [];
  users = Array.from(users).sort((a, b) => (a.name > b.name ? 1 : -1));

  const [login] = useLogin();
  const history = useHistory();

  const loginSuccess = useCallback(
    (user: User, result: FetchResult<LoginData>) => {
      const token =
        result.data?.login ??
        (() => {
          throw new Error("token missing");
        })();
      setCurrentUser(user);
      setToken(token);
      history.push("/dashboard");
    },
    [history]
  );

  const loginFailed = useCallback(() => {
    setInvalidCredentials(true);
  }, []);

  const attemptLogin = useCallback(
    (creds: Creds | undefined = undefined) => {
      console.log(email);
      console.log(password);
      console.log(users);
      const user = users.find((u) => u.email === (creds?.email ?? email));
      console.log(user);
      if (!user) {
        loginFailed();
      } else {
        login({
          variables: {
            userAccountId: user.id,
            password: creds?.password ?? password,
          },
        }).then((result) => loginSuccess(user, result), loginFailed);
      }
    },
    [users, loginSuccess, loginFailed, email, password]
  );

  const onDemoUserLogin = useCallback(() => {
    if (users.length == 0) {
      alert(
        "Users did not load. Please refresh, wait a moment, and try again."
      );
    } else {
      // Assume demo account is the first in users and has no password.
      const user = users[0];
      attemptLogin({ email: user.email, password: "" });
    }
  }, [users, attemptLogin]);

  const emailSelectLabel = "Email";
  const passwordSelectLabel = "Password";

  const helperText = invalidCredentials
    ? "Incorrect email or password."
    : undefined;

  const loading = users.length === 0;

  return (
    <StyledEngineProvider injectFirst>
      <Box className={styles.loginBox}>
        <div className={styles.loginDiv}>
          <img src={Logo} alt="SafetyWare" />
          <LoginButton
            text="Log In with Demo Account"
            onClick={onDemoUserLogin}
            loading={loading}
          />
          <Divider className={styles.loginOptionDivider}>OR</Divider>
          <TextField
            className={styles.input}
            type="text"
            label={emailSelectLabel}
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={helperText}
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
            FormHelperTextProps={{
              style: { color: "white" },
            }}
          />
          <div style={{ height: "24px" }} />
          <TextField
            className={styles.input}
            type="password"
            label={passwordSelectLabel}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={helperText}
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
            FormHelperTextProps={{
              style: { color: "white" },
            }}
          />
          <LoginButton text="Log In" onClick={attemptLogin} loading={loading} />
        </div>
      </Box>
    </StyledEngineProvider>
  );
};
