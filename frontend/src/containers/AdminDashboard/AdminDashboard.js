import HOC from "../../hoc/userHoc";
import Inventory from "../../components/Inventory/Inventory";
import UpdateBook from "../../components/UpdateBook/UpdateBook";
import { Switch, Route } from "react-router-dom";
import Construction from "../../components/Construction/Construction";

const AdminDashboard = (props) => {
  return (
    <HOC type="admin" name={props.data.email}>
      <Switch>
        <Route
          path="/admin/inventory/book/:bid"
          render={() => <UpdateBook data={props.data} />}
        />
        <Route
          path="/admin/inventory"
          render={() => <Inventory type="admin" />}
        ></Route>
        <Route path="/admin/users" render={() => <Construction />}></Route>
      </Switch>
    </HOC>
  );
};

export default AdminDashboard;
