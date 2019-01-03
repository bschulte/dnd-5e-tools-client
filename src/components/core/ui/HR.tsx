import * as React from "react";

export interface IHRProps {}

export class HR extends React.Component<IHRProps, any> {
  public render() {
    return <hr className="text-white my-2" />;
  }
}
