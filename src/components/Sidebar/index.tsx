import styled from "styled-components";

interface IMenuItem {
  isOpen?: boolean;
}

interface ISidebar {
  isOpen?: boolean;
  setIsOpen?: any;
}

const menuItems = [
  { title: "Dashboard", icon: "" },
  { title: "Users", icon: "" },
  { title: "Cloud services", icon: "" },
  { title: "Usage data", icon: "" },
  { title: "Server list", icon: "" },
];

const Sidebar = ({ isOpen, setIsOpen }: ISidebar) => {
  return (
    <Sider className={`sidebar ${!isOpen ? "sidebar_closed" : ""}`}>
      <button className={"sidebar_button"} onClick={() => setIsOpen(!isOpen)}>
        ---
      </button>
      <ul>
        {menuItems.map((item) => (
          <MenuItem key={item.title} isOpen={isOpen}>
            <li>
              <div className="item">
                ICON
                <span>{item.title}</span>
              </div>
            </li>
          </MenuItem>
        ))}
      </ul>
    </Sider>
  );
};

export default Sidebar;

const Sider = styled.div`
  width: 250px;
  background: darkslategrey;
  padding: 20px;
  color: white;
  transition: 0.2s ease-in;

  &.sidebar_closed {
    width: 50px;
  }

  .sidebar_button {
    background: transparent;
    padding: 10px;
    border: 1px solid white;
    border-radius: 4px;
    color: white;
    transition: 0.3s linear;
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
