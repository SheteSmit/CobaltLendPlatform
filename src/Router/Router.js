import { Switch, Route } from "react-router-dom"
import Chromium from "../pages/Chromium"
import Staking from "../pages/Staking"
import Treasury from "../pages/Treasury/Treasury"
import DashBoardHome from "../pages/Dashboard"
import VotingNew from "../pages/VotingNew"
import Analytics from "../pages/Analytics"
import Borrow from "../pages/Borrow"
import Catalyst from "../pages/Catalyst"
import Lottery from "../pages/Lottery"
import Testing from "../pages/Testing"
import RegistrationPortal from "../pages/RegistrationPortal"
import Chronicle from "../pages/Chronicle"
import Profile from "../pages/Profile"
import Roadmap from "../pages/Roadmap"
import CLP from "../pages/Clp"
import VotingInfo from "../pages/VotingInfo"
import { DataProvider } from "../GlobalState"
import CatalystUser from "../pages/Catalyst/CatalystUser"

export default function Router() {
  return (
    <>
      <Switch>
        <DataProvider>
          <Route exact path="/registration-portal" component={RegistrationPortal} />
          <Route exact path="/voting" component={VotingNew} />
          <Route exact path="/analytics" component={Analytics} />
          <Route exact path="/lottery" component={Lottery} />
          <Route exact path="/borrow" component={Borrow} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/roadmap" component={Roadmap} />
          <Route exact path="/test" component={Testing} />
          <Route path="/chromium" component={Chromium} />
          <Route exact path={`/voting/:id`} component={VotingInfo} />
          <Route exact path="/catalyst/user" component={CatalystUser} />
          <Route path="/Staking" component={Staking} />
          <Route exact path="/catalyst" component={Catalyst} />
          <Route path="/chronicle" component={Chronicle} />
          <Route path="/treasury" component={Treasury} />
          <Route path="/clp" component={CLP} />
          <Route exact path="/" component={DashBoardHome} />
        </DataProvider>
      </Switch>
    </>
  )
}
