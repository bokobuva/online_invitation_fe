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
    fetch(`https://online-invitation-be.onrender.com/${guestName}`)
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
    fetch(`https://online-invitation-be.onrender.com/${guestName}`)
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
        {isError ? (
          <div className="errorContainer">
            <p>
              Вашиот одговор не успеавме успешно да го запишеме, ве молиме
              обидете се повторно или извести лично
            </p>

            <button onClick={() => setIsError(false)}>Обиди се повторно</button>
          </div>
        ) : isSuccess ? (
          <div className="successContainer">
            <p>Вашиот одговор успешно е испратен, ви благодариме</p>
          </div>
        ) : (
          <div className="invitationContainer">
            <Link to="/list">List</Link>
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

            <div className="buttonsContainer">
              <button className="acceptButton" onClick={handleAccept}>
                Ќе дојдеме
              </button>
              <button className="denyButton" onClick={handleDeny}>
                Не можеме
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
