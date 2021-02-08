import SyncClient from 'twilio-sync';

class TwilioSyncClient {
  constructor() {
    this._client = null;
  }

  async init(options) {
    this._listId = options.listId;
    this._documentId = options.documentId;

    try {
      const response = await fetch('/api/token');
      const data = await response.json();
      this._client = new SyncClient(data.token);
      this.list = await this._client.list(options.listId);
      this.document = await this._client.document(options.documentId);
    } catch (err) {
      console.log('Error in TwilioSyncClient.init: ', err);
      throw err;
    }
  }

  registerEvent(type, eventHandler) {
    switch (type) {
      case 'listItemUpdated':
        this.list.on('itemAdded', eventHandler);
        this.list.on('itemUpdated', eventHandler);
        break;
      case 'documentUpdated':
        this.document.on('updated', eventHandler);
        break;
      default:
        break;
    }
  }

  async getListItems() {
    if (!this._client) {
      throw new Error('Sync Client has not been initialized');
    }

    const listItems = [];
    const pageHandler = (paginator) => {
      paginator.items.forEach((item) => {
        listItems.push(item);
      });
      return paginator.hasNextPage
        ? paginator.nextPage().then(pageHandler)
        : null;
    };

    try {
      const paginator = await this.list.getItems();
      await pageHandler(paginator);
      return listItems;
    } catch (err) {
      console.log('Error in TwilioSyncClient.getListItems: ', err);
      throw err;
    }
  }

  async updateListItem(itemIndex, newItem) {
    try {
      await this.list.update(itemIndex, newItem);
    } catch (err) {
      console.log('Error in TwilioSyncClient.updateListItem: ', err);
      throw err;
    }
  }

  async updateAllListItems(update) {
    const listItems = await this.getListItems();
    listItems.forEach((item) => {
      this.list.update(item.index, update);
    });
  }

  async getDocument() {
    try {
      const document = await this._client.document(this._documentId);
      return document;
    } catch (err) {
      console.log('Error in TwilioSyncClient.getDocument: ', err);
      throw err;
    }
  }

  async updateDocument(updatedDoc) {
    try {
      await this.document.update(updatedDoc);
    } catch (err) {
      console.log('Error in TwilioSyncClient.updateDocument: ', err);
      throw err;
    }
  }
}

export default TwilioSyncClient;
