import * as React from "react";
import { Label, Modal, Badge, Row, Col, HR } from "../core";
import { Query } from "react-apollo";
import { GET_ITEM_DETAILS } from "../../graphql/queries";

export interface IItemDetailsModalProps {
  isOpen: boolean;
  toggle: () => void;
  itemId: number;
}

const StyledLabel: React.SFC<{ text: string; sm?: boolean }> = ({
  text,
  sm
}) => (
  <Label text={text} size={sm ? "sm" : "xs"} className="text-indigo-lighter" />
);

const Name: React.SFC<{ name: string }> = ({ name }) => (
  <span className="text-xl font-semibold mb-2">{name}</span>
);

const Wondrous: React.SFC<{ wondrous: boolean }> = ({ wondrous }) => {
  if (!wondrous) return null;
  return <Badge color="orange">WONDROUS</Badge>;
};

const Entries: React.SFC<{ entries: string[] }> = ({ entries }) => {
  if (entries.length === 0) return null;

  return (
    <div>
      <HR />
      {entries.map((entry, index) => (
        <p key={index} className="my-3">
          {entry}
        </p>
      ))}
    </div>
  );
};

export default class ItemDetailsModal extends React.Component<
  IItemDetailsModalProps,
  any
> {
  public render() {
    const { isOpen, itemId, toggle } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle} size="xl">
        <Query query={GET_ITEM_DETAILS} variables={{ id: itemId }}>
          {({ data, loading }) => {
            if (loading) return "loading...";

            const { item } = data;

            return (
              <div>
                <Row>
                  <Col auto>
                    <Name name={item.name} />
                    <Wondrous wondrous={item.wondrous} />
                  </Col>
                </Row>

                <HR />

                <Row>
                  <Col auto>
                    <StyledLabel text="type" />
                    <p>{item.type}</p>
                  </Col>

                  <Col auto>
                    <StyledLabel text="rarity" />
                    <p>{item.rarity}</p>
                  </Col>

                  <Col auto>
                    <StyledLabel text="value" />
                    <p>{item.value}</p>
                  </Col>

                  <Col auto>
                    <StyledLabel text="weight" />
                    <p>{item.weight}</p>
                  </Col>
                </Row>

                <Row>
                  <Entries entries={item.entries} />
                </Row>
              </div>
            );
          }}
        </Query>
      </Modal>
    );
  }
}
