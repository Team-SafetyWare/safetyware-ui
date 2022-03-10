import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import { LoginButton } from "../atoms/LoginButton";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../../util/queryService";
import MenuItem from "@mui/material/MenuItem";
import { setCurrentUser } from "../../../index";

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
});

export const LoginPrompt: React.FC = () => {
  const styles = useStyles();

  // eslint-disable-next-line prefer-const
  let [user, setUser]: [any, any] = useState("");

  const { data: usersData } = useQuery(GET_USERS);
  let users = usersData?.userAccounts ?? [];
  users = Array.from(users).sort().reverse();

  const setAndStoreUser = (user: any) => {
    setUser(user);
    setCurrentUser(user);
  };

  if (user === "" && users.length > 0) {
    user = users[0];
    setAndStoreUser(user);
  }

  const selectLabel = "User";

  const handleChange = (event: SelectChangeEvent<any>) => {
    setAndStoreUser(event.target.value);
  };

  return (
    <Box className={styles.loginBox}>
      <div className={styles.loginDiv}>
        <img src={Logo} alt="Blackline Safety" />
        <FormControl fullWidth>
          <InputLabel>{selectLabel}</InputLabel>
          <Select label={selectLabel} value={user} onChange={handleChange}>
            {users.map((user: any) => (
              <MenuItem key={user.id} value={user}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LoginButton />
      </div>
    </Box>
  );
};
