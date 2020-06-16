import React, {useState} from 'react';
import TogglSideNav from "./ToggleSideNav";
import TopNav from "./components/topnav/TopNav";
import SideNav from "./components/sidenav/SideNav";
import Main from "./components/main/Main";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/main/main-components/Home"

import Clients from "./components/main/main-components/Clients";
import Subcontractors from "./components/main/main-components/Subcontractors";
import Sites from "./components/main/main-components/Sites";



function App() {

  const [hideSidebar, setHideSidebar] = useState(false);

  function toggleSidebar(event) {
    event.preventDefault();
    setHideSidebar(!hideSidebar);
  }

/**********************************************https://reactjs.org/docs/context.html****************************************************************************/
  return (
    <div className="App">
      <Router>
        <TopNav
          href={"/"} 

        />
        <SideNav 
          sideNavClass={hideSidebar ? "sideNavClassHide" : "sideNavClassShow"}
          /*Dropdown Head Addable Classes*/
          leftMenuIconClass={hideSidebar ? "leftMenuIconClassHide" : "leftMenuIconClassShow"}
          menuTextClass={hideSidebar ? "menuTextClassHide" : "menuTextClassShow"}
          rightMenuIconClass={hideSidebar ? "rightMenuIconClassHide" : "rightMenuIconClassShow"}

          /*Dropdown Submenu Addable Classes*/
          subMenuIconClass={hideSidebar ? "subMenuIconClassHide" : "subMenuIconClassShow"}
          subMenuTextClass={hideSidebar ? "subMenuTextClassHide" : "subMenuTextClassShow"}
        />
        <TogglSideNav
          onClick={toggleSidebar}
          sideNavToggleBtnClass={hideSidebar ? "sideNavToggleBtnClassHide" : "sideNavToggleBtnClassShow"}
          arrowDirection={hideSidebar ? "keyboard_arrow_right" : "keyboard_arrow_left"}
        />
        <Main 
          mainContainerClass={hideSidebar ? "mainContainerClassHide" : "mainContainerClassShow"}
        >
          <Route 
            path="/"
            exact
            component={Home}
          />
          <Route
              path="/Clients"
              exact 
              component={Clients}
          />
          <Route
              path="/Subcontractors"
              exact 
              component={Subcontractors}
          />
            <Route
              path="/Sites"
              exact 
              component={Sites}
          />
        </Main>
      </Router>
    </div>
  );
}

export default App;
