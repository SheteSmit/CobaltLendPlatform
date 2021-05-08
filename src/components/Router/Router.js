import { BrowserRouter, Switch, Route } from "react-router-dom";
import Swap from "../exchange";
import Bank from "../../pages/Bank/Bank";
import DashBoardHome from "../../pages/dashboard";
import Voting from "../../pages/Voting/Voting";
import Singlevote from "../../pages/Voting/Singlevote";

export default function Router() {
  return (
    <>
      <Switch>
        <Route exact path="/singlevote" component={Singlevote} />
        <Route exact path="/voting" component={Voting} />
        <Route path="/chromium" component={Swap} />
        <Route path="/" component={DashBoardHome} />
      </Switch>
    </>
  );
}
