import React from "react";
import ReactDOM from "react-dom";

import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";

import "./App.css";

function App() {
  const [listItems, setListItems] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [found, setFound] = React.useState();
  const [parent, setParent] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8080/school", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        setListItems(
          Object.keys(res[0].school).map((item) => {
            return res[0].school[item];
          })
        );
      })
      .catch((err) => console.log("error", err));
  }, []);

  console.log(
    "Seach",
    listItems.map((item) => {
      Object.keys(item).filter((value) => {
        if (item["parent"].toLowerCase().includes("tea")) {
          console.log(item[value]);
        }
      });
    })
  );

  const searchStyle = {
    backgroundColor: "rgba(60,60,60)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
  };

  const inputStyle = {
    width: "80%",
    height: "20px",
    padding: "10px",
    fontSize: "18px",
  };

  const resultsStyle = {
    display: search === "" ? "none" : "",
    width: "80%",
    color: "white",
  };

  const Parent = (props) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          padding: "20px",
          border: "2px solid black",
          marginTop: "100px",
        }}
      >
        {props.parent}
      </div>
    );
  };

  const Node = (props) => {
    return (
      <div
        style={{
          width: "50%",
          padding: "10px",
          border: "2px solid black",
          marginTop: "50px",
        }}
      >
        {props.node}
      </div>
    );
  };

  return listItems ? (
    <Router>
      <div id="App">
        <div style={searchStyle}>
          <input
            style={inputStyle}
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);

              listItems.map((item, index) => {
                return Object.keys(item).map((value, index) => {
                  return value === "children" ? (
                    item[value]
                      .filter((data) => {
                        if (data.toLowerCase().includes(search.toLowerCase())) {
                          console.log("Data", data);
                          return data;
                        } else {
                          return null;
                        }
                      })
                      .map((data) => {
                        return item[value].map((newValue) => {
                          if (newValue === data) {
                            setFound(item[value]);
                            return item[value];
                          }
                        });
                      })
                  ) : (
                    <p>No results found</p>
                  );
                });
              });
            }}
          />
          <div style={resultsStyle}>
            <Node node={found} />
          </div>
        </div>

        {listItems.map((item, index) => {
          return Object.keys(item).map((value, index) => {
            return (
              <li
                key={"object-keys-final" + index}
                style={{ marginTop: "50px" }}
              >
                {value === "parent" ? (
                  <div>
                    <Switch>
                      <Route path={`/${item[value]}`}>
                        <div>
                          <Parent parent={item[value]} />
                        </div>
                      </Route>
                    </Switch>
                  </div>
                ) : (
                  <ul>
                    {item[value].map((values, indices) => {
                      return (
                        <li
                          key={"map-array-values" + indices}
                          onClick={() => {
                            setParent(values);
                          }}
                        >
                          <Link to={`/${values}`}>
                            <div>
                              <Node node={values} />
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          });
        })}
      </div>
    </Router>
  ) : (
    <p>Loading . . .</p>
  );
}

export default App;
