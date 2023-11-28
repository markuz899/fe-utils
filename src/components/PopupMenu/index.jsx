import { useEffect, useState, useRef, Children } from "react";
import styled, { css } from "styled-components";
import Icon from "../Icon";
import { createPortal } from "react-dom";
/* eslint-disable */

const ROOT_ID = "root-popup";

const PopupMenu = ({
  title,
  children,
  render,
  onClickOther,
  onClose,
  size,
  isVisible,
  noTitle,
  noCloseIcon,
  className,
  fullScreen,
}) => {
  const [visible, setVisible] = useState(isVisible || false);
  const overlay = useRef();

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const closeOnClick = (e) => {
    if (e.target === overlay.current) {
      setVisible(false);
      if (onClose) onClose();
    }
  };

  const renderPopupMenu = () => {
    const ROOT_NODE = document.getElementById(ROOT_ID);
    const handleClickOnOverlay = onClickOther ? closeOnClick : () => {};
    const ROOT = (
      <Root
        className="animate__animated animate__fadeIn animate__fast"
        fullScreen={fullScreen}
        noTitle={noTitle}
        onClick={handleClickOnOverlay}
        ref={overlay}
      >
        <div className="iconClose" onClick={close}>
          <Icon name="close" color="#fff" size="15px" />
        </div>
        <Content size={size} noTitle={noTitle} fullScreen={fullScreen}>
          {noTitle ? (
            ""
          ) : (
            <Header>
              <h2 className="text-primary">{title}</h2>
            </Header>
          )}
          {render && render({ close })}
        </Content>
      </Root>
    );
    return createPortal(ROOT, ROOT_NODE);
  };
  return (
    <>
      <Destiny className={className} onClick={open}>
        {Children.toArray(children)}
      </Destiny>
      {visible && renderPopupMenu()}
    </>
  );
};

PopupMenu.setRoot = (APP_NODE, id) => {
  ROOT_ID = id;
  let node = document.getElementById(ROOT_ID);
  if (!node) {
    node = document.createElement("div");
    node.setAttribute("id", ROOT_ID);
    APP_NODE.insertAdjacentElement("afterend", node);
  }
};

export default PopupMenu;

const Destiny = styled.div`
  display: inline-block;
  /* width: fit-content; */
  @media only screen and (max-width: 600px) {
    /* width: 100%; */
  }
`;
const Root = styled.div`
  cursor: auto;
  transition: 1s;
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  min-height: 100vh;
  z-index: 1000;
  background: transparent;
  box-sizing: border-box;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  ${(p) => p.fullScreen && fullRoot};
  .iconClose {
    border-radius: 5px;
    width: 30px;
    height: 30px;
    background: blue;
    position: absolute;
    top: 90px;
    left: -30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  h2 {
    text-align: center;
    font-size: 15px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    color: #000;
  }
`;

const Content = styled.div`
  position: relative;
  transition: 1s;
  padding: ${(props) => (props.noTitle ? "none" : "20px")};
  background: #fff;
  color: #000;
  height: 100%;
  width: 100%;
  justify-self: center;
  align-self: center;
  z-index: 100;
  overflow: scroll;
  ${(p) => p.fullScreen && fullContent};
  .img {
    width: 100%;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
    /* height: 100%; */
  }
`;

const fullRoot = css`
  height: 100vh;
  padding: 0;
`;
const fullContent = css`
  height: 100%;
  box-sizing: border-box;
  border-radius: 0;
`;
