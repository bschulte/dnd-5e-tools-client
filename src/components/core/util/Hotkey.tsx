import * as React from "react";

export interface IHotKeyProps {
  shift?: boolean;
  hotkey: string;
  onTrigger: () => void;
  debug?: boolean;
}

export class HotKey extends React.Component<IHotKeyProps, any> {
  handleKeyPress = (e: KeyboardEvent) => {
    const { shift, hotkey, onTrigger, debug } = this.props;

    debug && console.log(e);

    if (e.key.toUpperCase() === hotkey.toUpperCase()) {
      if (shift) {
        if (e.shiftKey) {
          e.stopPropagation();
          onTrigger();
        }
      } else {
        e.stopPropagation();
        onTrigger();
      }
    }
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.handleKeyPress);
  };

  public render() {
    return <div />;
  }
}
