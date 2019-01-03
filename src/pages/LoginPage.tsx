import * as React from "react";
import { Card, CardBody, Input, HR, Button } from "../components/core";

export interface ILoginPageProps {}

export default class LoginPage extends React.Component<ILoginPageProps, any> {
  public render() {
    return (
      <Card className="mx-auto mt-16" style={{ width: 400 }}>
        <CardBody>
          <Input label="Email" block icon="far fa-envelope" />
          <Input
            label="Password"
            block
            type="password"
            icon="far fa-key"
            className="mt-2"
          />

          <Button primary block className="mt-4">
            Login
          </Button>
        </CardBody>
      </Card>
    );
  }
}
