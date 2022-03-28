import { FetchResult, useQuery } from "@apollo/client";
import { Divider, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { default as React, useCallback, useState } from "react";
import Logo from "../../../assets/logo.png";
import { setCurrentUser, setToken, User } from "../../../index";
import { GET_USERS, LoginData, useLogin } from "../../../util/queryService";
import { LoginButton } from "../atoms/LoginButton";
import { useHistory } from "react-router-dom";

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
  const [user, setUser] = useState<User>({} as User);
  const [password, setPassword] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState(false);

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
      history.push("/home");
    },
    [history]
  );

  const loginFail = useCallback(() => {
    setIncorrectPassword(true);
  }, []);

  const onLogInClick = useCallback(() => {
    login({
      variables: {
        userAccountId: user.id,
        password: password,
      },
    }).then((result) => loginSuccess(user, result), loginFail);
  }, [users, loginSuccess]);

  const onLogInDemoClick = useCallback(() => {
    if (users.length == 0) {
      alert(
        "Users did not load. Please refresh, wait a moment, and try again."
      );
    }
    // Assume demo account is the first in users.
    const user = users[0];
    login({
      variables: {
        userAccountId: user.id,
        password: "",
      },
    }).then((result) => loginSuccess(user, result), loginFail);
  }, [users, loginSuccess]);

  const userSelectLabel = "User";
  const passwordSelectLabel = "Password";
  const isLoading = users.length === 0;

  return (
    <StyledEngineProvider injectFirst>
      <Box className={styles.loginBox}>
        <div className={styles.loginDiv}>
          <img src={Logo} alt="SafetyWare" />
          <LoginButton
            text="Log In with Demo Account"
            onClick={onLogInDemoClick}
            loading={isLoading}
          />
          <Divider className={styles.loginOptionDivider}>OR</Divider>
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel className={styles.inputLabel}>
              {userSelectLabel}
            </InputLabel>
            <Select
              label={userSelectLabel}
              className={styles.input}
              onChange={(e) => setUser(e.target.value as User)}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user as any}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div style={{ height: "24px" }} />
          <TextField
            className={styles.input}
            type="password"
            label={passwordSelectLabel}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={incorrectPassword ? "Incorrect password." : ""}
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
          <LoginButton
            text="Log In"
            onClick={onLogInClick}
            loading={isLoading}
          />
        </div>
      </Box>
    </StyledEngineProvider>
  );
};
