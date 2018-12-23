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
        onClick={toggle}
        className={classNames(
          "fixed pin z-50 overflow-auto bg-smoke-light flex",
          { visible: isOpen },
          { invisible: !isOpen }
        )}
      >
        <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex">
          Centered modal!
        </div>
      </div>
    );
  }
}
