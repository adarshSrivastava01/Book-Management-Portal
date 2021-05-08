import { Route, Redirect, Switch } from "react-router-dom";

import "./App.css";
import UserLogin from "./Auth/UserLogin/UserLogin";
import AdminDashboard from "./containers/AdminDashboard/AdminDashboard";
import UserDashboard from "./containers/UserDashboard/UserDashboard";
import { useState } from "react";
import Home from "./components/Home/Home";
import { useHistory } from "react-router-dom";
function App() {
  const [data, setData] = useState({});
  const rout = useHistory();
  console.log(rout);
  // const setAuth = (data, type) => {
  //   setData(data);
  // };
  function setAuth(data, type) {
    setData(data);
    console.log(rout);
    let x = type == "admin" ? "/admin/inventory" : "/user/inventory";
    console.log(x);
    rout.push(x);
  }
  return (
    <>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/login"
            render={() => (
              <UserLogin
                isSignup={false}
                setAuth={setAuth}
                type="user"
                heading={"User Dashboard"}
              />
            )}
          />
          <Route
            path="/signup"
            render={() => (
              <UserLogin
                isSignup={true}
                setAuth={setAuth}
                type="user"
                heading={"User Dashboard"}
              />
            )}
          />
          <Route
            path="/admin"
            exact
            render={() => (
              <UserLogin
                setAuth={setAuth}
                type="admin"
                isSignup={false}
                heading={"Admin Dashboard"}
              />
            )}
          />
          {
           ( Object.keys(data).length>0 && data["admin"]==false) && (
            <Route
            path="/user"
            render={() => (
              <UserDashboard data={data} user={data["name"]} />
            )}
          />
           )
          }
          {Object.keys(data).length > 0 && data["admin"] && (
            <Route
              path="/admin"
              render={() => (
                <AdminDashboard data={data} user={data["email"]} />
              )}
            />
          )}

          {/* <Route path="/signup" render={() => <UserLogin isSignup={true} />} /> */}
            
          <Route path="*" component={() => <h1>404</h1>} />
        </Switch>
      </div>
    </>
  );
}

export default App;
