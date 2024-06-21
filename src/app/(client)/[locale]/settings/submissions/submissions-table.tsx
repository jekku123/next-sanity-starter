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
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatDate } from "@/lib/utils";
import { Submission } from "@/lib/zod/submission";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteSubmissionAction } from "@/lib/sanity/actions/contact";
import { useOptimistic, useState, useTransition } from "react";

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
  const [_isPending, startTransition] = useTransition();

  const handleDelete = async (id: string) => {
    startTransition(() => {
      deleteOptimisticSubmission(id);
    });
    await deleteSubmissionAction(id);
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
              <SubmissionDeleteAlertDialog
                open={open}
                setOpen={setOpen}
                handleDelete={() => handleDelete(submission._id)}
              />
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
  handleDelete,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleDelete: () => Promise<void>;
}) {
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
          <AlertDialogAction
            data-test-id="delete-submission-button"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
