import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "@inertiajs/react";

interface Task {
    id: number;
    title: string;
    description: string;
    status: "todo" | "in_progress" | "completed";
    due_date: string;
    assigned_to: {
        id: number;
        name: string;
    };
    project: {
        id: number;
        name: string;
    };
}

interface Props {
    task: Task;
}

export default function Show({ task }: Props) {
    const { data, setData, put, processing } = useForm<{
        status: Task["status"];
    }>({
        status: task.status,
    });

    const handleStatusChange = (value: Task["status"]) => {
        setData("status", value);
        put(route("tasks.update", task.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Task Details
                </h2>
            }
        >
            <Head title={`Task: ${task.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Back to Project
                        </Button>
                    </div>

                    <Card className="p-6">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold">{task.title}</h3>
                            <p className="mt-2 text-gray-600">
                                {task.description}
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-2 font-semibold">Project</h4>
                                <p>{task.project.name}</p>
                            </div>

                            <div>
                                <h4 className="mb-2 font-semibold">
                                    Assigned To
                                </h4>
                                <p>{task.assigned_to.name}</p>
                            </div>

                            <div>
                                <h4 className="mb-2 font-semibold">Due Date</h4>
                                <p>
                                    {new Date(
                                        task.due_date
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <div>
                                <h4 className="mb-2 font-semibold">Status</h4>
                                <Select
                                    value={data.status}
                                    onValueChange={handleStatusChange}
                                    disabled={processing}
                                >
                                    <SelectTrigger className="w-[180px]">
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
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
