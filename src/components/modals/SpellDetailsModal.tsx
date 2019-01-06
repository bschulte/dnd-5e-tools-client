import * as React from "react";
import { Query } from "react-apollo";

import { Modal, Row, Col, Label, HR, Badge } from "../core";
import { GET_SPELL_DETAILS } from "../../graphql/queries";
import ClassBadge from "../ClassBadge";

export interface ISpellDetailsModalProps {
  isOpen: boolean;
  toggle: () => void;
  spellId: number;
}

const StyledLabel: React.SFC<{ text: string }> = ({ text }) => (
  <Label text={text} size="xs" className="text-indigo-lighter" />
);

const Name: React.SFC<{ name: string }> = ({ name }) => (
  <p className="text-xl font-semibold mb-2">{name}</p>
);

const Classes: React.SFC<{ classes: any[] }> = ({ classes }) => (
  <div className="flex flex-row flex-wrap">
    {classes.map((classEntry: any) => (
      <ClassBadge
        key={classEntry.name + classEntry.subclass}
        name={classEntry.name}
        subClass={classEntry.subclass}
        source={classEntry.source}
      />
    ))}
  </div>
);

const CastTime: React.SFC<{ castTimes: any[] }> = ({ castTimes }) => {
  return (
    <React.Fragment>
      <StyledLabel text="cast time" />
      <div>
        {castTimes.map((time: any, index: number) => {
          return (
            <React.Fragment key={index}>
              <p>
                {time.number} {time.unit}
              </p>
              {time.condition ? <p>{time.condition}</p> : null}
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

const Level: React.SFC<{ level: number }> = ({ level }) => (
  <React.Fragment>
    <StyledLabel text="level" />
    <p>{level === 0 ? "Cantrip" : level}</p>
  </React.Fragment>
);

const School: React.SFC<{ school: string }> = ({ school }) => {
  let fullSchoolName: string = null;
  if (school === "T") {
    fullSchoolName = "Transmutation";
  }
  if (school === "A") {
    fullSchoolName = "Abjuration";
  }
  if (school === "C") {
    fullSchoolName = "Conjuration";
  }
  if (school === "D") {
    fullSchoolName = "Divination";
  }
  if (school === "E") {
    fullSchoolName = "Enchantment";
  }
  if (school === "V") {
    fullSchoolName = "Evocation";
  }
  if (school === "I") {
    fullSchoolName = "Illusion";
  }
  if (school === "N") {
    fullSchoolName = "Necromancy";
  }
  if (school === "T") {
    fullSchoolName = "Transmutation";
  }
  if (!fullSchoolName) {
    throw new Error("Unknown spell school: " + school);
  }

  return (
    <React.Fragment>
      <StyledLabel text="school" />
      <p>{fullSchoolName}</p>
    </React.Fragment>
  );
};

const Range: React.SFC<{ range: any }> = ({ range }) => (
  <React.Fragment>
    <StyledLabel text="range" />
    <p>
      {range.distanceType && (
        <span>
          {range.distanceAmount} {range.distanceType},{" "}
        </span>
      )}
      {range.type}
    </p>
  </React.Fragment>
);

const Components: React.SFC<{ components: any }> = ({ components }) => {
  const parts = [];
  components.verbal && parts.push("V");
  components.somatic && parts.push("S");
  components.materials && parts.push(components.materials);
  return (
    <React.Fragment>
      <StyledLabel text="components" />
      {parts.join(", ")}
    </React.Fragment>
  );
};

const Durations: React.SFC<{ durations: any[] }> = ({ durations }) => (
  <React.Fragment>
    <StyledLabel text="duration" />
    {durations.map((duration, index) => (
      <p key={index}>
        {duration.durationType && (
          <span>
            {duration.durationAmount} {duration.durationType},{" "}
          </span>
        )}
        {duration.type}
      </p>
    ))}
  </React.Fragment>
);

const Ritual: React.SFC<{ ritual: boolean }> = ({ ritual }) => {
  if (!ritual) return null;
  return <Badge color="orange">RITUAL</Badge>;
};

const Concentration: React.SFC<{ durations: any[] }> = ({ durations }) => {
  const requiresConcentration = durations.find(d => d.concentration);
  if (!requiresConcentration) return null;

  return <Badge color={"purple"}>CONCENTRATION</Badge>;
};

const SpellText: React.SFC<{
  entries: string[];
  entriesHigherLevel: string[];
}> = ({ entries, entriesHigherLevel }) => (
  <React.Fragment>
    {entries.concat(entriesHigherLevel).map((line, index) => (
      <p key={index} className="mb-4">
        {line}
      </p>
    ))}
  </React.Fragment>
);

export default class SpellDetailsModal extends React.Component<
  ISpellDetailsModalProps,
  any
> {
  public render() {
    const { isOpen, toggle, spellId } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle} size="xl">
        <Query query={GET_SPELL_DETAILS} variables={{ id: spellId }}>
          {({ data, loading, error }: any) => {
            if (loading) return "loading...";
            if (error) return "error";
            const { spell } = data;

            return (
              <div>
                <Row>
                  <Col auto>
                    <Name name={spell.name} />
                    <Ritual ritual={spell.ritual} />
                    <Concentration durations={spell.durations} />
                  </Col>
                  <Col auto>
                    <Classes classes={spell.classes} />
                  </Col>
                </Row>

                <HR />

                <Row>
                  <Col auto>
                    <Level level={spell.level} />
                  </Col>

                  <Col auto>
                    <School school={spell.school} />
                  </Col>

                  <Col auto>
                    <CastTime castTimes={spell.times} />
                  </Col>
                </Row>

                <Row>
                  <Col auto>
                    <Range range={spell.range} />
                  </Col>

                  <Col auto>
                    <Components components={spell.components} />
                  </Col>

                  <Col auto>
                    <Durations durations={spell.durations} />
                  </Col>
                </Row>
                <Row>
                  <SpellText
                    entries={spell.entries}
                    entriesHigherLevel={spell.entriesHigherLevel}
                  />
                </Row>
              </div>
            );
          }}
        </Query>
      </Modal>
    );
  }
}
