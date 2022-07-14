import type { Show } from "@types";
import { useEffect, useState } from "react";

export const useLocalShows = (): [Show[], (shows: Show[]) => void] => {
  const [localShows, setLocalShowsState] = useState<Show[]>([]);

  const setLocalShows = (shows: Show[]) => {
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
    const temp = JSON.parse(e.newValue || "[]");
    setLocalShowsState(temp);
  };

  useEffect(() => {
    const temp = localStorage.getItem("shows");
    setLocalShowsState(temp ? JSON.parse(temp) : []);
    window.addEventListener("storage", storageListener);
    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, []);

  return [localShows, setLocalShows];
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
