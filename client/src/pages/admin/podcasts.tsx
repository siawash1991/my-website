import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Podcast } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Loader2, Music, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PodcastFormDialog } from "@/components/admin/PodcastFormDialog";
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

export default function AdminPodcasts() {
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPodcast, setEditingPodcast] = useState<Podcast | null>(null);

  const { data: podcasts = [], isLoading } = useQuery<Podcast[]>({
    queryKey: ["/api/podcasts"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/podcasts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/podcasts"] });
      toast({
        title: "Success",
        description: "Podcast deleted successfully",
      });
      setDeleteId(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete podcast",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Podcasts Management</h1>
          <p className="text-muted-foreground">Manage your podcast episodes</p>
        </div>
        <Button
          onClick={() => {
            setEditingPodcast(null);
            setDialogOpen(true);
          }}
          data-testid="button-add-podcast"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Podcast
        </Button>
      </div>

      <div className="grid gap-4">
        {podcasts.map((podcast) => (
          <Card key={podcast.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{podcast.duration}</Badge>
                    <span className="text-sm text-muted-foreground">{podcast.date}</span>
                  </div>
                  <CardTitle className="text-xl">{podcast.titleEn}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{podcast.titleFa}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingPodcast(podcast);
                      setDialogOpen(true);
                    }}
                    data-testid={`button-edit-${podcast.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setDeleteId(podcast.id)}
                    data-testid={`button-delete-${podcast.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{podcast.descriptionEn}</p>
              <div className="flex gap-3 mt-3">
                {podcast.audioUrl && (
                  <a
                    href={podcast.audioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <Music className="h-3 w-3" />
                    Audio
                  </a>
                )}
                {podcast.youtubeUrl && (
                  <a
                    href={podcast.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <Youtube className="h-3 w-3" />
                    YouTube
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {podcasts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No podcasts yet. Create your first podcast!</p>
        </div>
      )}

      <PodcastFormDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingPodcast(null);
        }}
        podcast={editingPodcast}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the podcast.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
