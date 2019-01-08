import * as React from "react";
import { Card, CardHeader, CardBody, Button, List, ListItem } from "../core";

export interface ISpellbookListProps {
  spellbooks: any[];
  showNewBookModal: () => void;
  setActiveBook: any;
}

export const SpellbookList: React.SFC<ISpellbookListProps> = ({
  spellbooks,
  showNewBookModal,
  setActiveBook
}) => {
  return (
    <Card>
      <CardHeader
        title="Spellbooks"
        rightComp={() => (
          <Button icon primary onClick={showNewBookModal}>
            <i className="far fa-plus" />
          </Button>
        )}
      />

      <CardBody noPadding>
        <List>
          {spellbooks.map((book, index) => (
            <ListItem
              key={index}
              onClick={() => setActiveBook(book.id)}
              active={book.active}
              className="cursor-pointer"
            >
              {book.name}
            </ListItem>
          ))}
        </List>
      </CardBody>
    </Card>
  );
};
