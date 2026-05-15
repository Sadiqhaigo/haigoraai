"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import AppButton from "@/components/ui/AppButton";

interface Props {
  userId: string;

  userName: string;

  currentUserId: string;
}

export default function UserActions({
  userId,
  userName,
  currentUserId,
}: Props) {
  const router = useRouter();

  const handleDelete =
    async () => {
      const confirmed =
        confirm(
          `Delete ${userName}? This action cannot be undone.`
        );

      if (!confirmed) return;

      try {
        const res =
          await fetch(
            `/api/admin/delete-user?id=${userId}`,
            {
              method: "POST",
            }
          );

          if (
            !res.ok &&
            res.status !== 307
          ) {
            throw new Error(
              "Failed to delete user"
            );
          }

        router.refresh();

      } catch (error) {
        alert(
          "Failed to delete user"
        );
      }
    };

  return (
    <div
      style={{
        display: "flex",

        gap: 10,

        flexWrap: "wrap",
      }}
    >
      <Link
        href={`/admin/users/${userId}`}
      >
        <AppButton>
          View
        </AppButton>
      </Link>

      {currentUserId !==
        userId && (
        <AppButton
          variant="danger"
          onClick={
            handleDelete
          }
        >
          Delete
        </AppButton>
      )}
    </div>
  );
}