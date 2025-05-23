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
import { Progress } from "@/components/ui/progress";
import { Link } from "@inertiajs/react";
import { Plus, Users, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Project {
    id: number;
    name: string;
    description: string;
    progress: number;
    due_date: string;
    tasks_count: number;
    completed_tasks_count: number;
    members_count: number;
}

interface ProjectsIndexProps {
    projects: Project[];
}

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Projects</h1>
                    <Button asChild>
                        <Link href="/projects/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Project
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Card key={project.id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle>{project.name}</CardTitle>
                                <CardDescription>
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Progress</span>
                                        <span>{project.progress}%</span>
                                    </div>
                                    <Progress value={project.progress} />
                                </div>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                        <Users className="mr-1 h-4 w-4" />
                                        <span>
                                            {project.members_count} members
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="mr-1 h-4 w-4" />
                                        <span>
                                            Due {formatDate(project.due_date)}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between border-t pt-4">
                                <div className="text-sm text-muted-foreground">
                                    {project.completed_tasks_count}/
                                    {project.tasks_count} tasks completed
                                </div>
                                <Button variant="outline" asChild>
                                    <Link href={`/projects/${project.id}`}>
                                        View Details
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900">
                            No projects yet
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started by creating a new project.
                        </p>
                        <div className="mt-6">
                            <Button asChild>
                                <Link href="/projects/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Project
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
