import styled from "styled-components";

interface IMenuItem {
  isOpen?: boolean;
}

interface IMenu {
  isOpenMenu?: boolean;
  setIsOpenMenu?: any;
}

const menuItems = [
  { title: "Dashboard", icon: "" },
  { title: "Users", icon: "" },
  { title: "Cloud services", icon: "" },
  { title: "Usage data", icon: "" },
  { title: "Server list", icon: "" },
];

const Menu = ({ isOpenMenu, setIsOpenMenu }: IMenu) => {
  return (
    <Sider
      className={`sidebar_menu sidebar ${!isOpenMenu ? "sidebar_closed" : ""}`}
    >
      <div className="sebar_content">
        <button
          className={"sidebar_button"}
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          ---
        </button>
        <ul>
          {menuItems.map((item) => (
            <MenuItem key={item.title} isOpen={isOpenMenu}>
              <li>
                <div className="item">
                  ICON
                  <span>{item.title}</span>
                </div>
              </li>
            </MenuItem>
          ))}
        </ul>
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

  .sebar_content {
    position: relative;
    .sidebar_button {
      background: gray;
      padding: 10px;
      border: 1px solid white;
      border-radius: 4px;
      color: white;
      transition: 0.3s linear;
      position: absolute;
      left: -65px;
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
