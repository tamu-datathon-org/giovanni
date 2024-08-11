import { useState } from "react";
import { Suspense } from "react";

import { api } from "~/trpc/server";
import { AuthShowcase } from "./_components/auth-showcase";
import {
  CreatePostForm,
  PostCardSkeleton,
  PostList,
} from "./_components/posts";

export const runtime = "edge";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <AuthShowcase />
            <CreatePostForm />
            <div className="w-full max-w-2xl overflow-y-scroll">
              <Suspense
                fallback={
                  <div className="flex w-full flex-col gap-4">
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                  </div>
                }
              >
                <PostList posts={api.post.all()} />
              </Suspense>
            </div>
          </>
        );
      case "blog":
        return <div>Blog content goes here</div>;
      case "faq":
        return <div>FAQ content goes here</div>;
      case "organization":
        return <div>Organization page content goes here</div>;
      default:
        return null;
    }
  };

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> Turbo
        </h1>
        <nav className="flex gap-4">
          <button onClick={() => setActiveTab("dashboard")}>Login/Dashboard</button>
          <button onClick={() => setActiveTab("blog")}>Link to the blog</button>
          <button onClick={() => setActiveTab("faq")}>FAQ</button>
          <button onClick={() => setActiveTab("organization")}>Link to the organization page</button>
        </nav>
        {renderContent()}
      </div>
    </main>
  );
}