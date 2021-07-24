import React, { useState } from "react";

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const [userList, setUserList] = useState([]);

  // handle click event of the logout button
  const handleLogout = () => {};

  return (
    <div>
      Welcome!
      <br />
      <br />
      <input type="button" onClick={handleLogout} value="Logout" />
      <br />
      <br />
      <input type="button" value="Get Data" />
      <br />
      <br />
      <b>User List:</b>
      <pre>{JSON.stringify(userList, null, 2)}</pre>
    </div>
  );
};
