import React from "react";
import { useNavigation } from "@react-navigation/native";

function NotFound() {
  const navigation = useNavigation();

  // send user route history to backend
  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/notfound", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ route: navigation.getCurrentRoute() }),
    });
  }, [navigation]);

  return (
    <div className="NotFound">
      <header className="NotFound-header">
        <p>🚧Under Construction🚧</p>
      </header>
    </div>
  );
}

export default NotFound;
