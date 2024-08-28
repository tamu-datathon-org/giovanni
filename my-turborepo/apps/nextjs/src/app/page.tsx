import { Suspense } from "react";
import Link from "next/link";

import { api } from "~/trpc/server";
import { AuthShowcase } from "./_components/auth-showcase";
import {
  CreatePostForm,
  PostCardSkeleton,
  PostList,
} from "./_components/posts";

export const runtime = "edge";

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  const posts = api.post.all();

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> Turbo
        </h1>
        <AuthShowcase />

        <nav className="flex flex-row items-center gap-4">
          <Link href="/login">
            <a className="text-lg font-semibold text-blue-500">Login/Dashboard</a>
          </Link>
          <Link href="/blog">
            <a className="text-lg font-semibold text-blue-500">Blog</a>
          </Link>
          <Link href="/faq">
            <a className="text-lg font-semibold text-blue-500">FAQ</a>
          </Link>
          <Link href="https://tamudatathon.com/">
            <a className="text-lg font-semibold text-blue-500">Main Datathon Page</a>
          </Link>
        </nav>

        {/* <CreatePostForm />
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
            <PostList posts={posts} />
          </Suspense>
        </div> */}
      </div>
    </main>
  );
}