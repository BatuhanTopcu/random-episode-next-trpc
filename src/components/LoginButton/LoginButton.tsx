import type { Session } from "next-auth";

type ILoginButtonProps = {
  data: Session | null;
  click: () => void;
  loggedClick: () => void;
};

export default function LoginButton({
  data,
  click,
  loggedClick,
}: ILoginButtonProps) {
  if (data?.user) {
    return (
      <div className="login__fab" onClick={loggedClick}>
        {data.user?.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="cover"
            src={data.user?.image}
            alt={data.user?.name || ""}
          />
        )}
        {!data.user?.image && "X"}
      </div>
    );
  } else {
    return (
      <div className="login__fab" onClick={click}>
        G
      </div>
    );
  }
}
