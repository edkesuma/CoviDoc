import { DarkThemeToggle } from "flowbite-react";

function Cookie() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      <h1 className="text-2xl dark:text-white">
        Cookie
      </h1>
      <DarkThemeToggle />
    </main>
  );
}

export default Cookie;
