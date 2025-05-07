import { Card, Container, Input, Stack, VStack } from "@chakra-ui/react";
import { Field } from "../../../components/ui/field";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { LoginInputType, RegisterInputType } from "../types";
import { Link } from "react-router-dom";

const Register = () => {
  const initalState: RegisterInputType = {
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState<RegisterInputType>(initalState);
  const [formErrors, setFormErrors] = useState<RegisterInputType>(initalState);
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
          <Card.Title>Register Your Account</Card.Title>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field
              label="Email*"
              invalid={formErrors.email.length > 0 ? true : false}
            >
              <Input
                placeholder="Enter Your Email"
                name="email"
                outlineColor={"#5D3FD3"}
              />
            </Field>
            <Field
              label="Password*"
              invalid={formErrors.password.length > 0 ? true : false}
            >
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
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button
            type="submit"
            loading={isLoading}
            loadingText="Signing up..."
            variant="solid"
            bg={"#5D3FD3"}
          >
            Register
          </Button>
        </Card.Footer>
      </Card.Root>
    </Container>
  );
};

export default Register;
