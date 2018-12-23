import * as React from "react";

export interface IHotKeyProps {
  shift?: boolean;
  hotkey: string;
  onTrigger: () => void;
}

export default class HotKey extends React.Component<IHotKeyProps, any> {
  handleKeyPress = (e: KeyboardEvent) => {
    const { shift, hotkey, onTrigger } = this.props;
    console.log(e);
    if (e.key.toUpperCase() === hotkey.toUpperCase()) {
      if (shift) {
        if (e.shiftKey) {
          onTrigger();
        }
      } else {
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
