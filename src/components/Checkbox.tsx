import React, { useState, useCallback, useContext } from "react";
import { CheckboxContext } from "../context/Context";
import { Col, Row } from "antd";
import { TCategory } from "../App";
import { Checkbox } from "antd";
import cn from "classnames";
import Icon, { DownOutlined, RightOutlined } from "@ant-design/icons";

type TCheckBoxProps = {
  entry: TCategory;
};
const CheckboxComponent = React.memo(({ entry }: TCheckBoxProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // @ts-ignore
  const { onCheckboxToggle } = useContext(CheckboxContext);

  const handleCollapse = useCallback(
    () => setIsCollapsed(!isCollapsed),
    [isCollapsed],
  );

  return (
    <>
      <div className={cn("checkbox-container", { ch: !entry.items })}>
        {entry.items ? (
          <Icon
            className={"collapse-label"}
            component={
              isCollapsed
                ? (DownOutlined as React.ForwardRefExoticComponent<any>)
                : (RightOutlined as React.ForwardRefExoticComponent<any>)
            }
            onClick={handleCollapse}
          />
        ) : null}
        <Row>
          <Col span={24}>
            <Checkbox
              checked={entry.checked}
              onChange={() => onCheckboxToggle(entry)}
            >
              <span className={"checkbox-text"}>{entry.name}</span>
            </Checkbox>
          </Col>
        </Row>
      </div>
      <div>
        <div
          className={cn("sub-group expandable-group", {
            expanded: isCollapsed,
          })}
        >
          {isCollapsed &&
            entry.items &&
            entry.items.map((sub) => (
              <CheckboxComponent key={sub.id} entry={sub} />
            ))}
        </div>
      </div>
    </>
  );
});

export { CheckboxComponent };
