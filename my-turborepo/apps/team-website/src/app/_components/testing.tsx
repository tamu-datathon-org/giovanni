"use client";

import React from "react";

import { api } from "~/trpc/react";

export const Testing = () => {
  const [userInput, setUserInput] = React.useState<string | null>(null);

  const queryEmails = api.email.getEmailByLabel.useQuery(userInput || "", {
    enabled: !!userInput,
    retry: false,
  });

  const handleSubmit = (data: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(data.currentTarget);
    const userId = formData.get("userInput") as string;
    setUserInput(userId);
  };

  React.useEffect(() => {
    if (queryEmails.data) {
      console.log(queryEmails.data);
    }
  }, [queryEmails.data]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <input type="text" name="userInput" />
      <button type="submit">Submit</button>
    </form>
  );
};
