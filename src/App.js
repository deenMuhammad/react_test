import logo from "./logo.svg";
import "./App.css";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { useEffect } from "react";
const MUTATE_FIRE_EVENT = gql`
  mutation fireEvent($eventType: String!) {
    fireEvent(eventType: $eventType)
  }
`;
const SUBSCRIBE_FIRE_EVENT = gql`
  subscription {
    onEvent {
      eventType
      date
    }
  }
`;
function App() {
  const [fireEvent, { data, loading, error }] = useMutation(MUTATE_FIRE_EVENT);
  const { data: sub_data, loading: sub_loading } = useSubscription(SUBSCRIBE_FIRE_EVENT);
  useEffect(()=>{
    if(!sub_loading){
      console.log('%cApp.js line:22 sub_data', 'color: #007acc;', sub_data);
    }
    else{
      console.log('%cApp.js line:26 sub_loading', 'color: #007acc;', sub_loading);
    }
  }, [sub_data])
  const mutate = () => {
    fireEvent({ variables: { eventType: "Fired the event" } });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div
          onClick={mutate}
          style={{
            width: 100,
            height: 100,
            background: "red",
            cursor: "pointer",
          }}
        >
          Mutate
        </div>
        {data && <div>{JSON.stringify(data)}</div>}
      </header>
    </div>
  );
}

export default App;
