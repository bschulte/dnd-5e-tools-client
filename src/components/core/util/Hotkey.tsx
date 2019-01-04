import * as React from "react";

export interface IHotKeyProps {
  shift?: boolean;
  ctrl?: boolean;
  hotkey: string;
  onTrigger: () => void;
  debug?: boolean;
}

export class HotKey extends React.Component<IHotKeyProps, any> {
  handleKeyPress = (e: KeyboardEvent) => {
    const { shift, hotkey, onTrigger, debug, ctrl } = this.props;

    debug && console.log(e);

    if (shift && !e.shiftKey) return;
    if (ctrl && !e.ctrlKey) return;

    if (e.key.toUpperCase() === hotkey.toUpperCase()) {
      e.preventDefault();
      onTrigger();
    }
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.handleKeyPress);
  };

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  public render() {
    return <div />;
  }
}
