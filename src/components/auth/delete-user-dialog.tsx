import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteUserAction } from "@/lib/next-auth/actions/delete-user";
import { logout } from "@/lib/next-auth/actions/logout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export const deleteSchema = z.object({
  confirm: z.string().refine((v) => v === "Delete", {
    message: "Please type 'Delete' to confirm",
  }),
});

export function DeleteUserDialog({
  userId,
  open,
  setOpen,
}: {
  userId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const form = useForm<z.infer<typeof deleteSchema>>({
    resolver: zodResolver(deleteSchema),
    defaultValues: {
      confirm: "",
    },
  });

  async function onSubmit() {
    const res = await deleteUserAction({ userId });
    if (res.error) {
      console.error(res.error);
    }
    await logout();
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Account?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type &quot;Delete&quot; to confirm</FormLabel>
                  <FormControl>
                    <Input data-test-id="delete-user-confirm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                type="submit"
                variant="destructive"
                data-test-id="delete-user-button"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
