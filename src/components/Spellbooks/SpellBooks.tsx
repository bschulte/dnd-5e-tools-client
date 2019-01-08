import * as React from "react";
import { Row, Col } from "../core";
import { SpellbookList } from "./SpellbookList";
import SpellbookInputModal from "../modals/SpellbookInputModal";
import { client } from "../../graphql/client";
import { UPDATE_SPELLBOOK } from "../../graphql/mutations";
import { GET_SPELLBOOKS } from "../../graphql/queries";
import ActiveBookSpells from "./ActiveBookSpells";

interface ISpellBooksProps {
  data: any;
}

interface ISpellBooksState {
  showNewBookModal: boolean;
}

export default class SpellBooks extends React.Component<
  ISpellBooksProps,
  ISpellBooksState
> {
  state = {
    showNewBookModal: false
  };

  showNewBookModal = () => {
    this.setState({ showNewBookModal: true });
  };

  setActiveBook = (bookId: number) => {
    console.log("Setting active book to:", bookId);
    client.mutate({
      mutation: UPDATE_SPELLBOOK,
      variables: { bookId, newSpellbookData: { active: true } },
      refetchQueries: [{ query: GET_SPELLBOOKS }],
      awaitRefetchQueries: true
    });
  };

  public render() {
    const { data } = this.props;
    const { showNewBookModal } = this.state;

    const activeBook = data.spellbooks.find((book: any) => book.active);

    return (
      <React.Fragment>
        <SpellbookInputModal
          mode="new"
          isOpen={showNewBookModal}
          toggle={() =>
            this.setState({ showNewBookModal: !this.state.showNewBookModal })
          }
        />
        <Row>
          <Col sm={1}>
            <SpellbookList
              spellbooks={data.spellbooks}
              showNewBookModal={this.showNewBookModal}
              setActiveBook={this.setActiveBook}
            />
          </Col>
          <Col sm={2}>
            <ActiveBookSpells
              activeBookId={activeBook ? activeBook.id : null}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
