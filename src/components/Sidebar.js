import React, { useState } from "react";
import styled from "styled-components/macro";
import { rgba } from "polished";
import { NavLink, withRouter } from "react-router-dom";
import { darken } from "polished";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../vendor/perfect-scrollbar.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";

import {
  Badge,
  Box as MuiBox,
  Chip,
  Grid,
  Avatar,
  Collapse,
  Drawer as MuiDrawer,
  List as MuiList,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

import { ExpandLess, ExpandMore } from "@material-ui/icons";

import { green } from "@material-ui/core/colors";

import { sidebarRoutes as routes1 } from "../routes/admin";
import { sidebarRoutes as routes2 } from "../routes/centralStore";
import { sidebarRoutes as routes3 } from "../routes/siteStore";

// import { ReactComponent as Logo } from "../vendor/logo.svg";

import Logo from "../vendor/logo1.png";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const Box = styled(MuiBox)(spacing);

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const List = styled(MuiList)`
  background-color: ${(props) => props.theme.sidebar.background};
`;

const Items = styled.div`
  padding-top: ${(props) => props.theme.spacing(2.5)}px;
  padding-bottom: ${(props) => props.theme.spacing(2.5)}px;
  height: 70vh;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }

`;

const Brand = styled(ListItem)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)}px;
  padding-right: ${(props) => props.theme.spacing(6)}px;
  justify-content: center;
  cursor: pointer;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`;

const BrandIcon = styled(Logo)`
  margin-right: ${(props) => props.theme.spacing(2)}px;
  color: ${(props) => props.theme.sidebar.header.brand.color};
  fill: ${(props) => props.theme.sidebar.header.brand.color};
  width: 60px;
  height: 60px;
`;

// const BrandChip = styled(Chip)`
//   background-color: ${green[700]};
//   border-radius: 5px;
//   color: ${(props) => props.theme.palette.common.white};
//   font-size: 55%;
//   height: 18px;
//   margin-left: 2px;
//   margin-top: -16px;
//   padding: 3px 0;

//   span {
//     padding-left: ${(props) => props.theme.spacing(1.375)}px;
//     padding-right: ${(props) => props.theme.spacing(1.375)}px;
//   }
// `;

const Category = styled(ListItem)`
  padding-top: ${(props) => props.theme.spacing(3)}px;
  padding-bottom: ${(props) => props.theme.spacing(3)}px;
  padding-left: ${(props) => props.theme.spacing(8)}px;
  padding-right: ${(props) => props.theme.spacing(7)}px;
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};

  svg {
    color: ${(props) => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  &.${(props) => props.activeClassName} {
    background-color: ${(props) =>
      darken(0.03, props.theme.sidebar.background)};

    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`;

const CategoryText = styled(ListItemText)`
  margin: 0;
  span {
    color: ${(props) => props.theme.sidebar.color};
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
    padding: 0 ${(props) => props.theme.spacing(4)}px;
  }
`;

const CategoryIconLess = styled(ExpandLess)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const CategoryIconMore = styled(ExpandMore)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const Link = styled(ListItem)`
  padding-left: ${(props) => props.theme.spacing(17.5)}px;
  padding-top: ${(props) => props.theme.spacing(2)}px;
  padding-bottom: ${(props) => props.theme.spacing(2)}px;

  span {
    color: ${(props) => rgba(props.theme.sidebar.color, 0.7)};
  }

  &:hover span {
    color: ${(props) => rgba(props.theme.sidebar.color, 0.9)};
  }

  &:hover {
    background-color: ${(props) =>
      darken(0.015, props.theme.sidebar.background)};
  }

  &.${(props) => props.activeClassName} {
    background-color: ${(props) =>
      darken(0.03, props.theme.sidebar.background)};

    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`;

const LinkText = styled(ListItemText)`
  color: ${(props) => props.theme.sidebar.color};
  span {
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
  }
  margin-top: 0;
  margin-bottom: 0;
`;

const LinkBadge = styled(Chip)`
  font-size: 11px;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 28px;
  top: 8px;
  background: ${(props) => props.theme.sidebar.badge.background};

  span.MuiChip-label,
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding-left: ${(props) => props.theme.spacing(2)}px;
    padding-right: ${(props) => props.theme.spacing(2)}px;
  }
`;

const CategoryBadge = styled(LinkBadge)`
  top: 12px;
`;

const SidebarSection = styled(Typography)`
  color: ${(props) => props.theme.sidebar.color};
  padding: ${(props) => props.theme.spacing(4)}px
    ${(props) => props.theme.spacing(7)}px
    ${(props) => props.theme.spacing(1)}px;
  opacity: 0.9;
  display: block;
`;

const SidebarFooter = styled.div`
  background-color: ${(props) =>
    props.theme.sidebar.footer.background} !important;
  padding: ${(props) => props.theme.spacing(3)}px
    ${(props) => props.theme.spacing(4)}px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const SidebarFooterText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
`;

const SidebarFooterSubText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
  font-size: 0.7rem;
  display: block;
  padding: 1px;
