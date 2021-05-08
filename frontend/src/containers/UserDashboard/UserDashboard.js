import HOC from "../../hoc/userHoc";
import Inventory from "../../components/Inventory/Inventory";
import UpdateBook from "../../components/UpdateBook/UpdateBook";
import { Switch, Route } from "react-router-dom";
import Construction from "../../components/Construction/Construction";

const UserDashboard = (props) => {
  return (
    <HOC type="user" name={props.data.name}>
      <Switch>
        <Route path="/user/orders" render={() => <Construction />}></Route>
        <Route
          path="/user/inventory/book/:bid"
          render={() => <UpdateBook data={props.data} />}
        />
        <Route
          path="/user/inventory"
          render={() => <Inventory type="user" />}
        ></Route>
      </Switch>
    </HOC>
  );
};

export default UserDashboard;
