import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import { LoginButton } from "../atoms/LoginButton";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useQuery } from "@apollo/client";
import { GET_USER_ACCOUNTS } from "../../../util/queryService";
import MenuItem from "@mui/material/MenuItem";
import { Abc } from "@mui/icons-material";

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
  let [account, setAccount]: [any, any] = useState("");

  const { data: userAccountsData } = useQuery(GET_USER_ACCOUNTS);
  let userAccounts = userAccountsData?.userAccounts ?? [];
  userAccounts = Array.from(userAccounts).sort().reverse();

  const setAndStoreAccount = (account: any) => {
    setAccount(account);
    localStorage.setItem("user_account_id", account.id);
  };

  if (account === "" && userAccounts.length > 0) {
    account = userAccounts[0];
    setAndStoreAccount(account);
  }

  const selectLabel = "Account";

  const handleChange = (event: SelectChangeEvent<any>) => {
    setAndStoreAccount(event.target.value);
  };

  return (
    <Box className={styles.loginBox}>
      <div className={styles.loginDiv}>
        <img src={Logo} alt="Blackline Safety" />
        <FormControl fullWidth>
          <InputLabel>{selectLabel}</InputLabel>
          <Select label={selectLabel} value={account} onChange={handleChange}>
            {userAccounts.map((account: any) => (
              <MenuItem key={account.id} value={account}>
                {account.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LoginButton />
      </div>
    </Box>
  );
};
