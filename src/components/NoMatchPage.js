import React from "react";
import { Result, Button } from "antd";
import history from "../utils/history";

export const NoMatchPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="unknown route!!!"
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.push("/");
          }}
        >
          back to main
        </Button>
      }
    />
  );
};
