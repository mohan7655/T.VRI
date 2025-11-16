"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginDialog() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (login(username, password)) {
      // Success! The dialog will close automatically
      // because the parent component will re-render.
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    // The dialog is always "open" because it's only rendered
    // when the user is *not* authenticated.
    <Dialog
      open={true}
      slotProps={{
        paper: { sx: { borderRadius: { xs: 5, sm: 5 } } },
      }}
    >
      <DialogTitle>Authentication Required</DialogTitle>
      <DialogContent>
        <Typography variant="body2" gutterBottom>
          Please enter oldstudent credentials to view this page.
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={error}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
          helperText={error ? "Invalid username or password." : ""}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleLogin}>Login</Button>
      </DialogActions>
      <DialogActions>
        <Button onClick={handleCancel} color="red">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
