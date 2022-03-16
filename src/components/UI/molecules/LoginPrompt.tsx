import { useQuery } from "@apollo/client";
import { Divider } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { default as React, useState } from "react";
import Logo from "../../../assets/logo.png";
import { setCurrentUser, User } from "../../../index";
import { GET_USERS } from "../../../util/queryService";
import { LoginEmailButton } from "../atoms/LoginEmailButton";
import { LoginMicrosoftButton } from "../atoms/LoginMicrosoftButton";

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

  loginEmailSelectLabel: {
    color: "white",

    "&.Mui-focused": {
      color: "white",
    },
  },

  loginEmailSelect: {
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
  let [user, setUser] = useState<User>({} as User);

  const { data: usersData } = useQuery(GET_USERS);
  let users: User[] = usersData?.userAccounts ?? [];
  users = Array.from(users).sort((a, b) => (a.name > b.name ? 1 : -1));

  const setAndStoreUser = (user: User) => {
    setUser(user);
    setCurrentUser(user);
  };

  if (Object.keys(user).length === 0 && users.length > 0) {
    user = users[0];
    setAndStoreUser(user);
  }

  const selectLabel = "Email";

  const handleChange = (event: SelectChangeEvent<User>) => {
    setAndStoreUser(event.target.value as User);
  };

  return (
    <StyledEngineProvider injectFirst>
      <Box className={styles.loginBox}>
        <div className={styles.loginDiv}>
          <img src={Logo} alt="Blackline Safety" />
          <LoginMicrosoftButton />
          <Divider className={styles.loginOptionDivider}>OR</Divider>
          <FormControl sx={{ maxWidth: 300 }}>
            <InputLabel className={styles.loginEmailSelectLabel}>
              {selectLabel}
            </InputLabel>
            <Select className={styles.loginEmailSelect} onChange={handleChange}>
              {users.map((user) => (
                <MenuItem key={user.id} value={user as any}>
                  {user.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LoginEmailButton />
        </div>
      </Box>
    </StyledEngineProvider>
  );
};
