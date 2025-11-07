"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";

export default function OrganizerPage() {
  const [email, setEmail] = useState("");

  const { data: organizers, refetch } = api.organizer.getAll.useQuery();
  const addOrganizerMutation = api.organizer.add.useMutation({
    // `data` will be either { success: true } or { success: false, alreadyExists: true, message }
    onSuccess: (data: any) => {
      console.debug("organizer.add onSuccess data:", data);
      if (data?.alreadyExists) {
        console.debug("organizer.add: alreadyExists -> showing toast");
        // Show a friendly notification instead of surfacing a tRPC error
        toast.error(data.message ?? "User is already an organizer");
        return;
      }
      toast.success("Organizer added successfully!");
      setEmail("");
      refetch();
    },
    onError: (error: any) => {
      console.debug("organizer.add onError:", error);
      const msg = error instanceof Error ? error.message : String(error);
      toast.error(msg);
    },
  });

  const removeOrganizerMutation = api.organizer.remove.useMutation({
    onSuccess: () => {
      toast.success("Organizer removed successfully!");
      refetch();
    },
    onError: (error: any) => {
      const msg = error instanceof Error ? error.message : String(error);
      toast.error(msg);
    },
  });

  const handleAddOrganizer = async (e: React.FormEvent) => {
    e.preventDefault();
    addOrganizerMutation.mutate({ email });
  };

  const handleRemoveOrganizer = async (userId: string) => {
    removeOrganizerMutation.mutate({ userId });
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Organizer Management</CardTitle>
          <CardDescription>
            Add or remove organizers from the event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddOrganizer} className="mb-8 flex gap-4">
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" disabled={addOrganizerMutation.isLoading}>
              {addOrganizerMutation.isLoading ? "Adding..." : "Add Organizer"}
            </Button>
          </form>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizers?.map((organizer: any) => (
                <TableRow key={organizer.id}>
                  <TableCell>{organizer.name}</TableCell>
                  <TableCell>{organizer.email}</TableCell>
                  <TableCell>{organizer.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={removeOrganizerMutation.isLoading}
                      onClick={() => handleRemoveOrganizer(organizer.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
