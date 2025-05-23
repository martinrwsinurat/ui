import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Link, useForm } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

interface CreateTaskFormData {
    title: string;
    description: string;
    status: "todo" | "in_progress" | "completed";
    due_date: string;
    assigned_to_id: string;
}

interface CreateTaskProps {
    project: {
        id: number;
        name: string;
    };
    users: Array<{
        id: number;
        name: string;
        email: string;
    }>;
}

export default function Create({ project, users }: CreateTaskProps) {
    const { data, setData, post, processing, errors } =
        useForm<CreateTaskFormData>({
            title: "",
            description: "",
            status: "todo",
            due_date: "",
            assigned_to_id: "",
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/projects/${project.id}/tasks`);
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href={`/projects/${project.id}`}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Project
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-semibold">Create New Task</h1>
                    <p className="text-muted-foreground">
                        Add a new task to {project.name}
                    </p>
                </div>

                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Task Details</CardTitle>
                            <CardDescription>
                                Fill in the details to create a new task.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Task Title</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    required
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    required
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(
                                        value:
                                            | "todo"
                                            | "in_progress"
                                            | "completed"
                                    ) => setData("status", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todo">
                                            To Do
                                        </SelectItem>
                                        <SelectItem value="in_progress">
                                            In Progress
                                        </SelectItem>
                                        <SelectItem value="completed">
                                            Completed
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-red-500">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="due_date">Due Date</Label>
                                <Input
                                    id="due_date"
                                    type="date"
                                    value={data.due_date}
                                    onChange={(e) =>
                                        setData("due_date", e.target.value)
                                    }
                                    required
                                />
                                {errors.due_date && (
                                    <p className="text-sm text-red-500">
                                        {errors.due_date}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="assigned_to_id">
                                    Assign To
                                </Label>
                                <Select
                                    value={data.assigned_to_id}
                                    onValueChange={(value) =>
                                        setData("assigned_to_id", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select user" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users.map((user) => (
                                            <SelectItem
                                                key={user.id}
                                                value={user.id.toString()}
                                            >
                                                {user.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.assigned_to_id && (
                                    <p className="text-sm text-red-500">
                                        {errors.assigned_to_id}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-4">
                            <Button variant="outline" asChild>
                                <Link href={`/projects/${project.id}`}>
                                    Cancel
                                </Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Creating..." : "Create Task"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
