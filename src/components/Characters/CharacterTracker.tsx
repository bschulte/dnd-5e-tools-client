import * as React from "react";
import { Query } from "react-apollo";
import classNames from "classnames";

import { Card, CardHeader, CardBody, Row, Col } from "../core";
import { GET_CHARACTER } from "../../graphql/queries";
import { getStatBonus } from "../../util";

interface ICharacterTrackerProps {
  activeCharId: number;
}

const StatBlock: React.SFC<{ stat: string; value: number }> = ({
  stat,
  value
}) => (
  <div
    className={classNames(
      "w-16 h-16 rounded-lg bg-grey-dark",
      "shadow flex text-center justify-center",
      "items-center"
    )}
  >
    <div>
      <p className="uppercase text-xs">{stat}</p>
      <p className="text-xl">
        {getStatBonus(value) > 0 && "+"}
        {getStatBonus(value)}
      </p>
      <p className="text-sm">{value}</p>
    </div>
  </div>
);

export default class CharacterTracker extends React.Component<
  ICharacterTrackerProps,
  any
> {
  public render() {
    const { activeCharId } = this.props;

    return (
      <Query query={GET_CHARACTER} variables={{ id: activeCharId }}>
        {({ data, loading }) => {
          if (loading) return "loading...";

          const { character } = data;
          return (
            <Card>
              <CardHeader title={character.name} />
              <CardBody>
                <Row>
                  <Col sm={1}>
                    {/* Stat Blocks  */}
                    <Row>
                      <StatBlock stat="str" value={character.str} />
                    </Row>
                    <Row>
                      <StatBlock stat="dex" value={character.dex} />
                    </Row>
                    <Row>
                      <StatBlock stat="con" value={character.con} />
                    </Row>
                    <Row>
                      <StatBlock stat="int" value={character.int} />
                    </Row>
                    <Row>
                      <StatBlock stat="wis" value={character.wis} />
                    </Row>
                    <Row>
                      <StatBlock stat="cha" value={character.cha} />
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          );
        }}
      </Query>
    );
  }
}
