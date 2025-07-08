"use client";
import { useSearchUsers } from "@/hooks/useSearchUsers";
import { SearchForm } from "@/components/molecules/SearchForm";
import { UserCard } from "@/components/molecules/UserCard";

export default function Home() {
  const searchState = useSearchUsers();

  return (
    <main className="p-8 space-y-8">
      <SearchForm {...searchState} />
      <div className="grid gap-4">
        {searchState.results.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </main>
  );
}
