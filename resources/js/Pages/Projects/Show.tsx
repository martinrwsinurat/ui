import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Plus, Users, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
}

interface Project {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    tasks: Task[];
}

interface Props {
    project: Project;
}

export default function Show({ project }: Props) {
    const { data, setData, put, processing } = useForm<{
        status: Task["status"];
    }>({
        status: "todo",
    });

    const handleStatusChange = (taskId: number, value: Task["status"]) => {
        setData("status", value);
        put(route("tasks.update", taskId));
    };

    const tasksByStatus = {
        todo: project.tasks.filter((task) => task.status === "todo"),
        in_progress: project.tasks.filter(
            (task) => task.status === "in_progress"
        ),
        completed: project.tasks.filter((task) => task.status === "completed"),
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Project Details
                </h2>
            }
        >
            <Head title={`Project: ${project.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between">
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Back to Projects
                        </Button>
                        <Link href={route("projects.tasks.create", project.id)}>
                            <Button>Add New Task</Button>
                        </Link>
                    </div>

                    <Card className="mb-6 p-6">
                        <h3 className="text-2xl font-bold">{project.name}</h3>
                        <p className="mt-2 text-gray-600">
                            {project.description}
                        </p>
                    </Card>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h4 className="mb-2 font-semibold">Start Date</h4>
                            <p>
                                {new Date(
                                    project.start_date
                                ).toLocaleDateString()}
                            </p>
                        </div>

                        <div>
                            <h4 className="mb-2 font-semibold">End Date</h4>
                            <p>
                                {new Date(
                                    project.end_date
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="mb-4 text-xl font-semibold">Tasks</h3>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div>
                                <h4 className="mb-4 font-semibold">To Do</h4>
                                <div className="space-y-4">
                                    {tasksByStatus.todo.map((task) => (
                                        <Card key={task.id} className="p-4">
                                            <h5 className="font-semibold">
                                                {task.title}
                                            </h5>
                                            <p className="mt-2 text-sm text-gray-600">
                                                {task.description}
                                            </p>
                                            <div className="mt-4">
                                                <Select
                                                    value={task.status}
                                                    onValueChange={(
                                                        value: Task["status"]
                                                    ) =>
                                                        handleStatusChange(
                                                            task.id,
                                                            value
                                                        )
                                                    }
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
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="mb-4 font-semibold">
                                    In Progress
                                </h4>
                                <div className="space-y-4">
                                    {tasksByStatus.in_progress.map((task) => (
                                        <Card key={task.id} className="p-4">
                                            <h5 className="font-semibold">
                                                {task.title}
                                            </h5>
                                            <p className="mt-2 text-sm text-gray-600">
                                                {task.description}
                                            </p>
                                            <div className="mt-4">
                                                <Select
                                                    value={task.status}
                                                    onValueChange={(
                                                        value: Task["status"]
                                                    ) =>
                                                        handleStatusChange(
                                                            task.id,
                                                            value
                                                        )
                                                    }
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
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="mb-4 font-semibold">
                                    Completed
                                </h4>
                                <div className="space-y-4">
                                    {tasksByStatus.completed.map((task) => (
                                        <Card key={task.id} className="p-4">
                                            <h5 className="font-semibold">
                                                {task.title}
                                            </h5>
                                            <p className="mt-2 text-sm text-gray-600">
                                                {task.description}
                                            </p>
                                            <div className="mt-4">
                                                <Select
                                                    value={task.status}
                                                    onValueChange={(
                                                        value: Task["status"]
                                                    ) =>
                                                        handleStatusChange(
                                                            task.id,
                                                            value
                                                        )
                                                    }
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
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
