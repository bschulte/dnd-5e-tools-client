import * as React from "react";
import classNames from "classnames";

export interface IModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export default class Modal extends React.Component<IModalProps, any> {
  public render() {
    const { isOpen, toggle } = this.props;

    return (
      <div
        className={classNames(
          "fixed pin z-50 overflow-auto bg-smoke-light flex",
          { "visible animated fadeIn": isOpen },
          { invisible: !isOpen }
        )}
      >
        <div
          className={classNames(
            "relative align-top p-8 bg-white w-full max-w-md m-auto flex-col flex",
            { "animated slideInUp": isOpen }
          )}
        >
          Centered modal!
        </div>
      </div>
    );
  }
}
