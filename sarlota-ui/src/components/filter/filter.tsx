import React, { useState } from "react";
import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import "./filter.scss";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Danas", "Sutra"];
const defaultCheckedList = ["Danas", "Sutra"];
export interface FilterProps {
  setCheckedOptions: (value: any) => void;
}
const Filter = ({ setCheckedOptions }: FilterProps) => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [open, setOpen] = useState(false);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "3") {
      setOpen(false);
    }
  };

  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };

  const handleFilter = () => {
    formatFilterRequest();
    setOpen(false);
  };

  const formatFilterRequest = () => {
    const mappedDates = checkedList.map((date) => {
      let d = new Date();
      if (date === "Sutra") {
        d.setDate(d.getDate() + 1);
      }
      return d.toISOString();
    });
    setCheckedOptions(mappedDates);
  };

  const onChange = (list: CheckboxValueType[]) => {
    console.log(list);
    setCheckedList(list);
    //setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckAll(e.target.checked);
    setCheckedList(e.target.checked ? plainOptions : []);
    //setIndeterminate(false);
  };
  const items: MenuProps["items"] = [
    {
      label: (
        <CheckboxGroup
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        />
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Checkbox
          //indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Izaberi sve
        </Checkbox>
      ),
      key: "2",
    },
    {
      label: <Button onClick={handleFilter}>Filtriraj</Button>,
      key: "3",
    },
  ];

  return (
    <div>
      <Dropdown
        className="filter"
        menu={{ items, onClick: handleMenuClick }}
        onOpenChange={handleOpenChange}
        open={open}
      >
        <Space className="filter__name">
          <FilterOutlined />
          Filter
        </Space>
      </Dropdown>
    </div>
  );
};

export default Filter;
