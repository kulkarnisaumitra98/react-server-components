"use client";

import { useTransition } from "react";
import { useRouter } from "../../framework/client/utils.js";

export const FetchNoteButton = () => {
  const [isPending, startTransition] = useTransition();
  const { refresh } = useRouter();

  const refreshPage = () => {
    if (!isPending) {
      startTransition(() => {
        refresh?.("/");
      });
    }
  };

  return (
    <div className="homage__fetch_random_note" onClick={refreshPage}>
      <span>{isPending ? "Fetching..." : "Fetch random note"}</span>
    </div>
  );
};
