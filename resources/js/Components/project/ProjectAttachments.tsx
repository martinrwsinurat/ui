import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { FileIcon, TrashIcon, DownloadIcon, EyeIcon } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { router } from "@inertiajs/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Attachment {
    filename: string;
    path: string;
    type: string;
    uploaded_at: string;
}

interface ProjectAttachmentsProps {
    attachments: Attachment[];
    projectId: number;
}

interface PageProps {
    project?: {
        attachments: Attachment[];
    };
}

export function ProjectAttachments({
    attachments,
    projectId,
}: ProjectAttachmentsProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [localAttachments, setLocalAttachments] = useState<Attachment[]>(
        attachments || []
    );
    const { data, setData, post, processing } = useForm({
        file: null as File | null,
    });

    // Update local attachments when props change
    useEffect(() => {
        setLocalAttachments(attachments || []);
    }, [attachments]);

    // Function to get full Cloudinary URL
    const getFullCloudinaryUrl = (path: string) => {
        if (path.startsWith("http")) return path;
        const cloudName = window.CLOUDINARY_CLOUD_NAME || "dtpflpunp"; // fallback to your cloud name
        return `https://res.cloudinary.com/${cloudName}/image/upload/${path}`;
    };

    // Function to transform Cloudinary URL for thumbnails
    const getThumbnailUrl = (url: string) => {
        const fullUrl = getFullCloudinaryUrl(url);
        if (!fullUrl.includes("cloudinary.com")) return fullUrl;
        return fullUrl.replace(
            "/upload/",
            "/upload/c_thumb,w_200,h_200,g_face/"
        );
    };

    // Function to transform Cloudinary URL for preview
    const getPreviewUrl = (url: string) => {
        const fullUrl = getFullCloudinaryUrl(url);
        if (!fullUrl.includes("cloudinary.com")) return fullUrl;
        return fullUrl.replace("/upload/", "/upload/q_auto,f_auto/");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Validate file size (10MB max)
            if (file.size > 10 * 1024 * 1024) {
                toast.error("File size must be less than 10MB");
                e.target.value = "";
                return;
            }
            setData("file", file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.file) return;

        console.log("Starting file upload...", {
            file: data.file.name,
            size: data.file.size,
            type: data.file.type,
        });

        post(route("projects.attachments.store", projectId), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (page) => {
                console.log("Upload response:", page);
                const props = page.props as PageProps;
                if (props.project?.attachments) {
                    console.log(
                        "Updating attachments:",
                        props.project.attachments
                    );
                    setLocalAttachments(props.project.attachments);
                    toast.success("File uploaded successfully");
                    setData("file", null);
                    // Reset file input
                    const fileInput = document.querySelector(
                        'input[type="file"]'
                    ) as HTMLInputElement;
                    if (fileInput) fileInput.value = "";
                } else {
                    console.warn("No attachments in response:", props);
                    toast.error("Failed to update attachments list");
                }
            },
            onError: (errors) => {
                console.error("Upload failed:", errors);
                toast.error(errors.file || "Failed to upload file");
            },
        });
    };

    const handleDelete = (index: number) => {
        if (confirm("Are you sure you want to delete this file?")) {
            router.delete(
                route("projects.attachments.destroy", [projectId, index]),
                {
                    onSuccess: () => {
                        toast.success("File deleted successfully");
                    },
                    onError: () => {
                        toast.error("Failed to delete file");
                    },
                }
            );
        }
    };

    const handleDownload = (path: string, filename: string) => {
        // Cloudinary URLs are already complete URLs
        window.open(path, "_blank");
    };

    const handlePreview = (path: string) => {
        const fullUrl = getFullCloudinaryUrl(path);
        console.log("Original path:", path);
        console.log("Full Cloudinary URL:", fullUrl);
        setPreviewImage(fullUrl);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Attachments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="flex-1 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                            accept="*/*"
                        />
                        <Button
                            type="submit"
                            disabled={processing || !data.file}
                        >
                            {processing ? "Uploading..." : "Upload"}
                        </Button>
                    </div>
                </form>

                {localAttachments && localAttachments.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>File</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Uploaded</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {localAttachments.map((attachment, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            {attachment.type.startsWith(
                                                "image/"
                                            ) ? (
                                                <div className="relative group">
                                                    <img
                                                        src={getThumbnailUrl(
                                                            attachment.path
                                                        )}
                                                        alt={
                                                            attachment.filename
                                                        }
                                                        className="h-12 w-12 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                                                        onClick={() =>
                                                            handlePreview(
                                                                getPreviewUrl(
                                                                    attachment.path
                                                                )
                                                            )
                                                        }
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded flex items-center justify-center">
                                                        <EyeIcon className="h-4 w-4 text-white opacity-0 group-hover:opacity-100" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <FileIcon className="h-4 w-4" />
                                            )}
                                            {attachment.filename}
                                        </div>
                                    </TableCell>
                                    <TableCell>{attachment.type}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            attachment.uploaded_at
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            {attachment.type.startsWith(
                                                "image/"
                                            ) && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        handlePreview(
                                                            getPreviewUrl(
                                                                attachment.path
                                                            )
                                                        )
                                                    }
                                                >
                                                    <EyeIcon className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDownload(
                                                        attachment.path,
                                                        attachment.filename
                                                    )
                                                }
                                            >
                                                <DownloadIcon className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDelete(index)
                                                }
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-center text-gray-500">
                        No attachments yet
                    </p>
                )}
            </CardContent>

            <Dialog
                open={!!previewImage}
                onOpenChange={() => setPreviewImage(null)}
            >
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Image Preview</DialogTitle>
                    </DialogHeader>
                    {previewImage && (
                        <>
                            <div className="p-4 bg-gray-100 rounded-lg mb-4">
                                <p className="text-sm text-gray-600 break-all">
                                    Image URL: {previewImage}
                                </p>
                            </div>
                            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        console.error(
                                            "Image failed to load:",
                                            previewImage
                                        );
                                        e.currentTarget.src =
                                            "https://via.placeholder.com/400x300?text=Image+Failed+to+Load";
                                    }}
                                />
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        window.open(previewImage, "_blank")
                                    }
                                >
                                    Open in New Tab
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setPreviewImage(null)}
                                >
                                    Close
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </Card>
    );
}
