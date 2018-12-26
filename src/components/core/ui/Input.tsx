import * as React from "react";

export interface IInputProps {}

export class Input extends React.Component<IInputProps, any> {
  public render() {
    return <input className="bg-grey-darker text-grey-light p-3" />;
  }
}
