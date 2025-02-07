import React from "react";
import { SIDE_OPTIONS } from "./options";
import Option from "./option";
import { useSession } from "next-auth/react";
import SignIn from "./SignIn";

const Sidebar = () => {
  const { status } = useSession();
  const isAuthenticating = status === "authenticated";
  return (
    <div className="flex w-72 flex-col border-r p-4">
      <h1 className="text-2xl font-semibold">Pawnder</h1>
      <nav className="flex-grow">
        <ul className="mt-10 flex flex-col gap-y-2 text-gray-600">
          {SIDE_OPTIONS.map((option, index) => {
            return <Option key={index} {...option} />;
          })}
        </ul>
      </nav>
      <footer>{!isAuthenticating ? <SignIn /> : <></>}</footer>
    </div>
  );
};

export default Sidebar;
