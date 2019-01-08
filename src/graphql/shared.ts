import { client } from "./client";

export const showDetailsModal = (
  itemId: number,
  type: "Spell" | "Monster" | "Item"
) => {
  client.writeData({
    data: {
      detailsModal: {
        __typename: "DetailsModalData",
        databaseId: itemId,
        type,
        isOpen: true
      }
    }
  });
};
