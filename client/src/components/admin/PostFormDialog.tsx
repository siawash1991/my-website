import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const postFormSchema = z.object({
  titleEn: z.string().min(1, "English title is required"),
  titleFa: z.string().min(1, "عنوان فارسی الزامی است"),
  excerptEn: z.string().min(1, "English excerpt is required"),
  excerptFa: z.string().min(1, "خلاصه فارسی الزامی است"),
  contentEn: z.string().min(1, "English content is required"),
  contentFa: z.string().min(1, "محتوای فارسی الزامی است"),
  categoryEn: z.string().min(1, "English category is required"),
  categoryFa: z.string().min(1, "دسته‌بندی فارسی الزامی است"),
  readTime: z.coerce.number().min(1, "Read time must be at least 1 minute"),
  date: z.string().min(1, "Date is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  articleUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type PostFormData = z.infer<typeof postFormSchema>;

interface PostFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post?: Post | null;
}

export function PostFormDialog({ open, onOpenChange, post }: PostFormDialogProps) {
  const { toast } = useToast();
  const isEdit = !!post;

  const form = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      titleEn: "",
      titleFa: "",
      excerptEn: "",
      excerptFa: "",
      contentEn: "",
      contentFa: "",
      categoryEn: "",
      categoryFa: "",
      readTime: 5,
      date: new Date().toISOString().split("T")[0],
      thumbnail: "default",
      articleUrl: "",
    },
  });

  useEffect(() => {
    if (post) {
      form.reset({
        titleEn: post.titleEn,
        titleFa: post.titleFa,
        excerptEn: post.excerptEn,
        excerptFa: post.excerptFa,
        contentEn: post.contentEn,
        contentFa: post.contentFa,
        categoryEn: post.categoryEn,
        categoryFa: post.categoryFa,
        readTime: post.readTime,
        date: post.date,
        thumbnail: post.thumbnail,
        articleUrl: post.articleUrl || "",
      });
    } else {
      form.reset({
        titleEn: "",
        titleFa: "",
        excerptEn: "",
        excerptFa: "",
        contentEn: "",
        contentFa: "",
        categoryEn: "",
        categoryFa: "",
        readTime: 5,
        date: new Date().toISOString().split("T")[0],
        thumbnail: "default",
        articleUrl: "",
      });
    }
  }, [post, form]);

  const mutation = useMutation({
    mutationFn: async (data: PostFormData) => {
      if (isEdit && post) {
        return await apiRequest("PUT", `/api/posts/${post.id}`, data);
      } else {
        return await apiRequest("POST", "/api/posts", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "Success",
        description: isEdit ? "Post updated successfully" : "Post created successfully",
      });
      onOpenChange(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save post",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PostFormData) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Post" : "Add New Post"}</DialogTitle>
          <DialogDescription>
            Fill in the form below to {isEdit ? "update" : "create"} a blog post
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* English Title */}
              <FormField
                control={form.control}
                name="titleEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>English Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter English title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Farsi Title */}
              <FormField
                control={form.control}
                name="titleFa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان فارسی</FormLabel>
                    <FormControl>
                      <Input placeholder="عنوان فارسی را وارد کنید..." {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* English Category */}
              <FormField
                control={form.control}
                name="categoryEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>English Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. AI Strategy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Farsi Category */}
              <FormField
                control={form.control}
                name="categoryFa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>دسته‌بندی فارسی</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: استراتژی هوش مصنوعی" {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Read Time */}
              <FormField
                control={form.control}
                name="readTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Read Time (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} placeholder="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Article URL */}
            <FormField
              control={form.control}
              name="articleUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article URL (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/article" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* English Excerpt */}
            <FormField
              control={form.control}
              name="excerptEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>English Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Short description in English..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Farsi Excerpt */}
            <FormField
              control={form.control}
              name="excerptFa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>خلاصه فارسی</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="توضیحات کوتاه به فارسی..."
                      rows={3}
                      {...field}
                      dir="rtl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* English Content */}
            <FormField
              control={form.control}
              name="contentEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>English Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Full article content in English..."
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Farsi Content */}
            <FormField
              control={form.control}
              name="contentFa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>محتوای فارسی</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="محتوای کامل مقاله به فارسی..."
                      rows={6}
                      {...field}
                      dir="rtl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Thumbnail */}
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <Input placeholder="default" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEdit ? "Update Post" : "Create Post"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
