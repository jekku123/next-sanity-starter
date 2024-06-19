import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Submission } from "@/lib/zod/submission";

export default function SubmissionsTable({
  submissions,
}: {
  submissions: Submission[];
}) {
  return (
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
        {submissions.map((submission) => (
          <TableRow key={submission._id}>
            <TableCell>{formatDate(submission._createdAt)}</TableCell>
            <TableCell>{submission.name}</TableCell>
            <TableCell>{submission.email}</TableCell>
            <TableCell>{submission.message}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
