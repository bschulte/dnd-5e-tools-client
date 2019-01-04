import * as React from "react";
import classNames from "classnames";

import { HotKey } from "..";

export interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  toggle: () => void;
  escapeClose?: boolean;
  backgroundClickClose?: boolean;
}

export class Modal extends React.Component<IModalProps, any> {
  public render() {
    const {
      isOpen,
      toggle,
      escapeClose = true,
      backgroundClickClose = true,
      children
    } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <React.Fragment>
        {/* Close on escape key */}
        {escapeClose && (
          <HotKey
            hotkey="escape"
            onTrigger={() => {
              if (isOpen) {
                toggle();
              }
            }}
          />
        )}

        {/* Modal background */}
        <div
          className={classNames(
            "animated fadeIn fixed pin z-50 overflow-auto bg-smoke flex"
          )}
          onClick={(e: React.MouseEvent) => {
            // Close the modal on background click if specified via props
            if (backgroundClickClose && isOpen) {
              toggle();
            }
          }}
        >
          {/* Modal content */}
          <div
            className={classNames(
              "animated faster relative p-8 bg-grey-darkest w-full mx-auto mb-auto mt-16 max-w-md flex-col flex",
              { slideInUp: isOpen },
              { slideOutDown: !isOpen }
            )}
            /*
              Stop propagation of clicks here so they don't go to the background
              div which would close the modal if the backgroundCloseClick prop is specified
            */
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
