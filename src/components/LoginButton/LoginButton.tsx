import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginCard() {
  const { data } = useSession();

  if (data?.user) {
    return (
      <div className="login__fab" onClick={() => signOut()}>
        {data.user?.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.user?.image} alt={data.user?.name || ""} />
        )}
        {!data.user?.image && "X"}
      </div>
    );
  } else {
    return (
      <div className="login__fab" onClick={() => signIn("google")}>
        G
      </div>
    );
  }
}