`;

const SidebarFooterBadge = styled(Badge)`
  margin-right: ${(props) => props.theme.spacing(1)}px;
  span {
    background-color: ${(props) =>
      props.theme.sidebar.footer.online.background};
    border: 1.5px solid ${(props) => props.theme.palette.common.white};
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`;

const userDetails = window.sessionStorage.getItem("user");
const userRole = JSON.parse(userDetails);
console.log(userRole);

const SidebarCategory = ({
  name,
  icon,
  classes,
  isOpen,
  isCollapsable,
  badge,
  ...rest
}) => {
  return (
    <Category {...rest}>
      {icon}
      <CategoryText>{name}</CategoryText>
      {isCollapsable ? (
        isOpen ? (
          <CategoryIconMore />
        ) : (
          <CategoryIconLess />
        )
      ) : null}
      {badge ? <CategoryBadge label={badge} /> : ""}
    </Category>
  );
};

const SidebarLink = ({ name, to, badge, icon }) => {
  return (
    <Link
      button
      dense
      component={NavLink}
      exact
      to={to}
      activeClassName="active"
    >
      <LinkText>{name}</LinkText>
      {badge ? <LinkBadge label={badge} /> : ""}
    </Link>
  );
};

const getSideBarContent = (user, rest, openRoutes, toggle) => {
  if (user?.role === "Admin") {
    return (
      <Drawer variant="permanent" {...rest}>
        <Brand component={NavLink} to="/" button>
          {/* <BrandIcon /> */}
          {/* <div style={{ objectFit: "cover" }}> */}
          <img
            src={Logo}
            style={{
              height: "20vh",
              width: "100%",
              objectFit: "cover",
              margin: 0,
            }}
          />
          {/* </div> */}
          {/* <h4>SH Constructions</h4> */}
          <Box ml={1}></Box>
        </Brand>
        <Scrollbar>
          <List disablePadding>
            <Items>
              {routes1.map((category, index) => (
                <React.Fragment key={index}>
                  {category.header ? (
                    <SidebarSection>{category.header}</SidebarSection>
                  ) : null}

                  {category.children && category.icon ? (
                    <React.Fragment key={index}>
                      <SidebarCategory
                        isOpen={!openRoutes[index]}
                        isCollapsable={true}
                        name={category.id}
                        icon={category.icon}
                        button={true}
                        onClick={() => toggle(index)}
                      />

                      <Collapse
                        in={openRoutes[index]}
                        timeout="auto"
                        unmountOnExit
                      >
                        {category.children.map((route, index) => (
                          <SidebarLink
                            key={index}
                            name={route.name}
                            to={route.path}
                            icon={route.icon}
                            badge={route.badge}
                          />
                        ))}
                      </Collapse>
                    </React.Fragment>
                  ) : category.icon ? (
                    <SidebarCategory
                      isCollapsable={false}
                      name={category.id}
                      to={category.path}
                      activeClassName="active"
                      component={NavLink}
                      icon={category.icon}
                      exact
                      button
                      badge={category.badge}
                    />
                  ) : null}
                </React.Fragment>
              ))}
            </Items>
          </List>
          <Grid
            style={{
              position: "fixed",
              bottom: "0px",
              left: "0px",
              width: "auto",
              // display: "flex",
            }}
          >
            <SidebarFooter>
              <SidebarFooterBadge
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Avatar src="https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg?w=2000" />
                <SidebarFooterText>
                  Hey {userRole.role} Dashboard
                  <SidebarFooterSubText>Hello UserName</SidebarFooterSubText>
                </SidebarFooterText>
              </SidebarFooterBadge>
            </SidebarFooter>
          </Grid>
        </Scrollbar>
      </Drawer>
    );
  } else if (user?.role === "Central Store") {
    return (
      <Drawer variant="permanent" {...rest}>
        <Brand component={NavLink} to="/" button>
          {/* <BrandIcon /> */}
          {/* <div style={{ objectFit: "cover" }}> */}
          <img
            src={Logo}
            style={{
              height: "20vh",
              width: "100%",
              objectFit: "cover",
              margin: 0,
            }}
          />
          {/* </div> */}
          {/* <h4>SH Constructions</h4> */}
          <Box ml={1}></Box>
        </Brand>
        <Scrollbar>
          <List disablePadding>
            <Items>
              {routes2.map((category, index) => (
                <React.Fragment key={index}>
                  {category.header ? (
                    <SidebarSection>{category.header}</SidebarSection>
                  ) : null}

                  {category.children && category.icon ? (
                    <React.Fragment key={index}>
                      <SidebarCategory
                        isOpen={!openRoutes[index]}
                        isCollapsable={true}
                        name={category.id}
                        icon={category.icon}
                        button={true}
                        onClick={() => toggle(index)}
                      />

                      <Collapse
                        in={openRoutes[index]}
                        timeout="auto"
                        unmountOnExit
                      >
                        {category.children.map((route, index) => (
                          <SidebarLink
                            key={index}
                            name={route.name}
                            to={route.path}
                            icon={route.icon}
                            badge={route.badge}
                          />
                        ))}
                      </Collapse>
                    </React.Fragment>
                  ) : category.icon ? (
                    <SidebarCategory
                      isCollapsable={false}
                      name={category.id}
                      to={category.path}
                      activeClassName="active"
                      component={NavLink}
                      icon={category.icon}
                      exact
                      button
                      badge={category.badge}
                    />
                  ) : null}
                </React.Fragment>
              ))}
            </Items>
          </List>
          <Grid
            style={{
              position: "fixed",
              bottom: "0px",
              left: "0px",
              width: "auto",
              // display: "flex",
            }}
          >
            <SidebarFooter>
              <SidebarFooterBadge
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Avatar src="https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg?w=2000" />
                <SidebarFooterText>
                  Hey {userRole.role} Dashboard
                  <SidebarFooterSubText>Hello UserName</SidebarFooterSubText>
                </SidebarFooterText>
              </SidebarFooterBadge>
            </SidebarFooter>
          </Grid>
        </Scrollbar>
      </Drawer>
    );
  } else {
    return (
      <Drawer variant="permanent" {...rest}>
        <Brand component={NavLink} to="/" button>
          {/* <BrandIcon /> */}
          {/* <div style={{ objectFit: "cover" }}> */}
          <img
            src={Logo}
            style={{
              height: "20vh",
              width: "100%",
              objectFit: "cover",
              margin: 0,
            }}
          />
          {/* </div> */}
          {/* <h4>SH Constructions</h4> */}
          <Box ml={1}></Box>
        </Brand>
        <Scrollbar>
          <List disablePadding>
            <Items>
              {routes3.map((category, index) => (
                <React.Fragment key={index}>
                  {category.header ? (
                    <SidebarSection>{category.header}</SidebarSection>
                  ) : null}

                  {category.children && category.icon ? (
                    <React.Fragment key={index}>
                      <SidebarCategory
                        isOpen={!openRoutes[index]}
                        isCollapsable={true}
                        name={category.id}
                        icon={category.icon}
                        button={true}
                        onClick={() => toggle(index)}
                      />

                      <Collapse
                        in={openRoutes[index]}
                        timeout="auto"
                        unmountOnExit
                      >
                        {category.children.map((route, index) => (
                          <SidebarLink
                            key={index}
                            name={route.name}
                            to={route.path}
                            icon={route.icon}
                            badge={route.badge}
                          />
                        ))}
                      </Collapse>
                    </React.Fragment>
                  ) : category.icon ? (
                    <SidebarCategory
                      isCollapsable={false}
                      name={category.id}
                      to={category.path}
                      activeClassName="active"
                      component={NavLink}
                      icon={category.icon}
                      exact
                      button
                      badge={category.badge}
                    />
                  ) : null}
                </React.Fragment>
              ))}
            </Items>
          </List>
          <Grid
            style={{
              position: "fixed",
              bottom: "0px",
              left: "0px",
              width: "auto",
              // display: "flex",
            }}
          >
            <SidebarFooter>
              <SidebarFooterBadge
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Avatar src="https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg?w=2000" />
                <SidebarFooterText>
                  Hey {userRole.role} Dashboard
                  <SidebarFooterSubText>Hello UserName</SidebarFooterSubText>
                </SidebarFooterText>
              </SidebarFooterBadge>
            </SidebarFooter>
          </Grid>
        </Scrollbar>
      </Drawer>
    );
  }
};

const Sidebar = ({ classes, staticContext, location, ...rest }) => {
  const initOpenRoutes = () => {
    /* Open collapse element that matches current url */
    const pathName = location.pathname;

    let _routes = {};

    if (routes1) {
      routes1.forEach((route, index) => {
        const isActive = pathName.indexOf(route.path) === 0;
        const isOpen = route.open;
        const isHome = route.containsHome && pathName === "/";

        _routes = Object.assign({}, _routes, {
          [index]: isActive || isOpen || isHome,
        });
      });
    } else if (routes2) {
      routes2.forEach((route, index) => {
        const isActive = pathName.indexOf(route.path) === 0;
        const isOpen = route.open;
        const isHome = route.containsHome && pathName === "/";

        _routes = Object.assign({}, _routes, {
          [index]: isActive || isOpen || isHome,
        });
      });
    } else if (routes3) {
      routes3.forEach((route, index) => {
        const isActive = pathName.indexOf(route.path) === 0;
        const isOpen = route.open;
        const isHome = route.containsHome && pathName === "/";

        _routes = Object.assign({}, _routes, {
          [index]: isActive || isOpen || isHome,
        });
      });
    }

    return _routes;
  };

  const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes());

  const toggle = (index) => {
    // Collapse all elements
    Object.keys(openRoutes).forEach(
      (item) =>
        openRoutes[index] ||
        setOpenRoutes((openRoutes) =>
          Object.assign({}, openRoutes, { [item]: false })
        )
    );

    // Toggle selected element
    setOpenRoutes((openRoutes) =>
      Object.assign({}, openRoutes, { [index]: !openRoutes[index] })
    );
  };

  const user = JSON.parse(window.sessionStorage.getItem("user"));

  return getSideBarContent(user, rest, openRoutes, toggle);
};

export default withRouter(Sidebar);
