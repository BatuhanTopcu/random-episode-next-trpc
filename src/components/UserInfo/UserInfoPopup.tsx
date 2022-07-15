import { useState } from "react";
import Popup from "@components/Popup";
import LoginButton from "@components/LoginButton";
import { useSession, signIn, signOut } from "next-auth/react";
import { trpc } from "@utils/trpc";

type IUserInfoPopupProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export default function UserInfoPopup({ show, setShow }: IUserInfoPopupProps) {
  const { data } = useSession();
  const mutation = trpc.useMutation("user.delete-user");

  const handleDeleteUser = async () => {
    const { success } = await mutation.mutateAsync();
    if (success) {
      window.location.reload();
    }
  };

  return (
    <>
      <LoginButton
        data={data}
        click={() => signIn("google")}
        loggedClick={() => setShow(true)}
      />
      {show && (
        <Popup title="My Account" close={() => setShow(false)}>
          <div className="user-info">
            {data?.user?.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="profile-picture"
                src={data?.user?.image}
                alt="user picture"
              />
            )}
            <h1>{data?.user?.name}</h1>
            <h2>{data?.user?.email}</h2>
            <div className="button-container">
              <div className="button__delete" onClick={handleDeleteUser}>
                Delete Account
              </div>
              <div className="button__logout" onClick={() => signOut()}>
                Logout
              </div>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
}
