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

  const [account, setAccount] = useState("");

  const { data: userAccountsData } = useQuery(GET_USER_ACCOUNTS);
  const userAccounts = userAccountsData?.userAccounts ?? [];

  const handleChange = (event: SelectChangeEvent<any>) => {
    setAccount(event.target.value);
  };

  return (
    <Box className={styles.loginBox}>
      <div className={styles.loginDiv}>
        <img src={Logo} alt="Blackline Safety" />
        <FormControl fullWidth>
          <InputLabel>Select account</InputLabel>
          <Select value={account} onChange={handleChange}>
            {userAccounts.map((account: any) => (
              <MenuItem key={account.id} value={account.name}>
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
