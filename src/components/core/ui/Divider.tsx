import * as React from "react";

export interface IHRProps {}

export class Divider extends React.Component<IHRProps, any> {
  public render() {
    return (
      <div className="text-white my-2 border-r-2 border-b-2 border-grey" />
    );
  }
}
