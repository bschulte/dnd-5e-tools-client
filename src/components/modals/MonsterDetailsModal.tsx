import * as React from "react";
import {
  Label,
  Modal,
  Row,
  Col,
  HR,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  Badge
} from "../core";
import { Query } from "react-apollo";
import { GET_MONSTER_DETAILS } from "../../graphql/queries";

export interface IMonsterDetailsModalProps {
  isOpen: boolean;
  toggle: () => void;
  monsterId: number;
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

const HP: React.SFC<{ hp: string }> = ({ hp }) => (
  <React.Fragment>
    <StyledLabel text="hp" />
    <p>
      <i className="far fa-heart text-pink" /> {hp}
    </p>
  </React.Fragment>
);

const AC: React.SFC<{ ac: string }> = ({ ac }) => (
  <React.Fragment>
    <StyledLabel text="ac" />
    <p>
      <i className="far fa-shield-alt text-yellow" /> {ac}
    </p>
  </React.Fragment>
);

const Stats: React.SFC<{
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}> = ({ str, dex, con, int, wis, cha }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableHeader className="text-red-light">STR</TableHeader>
        <TableHeader className="text-green-light">DEX</TableHeader>
        <TableHeader className="text-orange-light">CON</TableHeader>
        <TableHeader className="text-blue-light">INT</TableHeader>
        <TableHeader className="text-teal-light">WIS</TableHeader>
        <TableHeader className="text-purple-light">CHA</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell center>{str}</TableCell>
        <TableCell center>{dex}</TableCell>
        <TableCell center>{con}</TableCell>
        <TableCell center>{int}</TableCell>
        <TableCell center>{wis}</TableCell>
        <TableCell center>{cha}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const Skills: React.SFC<{ skills: string }> = ({ skills }) => {
  if (!skills) return null;

  return (
    <Col auto>
      <StyledLabel text="skills" />
      {skills.split(",").map(skill => (
        <p className="text-sm capitalize">{skill}</p>
      ))}
    </Col>
  );
};

const Listing: React.SFC<{ list: any[]; title: string }> = ({
  list,
  title
}) => {
  if (list.length === 0) return null;

  return (
    <React.Fragment>
      <HR />
      <h3 className="mt-2">{title}</h3>
      {list.map(item => (
        <div className="mt-3">
          <StyledLabel text={item.name} sm />
          {item.text.map((t: string) => (
            <p className="my-3">{t}</p>
          ))}
        </div>
      ))}
    </React.Fragment>
  );
};

const OptionalField: React.SFC<{ title: string; value: string }> = ({
  title,
  value
}) => {
  if (!value) return null;

  return (
    <Col auto>
      <StyledLabel text={title} />
      <p className="capitalize">{value}</p>
    </Col>
  );
};

export default class MonsterDetailsModal extends React.Component<
  IMonsterDetailsModalProps,
  any
> {
  public render() {
    const { isOpen, monsterId, toggle } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle} size="xl">
        <Query query={GET_MONSTER_DETAILS} variables={{ id: monsterId }}>
          {({ data, loading, error }: any) => {
            if (loading) return "loading...";
            if (error) return "error";
            const { monster } = data;

            return (
              <div>
                <Row>
                  <Col auto>
                    <Name name={monster.name} />
                    <Badge size="sm" className="ml-4" rounded={false}>
                      CR {monster.cr}
                    </Badge>
                  </Col>
                </Row>

                <HR />

                <Row>
                  <Col sm={3}>
                    <Row>
                      <Col auto>
                        <HP hp={monster.hp} />
                      </Col>

                      <Col auto>
                        <AC ac={monster.ac} />
                      </Col>
                    </Row>
                  </Col>

                  <Col sm={3}>
                    <Stats
                      str={monster.str}
                      dex={monster.dex}
                      con={monster.con}
                      int={monster.int}
                      wis={monster.wis}
                      cha={monster.cha}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col auto>
                    <StyledLabel text="size" />
                    <p>{monster.size}</p>
                  </Col>

                  <Col auto>
                    <StyledLabel text="speed" />
                    <p>{monster.speed}</p>
                  </Col>

                  <Col auto>
                    <StyledLabel text="type" />
                    <p className="capitalize">{monster.type}</p>
                  </Col>

                  <Col auto>
                    <StyledLabel text="source" />
                    <p>{monster.source}</p>
                  </Col>

                  <Col auto>
                    <StyledLabel text="alignment" />
                    <p className="capitalize">{monster.alignment}</p>
                  </Col>
                </Row>

                <Row>
                  <Skills skills={monster.skills} />

                  <OptionalField title="immune" value={monster.immune} />

                  <OptionalField title="senses" value={monster.senses} />

                  <OptionalField title="languages" value={monster.languages} />

                  <OptionalField title="spells" value={monster.spells} />
                </Row>

                <Listing list={monster.traits} title="Traits" />
                <Listing list={monster.actions} title="Actions" />
                <Listing list={monster.legendaries} title="Legendary Actions" />
              </div>
            );
          }}
        </Query>
      </Modal>
    );
  }
}
