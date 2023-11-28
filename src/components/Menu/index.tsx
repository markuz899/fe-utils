import { useEffect, useState } from "react";
import styled from "styled-components";
import Icon from "../Icon";

interface IMenuItem {
  isOpen?: boolean;
}

interface IMenu {
  isActive?: boolean;
  render?: any;
}

const Menu = ({ isActive, render }: IMenu) => {
  const [state, setState] = useState(isActive);
  const Icons: any = Icon;

  useEffect(() => {
    setState(isActive);
  }, []);

  const toggle = () => {
    setState(!state);
  };
  return (
    <Sider className={`sidebar_menu sidebar ${!state ? "sidebar_closed" : ""}`}>
      <div className="sidebar_content">
        <button className={"sidebar_button"} onClick={toggle}>
          <Icons name="hamburger" color="#fff" size="20px" />
        </button>
        <div className="content_menu">{render && render(toggle)}</div>
      </div>
    </Sider>
  );
};

export default Menu;

const Sider = styled.div`
  position: fixed;
  width: 250px;
  height: 100%;
  background: #2e3769;
  padding: 20px;
  color: white;
  transition: 0.2s ease-in;
  right: 0;

  &.sidebar_closed {
    right: -290px;
  }

  .sidebar_content {
    position: relative;
    .sidebar_button {
      background: gray;
      padding: 10px;
      border: 1px solid white;
      border-radius: 4px;
      color: white;
      transition: 0.3s linear;
      position: absolute;
      left: -63px;
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
    overflow: hidden;
  }
`;

const MenuItem: any = styled.div<IMenuItem>`
  .item {
    margin: 30px 10px;
    display: flex;
    height: 20px;
    span {
      white-space: nowrap;
      width: 0;
      display: ${(p) => (p.isOpen ? "block" : "none")};
    }
  }
`;
