import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Podcast } from "@shared/schema";
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

const podcastFormSchema = z.object({
  titleEn: z.string().min(1, "English title is required"),
  titleFa: z.string().min(1, "عنوان فارسی الزامی است"),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionFa: z.string().min(1, "توضیحات فارسی الزامی است"),
  duration: z.string().min(1, "Duration is required"),
  date: z.string().min(1, "Date is required"),
  audioUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  youtubeUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type PodcastFormData = z.infer<typeof podcastFormSchema>;

interface PodcastFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  podcast?: Podcast | null;
}

export function PodcastFormDialog({ open, onOpenChange, podcast }: PodcastFormDialogProps) {
  const { toast } = useToast();
  const isEdit = !!podcast;

  const form = useForm<PodcastFormData>({
    resolver: zodResolver(podcastFormSchema),
    defaultValues: {
      titleEn: "",
      titleFa: "",
      descriptionEn: "",
      descriptionFa: "",
      duration: "",
      date: new Date().toISOString().split("T")[0],
      audioUrl: "",
      youtubeUrl: "",
    },
  });

  useEffect(() => {
    if (podcast) {
      form.reset({
        titleEn: podcast.titleEn,
        titleFa: podcast.titleFa,
        descriptionEn: podcast.descriptionEn,
        descriptionFa: podcast.descriptionFa,
        duration: podcast.duration,
        date: podcast.date,
        audioUrl: podcast.audioUrl || "",
        youtubeUrl: podcast.youtubeUrl || "",
      });
    } else {
      form.reset({
        titleEn: "",
        titleFa: "",
        descriptionEn: "",
        descriptionFa: "",
        duration: "",
        date: new Date().toISOString().split("T")[0],
        audioUrl: "",
        youtubeUrl: "",
      });
    }
  }, [podcast, form]);

  const mutation = useMutation({
    mutationFn: async (data: PodcastFormData) => {
      if (isEdit && podcast) {
        return await apiRequest("PUT", `/api/podcasts/${podcast.id}`, data);
      } else {
        return await apiRequest("POST", "/api/podcasts", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/podcasts"] });
      toast({
        title: "Success",
        description: isEdit ? "Podcast updated successfully" : "Podcast created successfully",
      });
      onOpenChange(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save podcast",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PodcastFormData) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Podcast" : "Add New Podcast"}</DialogTitle>
          <DialogDescription>
            Fill in the form below to {isEdit ? "update" : "create"} a podcast episode
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
                      <Input placeholder="Enter podcast title..." {...field} />
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
                      <Input placeholder="عنوان پادکست را وارد کنید..." {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Duration */}
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (mm:ss)</FormLabel>
                    <FormControl>
                      <Input placeholder="45:30" {...field} />
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

            {/* Audio URL */}
            <FormField
              control={form.control}
              name="audioUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audio URL (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/podcast.mp3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* YouTube URL */}
            <FormField
              control={form.control}
              name="youtubeUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube URL (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/watch?v=..." {...field} />
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
                      placeholder="Detailed description of the podcast episode in English..."
                      rows={6}
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
                      placeholder="توضیحات کامل اپیزود پادکست به فارسی..."
                      rows={6}
                      {...field}
                      dir="rtl"
                    />
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
                {isEdit ? "Update Podcast" : "Create Podcast"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
