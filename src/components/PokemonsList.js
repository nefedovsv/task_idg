import React from "react";
import { List, Avatar, Button, Tag, Card } from "antd";
import { useAuth0 } from "../utils/react-auth0-spa";

export const PokemonsList = ({ handleClick, pokemons }) => {
  return (
    <List
      grid={{
        gutter: 10,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4
      }}
      itemLayout="vertical"
      size="large"
      pagination={{
        position: "both",
        showSizeChanger: true,
        defaultCurrent: 1,
        total: 1200
      }}
      dataSource={pokemons}
      renderItem={item => <PokemonCard item={item} handleClick={handleClick} />}
    />
  );
};

const PokemonCard = ({ item, handleClick }) => {
  const { user } = useAuth0();
  return (
    <List.Item>
      <Card
        title={item.name}
        extra={
          <div>
            <Avatar src={item.avatar} />
            <Button
              onClick={() => handleClick(item, user.email)}
              shape="circle"
              icon="star"
            />
          </div>
        }
        style={{ width: 300, margin: "auto" }}
      >
        <p> weight: {item.weight}</p>
        <p> height: {item.height}</p>
        <Tag color="#f50">type: {item.types}</Tag>
      </Card>
    </List.Item>
  );
};
