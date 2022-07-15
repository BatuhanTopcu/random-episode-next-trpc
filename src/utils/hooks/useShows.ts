import type { Show } from "@types";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";

export const useShows = () => {
  const [shows, setShowsState] = useState<Show[]>([]);
  const session = useSession();

  const mutation = trpc.useMutation("show.set-shows");

  const { data, isLoading } = trpc.useQuery(["show.get-shows"], {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: session?.status === "authenticated" ? true : false,
  });

  const showsLoading = isLoading || session.status === "loading";

  const storageListener = async (e: StorageEvent) => {
    if (e.key !== "shows") return;
    const shows = e.newValue || "[]";
    const temp = JSON.parse(shows) as Show[];
    setShowsState(temp);
    if (session?.status === "authenticated") {
      await mutation.mutateAsync({ shows: temp });
    }
  };

  useEffect(() => {
    if (showsLoading) return;
    if (session.status === "unauthenticated") {
      const temp = localStorage.getItem("shows");
      setShowsState(temp ? JSON.parse(temp) : []);
    }
    if (session.status === "authenticated") {
      const dbShows = data?.shows || [];
      const temp = localStorage.getItem("shows");
      const localShows = temp ? JSON.parse(temp) : [];
      if (dbShows.length > 0) {
        setShowsState(dbShows);
      } else {
        setShowsState(localShows);
      }
    }
  }, [data?.shows, session.status]);

  useEffect(() => {
    window.addEventListener("storage", storageListener);
    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, []);

  return { shows, showsLoading };
};

export const addRemoveShow = (show: Show) => {
  const temp = localStorage.getItem("shows");
  const localShows: Show[] = temp ? JSON.parse(temp) : [];
  const newShows =
    localShows.findIndex((s) => s.id === show.id) !== -1
      ? localShows.filter((s: Show) => s.id !== show.id)
      : [...localShows, show];
  localStorage.setItem("shows", JSON.stringify(newShows));
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: "shows",
      oldValue: temp,
      newValue: JSON.stringify(newShows),
    })
  );
};

export const clearShows = () => {
  localStorage.setItem("shows", JSON.stringify([]));
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: "shows",
      oldValue: localStorage.getItem("shows"),
      newValue: JSON.stringify([]),
    })
  );
};
