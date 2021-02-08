import React from 'react';
import Row from 'react-bootstrap/Row';
import Item from './Item';

export default function Items({ items, vote }) {
  return (
    <>
      {items.length ? (
        <Row>
          {items.map((item) => (
            <Item key={item.id} item={item} vote={vote} />
          ))}
        </Row>
      ) : (
        'Loading...'
      )}
    </>
  );
}
