import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { Card, Title, Input, Button, FlexBox, FlexBoxAlignItems, FlexBoxJustifyContent } from "@ui5/webcomponents-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <FlexBox
      style={{ height: "100vh" }}
      justifyContent={FlexBoxJustifyContent.Center}
      alignItems={FlexBoxAlignItems.Center}
    >
      <Card style={{ width: "360px", padding: "1.5rem" }}>
        <Title level="H4">Login</Title>
        <Input
          placeholder="Username"
          value={username}
          style={{ marginTop: "1rem" }}
          onInput={(e: any) => setUsername(e.target.value)}
        />
        <Input
          type="Password"
          placeholder="Password"
          value={password}
          style={{ marginTop: "1rem" }}
          onInput={(e: any) => setPassword(e.target.value)}
        />
        <Button design="Emphasized" style={{ marginTop: "1.5rem" }} onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </FlexBox>
  );
}
