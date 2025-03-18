"use client";
import { api } from "@/trpc/react";

const TestTRPC = () => {
  const { data, error, isLoading } = api.test.testQuery.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {!data}
    </div>
  );
}

export default TestTRPC;