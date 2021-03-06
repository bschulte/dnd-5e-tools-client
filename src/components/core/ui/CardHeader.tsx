import * as React from "react";
import classNames from "classnames";

export interface ICardHeader {
  title: string;
  accentColor?:
    | "black"
    | "grey"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "indigo"
    | "purple"
    | "pink"
    | "white";
  rightComp?: any;
}

export class CardHeader extends React.Component<ICardHeader, any> {
  public render() {
    const {
      title,
      accentColor = "black",
      rightComp: Right = null
    } = this.props;
    return (
      <div
        className={classNames(
          "font-bold p-3 border-t-4 font-roboto-condensed rounded flex justify-between",
          {
            "border-grey": accentColor === "grey",
            "border-red": accentColor === "red",
            "border-orange-dark": accentColor === "orange",
            "border-yellow-dark": accentColor === "yellow",
            "border-green": accentColor === "green",
            "border-teal": accentColor === "teal",
            "border-blue": accentColor === "blue",
            "border-indigo": accentColor === "indigo",
            "border-purple": accentColor === "purple",
            "border-pink": accentColor === "pink",
            "border-white text-black": accentColor === "white",
            "border-black": accentColor === "black"
          }
        )}
      >
        <span className="flex items-center">{title}</span>
        {Right && <Right />}
      </div>
    );
  }
}
