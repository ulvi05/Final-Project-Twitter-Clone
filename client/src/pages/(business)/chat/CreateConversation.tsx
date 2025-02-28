import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { selectUserData } from "@/store/features/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import conversationService from "@/services/conversation";
import { getUserId } from "@/utils";
import { QUERY_KEYS } from "@/constants/query-keys";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
});

export const CreateConversation = () => {
  const { user } = useSelector(selectUserData);
  const userId = getUserId(user);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || "",
      name: user?.fullName ? `${user?.fullName}` : "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: conversationService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_CONVERSATION],
      });
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate({
      userEmail: data.email,
      userName: data.name,
      userId,
    });
  }

  return (
    <div className="p-4">
      <h1 className="mt-3 text-2xl font-semibold text-muted-foreground">
        Need help? Start a conversation.
      </h1>
      <p className="my-3 text-primary">
        Fill out the form below for starting a conversation with our support
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="form-control">
          <label className="label">
            <span className="text-lg font-medium label-text">Full Name</span>
          </label>
          <input
            disabled={!!user}
            placeholder="John Doe"
            className="w-full input input-bordered input-primary"
            {...form.register("name")}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-lg font-medium label-text">Email</span>
          </label>
          <input
            disabled={!!user}
            placeholder="name@example.com"
            className="w-full input input-bordered input-primary"
            {...form.register("email")}
          />
        </div>

        <button
          type="submit"
          className="w-full btn btn-primary"
          disabled={isPending}
        >
          Start Conversation
        </button>
      </form>
    </div>
  );
};
