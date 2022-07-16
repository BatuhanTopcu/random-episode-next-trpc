import Popup from "@components/Popup";
import LoginButton from "@components/LoginButton";
import ThemeSwitch from "@components/ThemeSwitch";
import { useSession, signIn, signOut } from "next-auth/react";
import { trpc } from "@utils/trpc";
import usePopupStore from "@store/popupStore";
import shallow from "zustand/shallow";

export default function Settings() {
  const { show, setShow } = usePopupStore(
    (state) => ({ show: state.showUserInfo, setShow: state.setShowUserInfo }),
    shallow
  );

  const { data, status } = useSession();
  const mutation = trpc.useMutation("user.delete-user");

  const handleDeleteUser = async () => {
    const { success } = await mutation.mutateAsync();
    if (success) {
      window.location.reload();
    }
  };

  return (
    <>
      <LoginButton click={() => setShow(true)} />
      {show && (
        <Popup title="Settings" close={() => setShow(false)}>
          {status === "authenticated" && (
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
            </div>
          )}
          <ThemeSwitch />
          <div className="button-container">
            {status === "authenticated" && (
              <>
                <div className="button__delete" onClick={handleDeleteUser}>
                  Delete Account
                </div>
                <div className="button__logout" onClick={() => signOut()}>
                  Logout
                </div>
              </>
            )}
            {status !== "authenticated" && (
              <div className="button__login" onClick={() => signIn("google")}>
                Login with Google
              </div>
            )}
          </div>
        </Popup>
      )}
    </>
  );
}
