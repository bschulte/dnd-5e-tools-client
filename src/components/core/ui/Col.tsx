import * as React from "react";
import classNames from "classnames";
import { auto } from "async";

export interface IColProps {
  size?: 1 | 2 | 3 | 4 | 5 | 6;
  sm?: 1 | 2 | 3 | 4 | 5 | 6;
  md?: 1 | 2 | 3 | 4 | 5 | 6;
  lg?: 1 | 2 | 3 | 4 | 5 | 6;
  auto?: boolean;
}

export class Col extends React.Component<IColProps, any> {
  public render() {
    const {
      children,
      size = 6,
      sm = null,
      auto = false,
      md = null,
      lg = null
    } = this.props;
    return (
      <div
        className={classNames({
          "flex-1": auto,
          // Regular sizes
          "w-1/6": size === 1,
          "w-1/3": size === 2,
          "w-1/2": size === 3,
          "w-2/3": size === 4,
          "w-5/6": size === 5,
          "w-full": size === 6 || !size, // Default to full width
          // Small breakpoint sizes
          "sm:w-1/6": sm === 1,
          "sm:w-1/3": sm === 2,
          "sm:w-1/2": sm === 3,
          "sm:w-2/3": sm === 4,
          "sm:w-5/6": sm === 5,
          "sm:w-full": sm === 6,
          // Medium breakpoint sizes
          "md:w-1/6": md === 1,
          "md:w-1/3": md === 2,
          "md:w-1/2": md === 3,
          "md:w-2/3": md === 4,
          "md:w-5/6": md === 5,
          "md:w-full": md === 6,
          // Large breakpoint sizes
          "lg:w-1/6": lg === 1,
          "lg:w-1/3": lg === 2,
          "lg:w-1/2": lg === 3,
          "lg:w-2/3": lg === 4,
          "lg:w-5/6": lg === 5,
          "lg:w-full": lg === 6
        })}
      >
        {children}
      </div>
    );
  }
}
