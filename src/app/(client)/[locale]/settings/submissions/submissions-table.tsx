"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatDate } from "@/lib/utils";
import { Submission } from "@/lib/zod/submission";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteSubmissionAction } from "@/lib/sanity/actions/contact";
import { useOptimistic, useState } from "react";

export default function SubmissionsTable({
  submissions,
}: {
  submissions: Submission[];
}) {
  const [optimisticSubmissions, deleteOptimisticSubmission] = useOptimistic<
    Submission[],
    string
  >(submissions, (prev, id) =>
    prev.filter((submission) => submission._id !== id),
  );

  const [open, setOpen] = useState(false);

  const handleDelete = async (id: string) => {
    deleteOptimisticSubmission(id);
    deleteSubmissionAction(id)
      .then((data) => {
        if (data?.error) {
          console.error(data.error);
        }
      })
      .catch(() => console.error("Something went wrong"));
  };

  return (
    <>
      <Table>
        <TableCaption>A list of your submissions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {optimisticSubmissions.map((submission) => (
            <TableRow key={submission._id}>
              <TableCell>{formatDate(submission._createdAt)}</TableCell>
              <TableCell>{submission.name}</TableCell>
              <TableCell>{submission.email}</TableCell>
              <TableCell>{submission.message}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>...</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => setOpen(true)}
                      className="cursor-pointer"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Submission?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                      variant="destructive"
                      data-test-id="delete-submission-button"
                      onClick={() => handleDelete(submission._id)}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

function SubmissionDeleteAlertDialog({
  open,
  setOpen,
  submission,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  submission: Submission;
}) {
  const handleDelete = async () => {
    deleteSubmissionAction(submission._id)
      .then((data) => {
        if (data?.error) {
          console.error(data.error);
        }
      })
      .catch(() => console.error("Something went wrong"));
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Submission?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            data-test-id="delete-submission-button"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
