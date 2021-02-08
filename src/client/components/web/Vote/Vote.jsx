import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import Header from './Header';
import Items from './Items';

import Results from '../../shared/Results';
import TwilioSyncClient from '../../../services/TwilioSyncClient';

const containerPadding = {
  paddingTop: '70px',
};

const syncClient = new TwilioSyncClient();

export default function Vote() {
  const [items, setItems] = useState([]);
  const [orderConfig, setOrderConfig] = useState({});
  const [voted, setVoted] = useState(false);

  async function loadData() {
    const data = {};
    try {
      await syncClient.init({ listId: 'order', documentId: 'orderConfig' });

      const syncDocument = await syncClient.getDocument();
      data.orderConfig = syncDocument.value;

      const syncListItems = await syncClient.getListItems();
      data.items = syncListItems.map((syncListItem) => ({
        id: syncListItem.index,
        name: syncListItem.value.name,
        description: syncListItem.value.description,
        imgSrc: syncListItem.value.imgSrc,
        votes: syncListItem.value.votes,
      }));
    } catch (err) {
      console.log('Error in loadData: ', err);
      throw err;
    }
    return data;
  }

  // Initial state load + event registration
  useEffect(() => {
    async function initState() {
      const data = await loadData();
      setOrderConfig(data.orderConfig);
      setItems(data.items);
      syncClient.registerEvent('listItemUpdated', (updates) => {
        setItems((previousItems) => {
          const updatedItems = [...previousItems];
          const updatedItem = updatedItems.find(
            (i) => i.id === updates.item.index
          );
          updatedItem.votes = updates.item.value.votes;
          return updatedItems;
        });
      });

      syncClient.registerEvent('documentUpdated', (updatedDocument) => {
        setOrderConfig(updatedDocument.value);
      });
    }

    initState();
  }, []);

  function vote(itemId) {
    const updatedItems = [...items];
    const selectedItem = updatedItems.find((i) => i.id === itemId);
    selectedItem.votes += 1;
    syncClient.updateListItem(itemId, selectedItem);
    setVoted(true);
  }

  const openVotingView = (
    <>
      <Header />
      <Container style={containerPadding}>
        <Results items={items} outOfStockItem={orderConfig.outOfStockItem} />
        {voted ? 'Thanks for voting!' : <Items items={items} vote={vote} />}
      </Container>
    </>
  );

  const closedVotingView = (
    <Container fluid>
      <Row>
        <Col className="m-5">
          <h4 className="text-center">
            Thanks for participating in this
            <a href="https://www.twilio.com/sync"> Twilio Sync</a> demo!
          </h4>
        </Col>
      </Row>
    </Container>
  );

  return <>{orderConfig.closed ? closedVotingView : openVotingView}</>;
}
