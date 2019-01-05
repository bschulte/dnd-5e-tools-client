import * as React from "react";
import classNames from "classnames";

import { HotKey } from "..";
import { Transition } from "react-spring";

export interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  toggle: () => void;
  escapeClose?: boolean;
  backgroundClickClose?: boolean;
}

export class Modal extends React.Component<IModalProps, any> {
  public render() {
    const {
      isOpen,
      toggle,
      size = "md",
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
        <Transition
          items={isOpen}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {show =>
            show &&
            (animationProps => (
              <div
                className={classNames(
                  "fixed pin z-50 overflow-auto bg-smoke flex"
                )}
                onClick={(e: React.MouseEvent) => {
                  // Close the modal on background click if specified via props
                  if (backgroundClickClose && isOpen) {
                    toggle();
                  }
                }}
                style={animationProps}
              >
                {/* Modal content */}
                <Transition
                  items={isOpen}
                  from={{ transform: "translate3d(0,-40px,0)" }}
                  enter={{ transform: "translate3d(0,0px,0)" }}
                  leave={{ transform: "translate3d(0,-40px,0)" }}
                >
                  {show =>
                    show &&
                    (animationProps => (
                      <div
                        className={classNames(
                          "relative p-8 bg-grey-darkest w-full",
                          "mx-auto mb-auto mt-16 flex-col flex",
                          `max-w-${size}`
                        )}
                        style={animationProps}
                        /*
                          Stop propagation of clicks here so they don't go to the background
                          div which would close the modal if the backgroundCloseClick prop is specified
                        */
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      >
                        {children}
                      </div>
                    ))
                  }
                </Transition>
              </div>
            ))
          }
        </Transition>
      </React.Fragment>
    );
  }
}
