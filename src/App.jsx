import { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const guestName =
    new URLSearchParams(document.location.search)
      .get("guest_name")
      ?.replace(/_/g, " ") ?? null;
  const isGuestPlural = guestName?.split(" ")?.length > 1;

  console.log(isGuestPlural);
  const handleAccept = () => {
    fetch(
      `https://online-invitation-be.onrender.com/accept/${guestName.replace(
        " ",
        "_"
      )}`
    )
      .then((response) => {
        if (response.status !== 200) {
          return setIsError(true);
        }
        setIsSuccess(true);
      })
      .catch(() => {
        console.log("happens");
        setIsError(true);
      });
  };
  const handleDeny = () => {
    fetch(
      `https://online-invitation-be.onrender.com/deny/${guestName.replace(
        " ",
        "_"
      )}`
    )
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.status);
          setIsError(true);
          return;
        }
        return setIsSuccess(true);
      })
      .catch(() => setIsError(true));
  };
  return (
    <main className="main">
      <div className="mainActionContainer">
        <div className="overlay"></div>
        <div className="invitationContainer">
          <h4>Здраво {guestName}</h4>
          <h4>Илин {isGuestPlural ? "ве" : "те"} поканува на неговиот</h4>
          <h2>5-ти РОДЕНДЕН</h2>

          <p>Во Среда на 26-ти Јуни 2024 од 19:30ч до 21:30ч</p>
          <p>
            Локација: &nbsp;
            <a
              href="https://maps.app.goo.gl/Lxwqjxb4JLkCkj4AA"
              target="_blank"
              rel=""
            >
              Игротека Старс
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
