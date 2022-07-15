import type { Show } from "@types";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";

export const useShows = (): [Show[], (shows: Show[]) => void] => {
  const [shows, setShowsState] = useState<Show[]>([]);
  const session = useSession();

  const mutation = trpc.useMutation("show.set-shows");

  const setShows = (shows: Show[]) => {
    const localStorageShows = localStorage.getItem("shows") || "[]";
    const newShows = JSON.stringify(shows);
    if (localStorageShows !== newShows) {
      localStorage.setItem("shows", newShows);
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "shows",
          oldValue: localStorageShows,
          newValue: newShows,
        })
      );
    }
  };

  const storageListener = (e: StorageEvent) => {
    if (e.key !== "shows") return;
    const shows = e.newValue || "[]";
    const temp = JSON.parse(shows) as Show[];
    setShowsState(temp);
    if (session?.status === "authenticated") {
      mutation.mutate({ shows: temp });
    }
  };

  useEffect(() => {
    const temp = localStorage.getItem("shows");
    setShowsState(temp ? JSON.parse(temp) : []);
    window.addEventListener("storage", storageListener);
    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, []);

  return [shows, setShows];
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
