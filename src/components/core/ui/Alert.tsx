import * as React from "react";
import classNames from "classnames";
import { Spring } from "react-spring";

export interface IAlertProps {
  error?: boolean;
  title?: string;
  message: string;
  className?: string;
}

export class Alert extends React.Component<IAlertProps, any> {
  public render() {
    const { error, title, message, className } = this.props;
    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 0.75 }}>
        {props => (
          <div
            style={props}
            className={classNames(className, "rounded p-4 border-l-4", {
              "bg-red-light border-red-dark": error
            })}
          >
            {title && <p className="font-bold">{title}</p>}
            <p>{message}</p>
          </div>
        )}
      </Spring>
    );
  }
}
