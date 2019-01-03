import * as React from "react";
import { Mutation } from "react-apollo";

import { Card, CardBody, Input, Button, Alert } from "../components/core";
import { LOGIN } from "../graphql/mutations";

export default class LoginPage extends React.Component<
  any,
  { email: string; password: string }
> {
  state = {
    email: "",
    password: ""
  };

  public render() {
    const { email, password } = this.state;

    return (
      <Mutation mutation={LOGIN}>
        {(login, { data, error, loading }) => {
          console.log("Error:", error);
          return (
            <div className="mt-16 mx-auto" style={{ width: 400 }}>
              {error && (
                <Alert
                  message={"Invalid email/password"}
                  error
                  className="mb-2"
                />
              )}
              <Card>
                <CardBody>
                  <Input
                    label="Email"
                    block
                    icon="far fa-envelope"
                    value={email}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      this.setState({ email: e.currentTarget.value });
                    }}
                  />
                  <Input
                    label="Password"
                    block
                    type="password"
                    icon="far fa-key"
                    className="mt-2"
                    value={password}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      this.setState({ password: e.currentTarget.value });
                    }}
                  />

                  <Button
                    primary
                    block
                    className="mt-4"
                    onClick={() =>
                      login({ variables: { userData: { email, password } } })
                    }
                  >
                    Login
                  </Button>
                </CardBody>
              </Card>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
