import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Startup } from "@shared/schema";
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

const startupFormSchema = z.object({
  nameEn: z.string().min(1, "English name is required"),
  nameFa: z.string().min(1, "نام فارسی الزامی است"),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionFa: z.string().min(1, "توضیحات فارسی الزامی است"),
  statusEn: z.string().min(1, "English status is required"),
  statusFa: z.string().min(1, "وضعیت فارسی الزامی است"),
  categoryEn: z.string().min(1, "English category is required"),
  categoryFa: z.string().min(1, "دسته‌بندی فارسی الزامی است"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  websiteUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  articleUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type StartupFormData = z.infer<typeof startupFormSchema>;

interface StartupFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startup?: Startup | null;
}

export function StartupFormDialog({ open, onOpenChange, startup }: StartupFormDialogProps) {
  const { toast } = useToast();
  const isEdit = !!startup;

  const form = useForm<StartupFormData>({
    resolver: zodResolver(startupFormSchema),
    defaultValues: {
      nameEn: "",
      nameFa: "",
      descriptionEn: "",
      descriptionFa: "",
      statusEn: "",
      statusFa: "",
      categoryEn: "",
      categoryFa: "",
      thumbnail: "default",
      websiteUrl: "",
      articleUrl: "",
    },
  });

  useEffect(() => {
    if (startup) {
      form.reset({
        nameEn: startup.nameEn,
        nameFa: startup.nameFa,
        descriptionEn: startup.descriptionEn,
        descriptionFa: startup.descriptionFa,
        statusEn: startup.statusEn,
        statusFa: startup.statusFa,
        categoryEn: startup.categoryEn,
        categoryFa: startup.categoryFa,
        thumbnail: startup.thumbnail,
        websiteUrl: startup.websiteUrl || "",
        articleUrl: startup.articleUrl || "",
      });
    } else {
      form.reset({
        nameEn: "",
        nameFa: "",
        descriptionEn: "",
        descriptionFa: "",
        statusEn: "",
        statusFa: "",
        categoryEn: "",
        categoryFa: "",
        thumbnail: "default",
        websiteUrl: "",
        articleUrl: "",
      });
    }
  }, [startup, form]);

  const mutation = useMutation({
    mutationFn: async (data: StartupFormData) => {
      if (isEdit && startup) {
        return await apiRequest("PUT", `/api/startups/${startup.id}`, data);
      } else {
        return await apiRequest("POST", "/api/startups", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/startups"] });
      toast({
        title: "Success",
        description: isEdit ? "Startup updated successfully" : "Startup created successfully",
      });
      onOpenChange(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save startup",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: StartupFormData) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Startup" : "Add New Startup"}</DialogTitle>
          <DialogDescription>
            Fill in the form below to {isEdit ? "update" : "create"} a startup
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* English Name */}
              <FormField
                control={form.control}
                name="nameEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>English Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter startup name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Farsi Name */}
              <FormField
                control={form.control}
                name="nameFa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام فارسی</FormLabel>
                    <FormControl>
                      <Input placeholder="نام استارتاپ را وارد کنید..." {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* English Status */}
              <FormField
                control={form.control}
                name="statusEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>English Status</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Active, In Development" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Farsi Status */}
              <FormField
                control={form.control}
                name="statusFa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وضعیت فارسی</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: فعال، در حال توسعه" {...field} dir="rtl" />
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
                      <Input placeholder="e.g. AI Tools" {...field} />
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
                      <Input placeholder="مثال: ابزارهای هوش مصنوعی" {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Website URL */}
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://startup-website.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Article URL */}
            <FormField
              control={form.control}
              name="articleUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article URL (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/article-about-startup" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* English Description */}
            <FormField
              control={form.control}
              name="descriptionEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>English Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed description in English..."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Farsi Description */}
            <FormField
              control={form.control}
              name="descriptionFa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>توضیحات فارسی</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="توضیحات کامل به فارسی..."
                      rows={5}
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
                {isEdit ? "Update Startup" : "Create Startup"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
