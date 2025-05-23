import React, { useState } from "react";
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
import { Link, useForm } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

interface CreateProjectFormData {
    name: string;
    description: string;
    due_date: string;
}

export default function Create() {
    const { data, setData, post, processing, errors } =
        useForm<CreateProjectFormData>({
            name: "",
            description: "",
            due_date: "",
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/projects");
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href="/projects">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Projects
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-semibold">
                        Create New Project
                    </h1>
                </div>

                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Project Details</CardTitle>
                            <CardDescription>
                                Fill in the details to create a new project.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Project Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">
                                        {errors.name}
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
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-4">
                            <Button variant="outline" asChild>
                                <Link href="/projects">Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Creating..." : "Create Project"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
