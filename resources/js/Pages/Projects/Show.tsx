import React from "react";
import { Head, Link } from "@inertiajs/react";
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
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { User } from "@/types";

interface Task {
    id: number;
    title: string;
    description: string;
    status: "todo" | "in_progress" | "completed";
    due_date: string;
    assigned_to: {
        id: number;
        name: string;
    } | null;
}

interface Props {
    auth: {
        user: User;
    };
    project: {
        id: number;
        name: string;
        description: string;
        start_date: string;
        end_date: string;
        progress: number;
        manager_id: number;
        tasks: Task[];
    };
}

export default function Show({ auth, project }: Props) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Project Details
                </h2>
            }
        >
            <Head title={project.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Button variant="ghost" asChild className="mb-4">
                            <Link href="/projects">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Projects
                            </Link>
                        </Button>
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-semibold">
                                    {project.name}
                                </h1>
                                <p className="text-muted-foreground">
                                    {project.description}
                                </p>
                            </div>
                            <div className="flex space-x-4">
                                <Button variant="outline" asChild>
                                    <Link href={`/projects/${project.id}/edit`}>
                                        Edit Project
                                    </Link>
                                </Button>
                                <Button asChild>
                                    <Link
                                        href={`/tasks/create?project_id=${project.id}`}
                                    >
                                        Add Task
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium">
                                        Progress
                                    </h3>
                                    <Progress
                                        value={project.progress}
                                        className="w-full"
                                    />
                                    <p className="text-sm text-gray-600 mt-1">
                                        {project.progress}% Complete
                                    </p>
                                </div>

                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        <span>
                                            {formatDate(project.start_date)} -{" "}
                                            {formatDate(project.end_date)}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Tasks</CardTitle>
                                <CardDescription>
                                    {project.tasks.length} tasks in total
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {project.tasks.map((task) => (
                                        <Card key={task.id}>
                                            <CardHeader>
                                                <CardTitle className="text-base">
                                                    {task.title}
                                                </CardTitle>
                                                <CardDescription>
                                                    {task.description}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center justify-between text-sm text-gray-600">
                                                    <div className="flex items-center">
                                                        <Calendar className="w-4 h-4 mr-1" />
                                                        <span>
                                                            Due:{" "}
                                                            {formatDate(
                                                                task.due_date
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Users className="w-4 h-4 mr-1" />
                                                        <span>
                                                            Assigned to:{" "}
                                                            {task.assigned_to
                                                                ?.name ||
                                                                "Unassigned"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                <Button
                                                    variant="outline"
                                                    className="w-full"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/tasks/${task.id}`}
                                                    >
                                                        View Details
                                                    </Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
