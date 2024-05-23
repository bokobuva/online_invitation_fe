import { useEffect, useState } from "react";

const GuestList = () => {
  const [guestList, setGuestList] = useState({ accepted: [], denied: [] });
  useEffect(() => {
    fetch("https://online-invitation-be.onrender.com/")
      .then((response) => response.json())
      .then((response) => {
        setGuestList(response);
      });
  }, [setGuestList]);
  return (
    <main>
      <div className="guestListContainer">
        <div className="overlay"></div>
        <h4>Accepted: </h4>
        <ol>
          {guestList.accepted.length > 0 &&
            guestList.accepted.map((acceptedGuest, index) => {
              return <li key={index}>{acceptedGuest}</li>;
            })}
        </ol>
      </div>
      <div className="guestListContainer">
        <div className="overlay"></div>
        <h4>Denied: </h4>
        <ol>
          {guestList?.denied.length > 0 &&
            guestList.denied.map((deniedGuest, index) => {
              return <li key={index}>{deniedGuest}</li>;
            })}
        </ol>
      </div>
    </main>
  );
};

export default GuestList;
