import * as React from "react";
import { Badge } from "./core";

export interface IClassBadgeProps {
  name: string;
  subClass: string;
  source: string;
}

export default class ClassBadge extends React.Component<IClassBadgeProps, any> {
  public render() {
    const { name, subClass, source } = this.props;
    return (
      <Badge className="mb-2 align-middle text-center">
        {name} {subClass && <span>({subClass})</span>}
      </Badge>
    );
  }
}
