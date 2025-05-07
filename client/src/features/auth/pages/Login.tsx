import { Card, Container, Input, Stack, VStack } from "@chakra-ui/react";
import { Field } from "../../../components/ui/field";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { LoginInputType } from "../types";
import { Link } from "react-router-dom";

const Login = () => {
  const initalState: LoginInputType = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState<LoginInputType>(initalState);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <Container maxW="container.sm" minHeight={"80vh"} display={"flex"}>
      <Card.Root
        width={"lg"}
        minWidth={"xs"}
        maxW="xl"
        margin={"auto"}
        marginY={"auto"}
      >
        <Card.Header>
          <Card.Title>Login</Card.Title>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field label="Email*" invalid={authError ? true : false}>
              <Input
                placeholder="Enter Your Email"
                name="email"
                outlineColor={"#5D3FD3"}
              />
            </Field>
            <Field label="Password*" invalid={authError ? true : false}>
              <Input
                placeholder="Enter Your Password"
                name="password"
                outlineColor={"#5D3FD3"}
              />
            </Field>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent={"space-between"}>
          <Button variant="outline" color={"#5D3FD3"}>
            <Link to="/auth/register">Register</Link>
          </Button>
          <Button
            type="submit"
            loading={isLoading}
            loadingText="Logging in..."
            variant="solid"
            bg={"#5D3FD3"}
          >
            Login
          </Button>
        </Card.Footer>
      </Card.Root>
    </Container>
  );
};

export default Login;
