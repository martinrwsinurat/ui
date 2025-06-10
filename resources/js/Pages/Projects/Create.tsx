import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Link, useForm, Head } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { User } from "@/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { DatePickerWithRange } from "@/Components/ui/date-picker-with-range";
import { DateRange } from "react-day-picker";
import { TagInput } from "@/Components/project/TagInput";

interface Props {
    users: User[];
    auth: {
        user: User;
    };
}

export default function Create({ users, auth }: Props) {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        budget: "",
        category: "",
        tags: [] as string[],
        is_template: false as boolean,
        user_id: auth.user.id.toString(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("projects.store"));
    };

    const handleDateRangeChange = (range: DateRange | undefined) => {
        setDateRange(range);
        if (range?.from) {
            setData("start_date", range.from.toISOString().split("T")[0]);
        }
        if (range?.to) {
            setData("end_date", range.to.toISOString().split("T")[0]);
        }
    };

    const handleTagsChange = (newTags: string[]) => {
        setData("tags", newTags);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Project" />
            <div
                className="min-h-screen flex items-center justify-center py-12"
                style={{
                    background: "linear-gradient(135deg, #FFD6A0 0%, #FFB86C 100%)",
                    minHeight: "100vh",
                }}
            >
                <div className="w-full max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Button variant="ghost" asChild className="mb-4">
                            <Link href="/projects">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-semibold">
                            Buat projek
                        </h1>
                    </div>

                    <Card>
                        <form onSubmit={handleSubmit}>
                            <CardHeader>
                                <CardTitle>Detail data</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Tugas</Label>
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
                                    <Label htmlFor="description">
                                        Deskripsi pengerjaan
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
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
                                    <Label htmlFor="user_id">
                                        Penanggung jawab
                                    </Label>
                                    <Select
                                        value={data.user_id}
                                        onValueChange={(value) =>
                                            setData("user_id", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a manager" />
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
                                    {errors.user_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.user_id}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Lama Pengerjaan</Label>
                                    <DatePickerWithRange
                                        date={dateRange}
                                        onDateChange={handleDateRangeChange}
                                    />
                                    {(errors.start_date || errors.end_date) && (
                                        <p className="text-sm text-red-500">
                                            {errors.start_date ||
                                                errors.end_date}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="budget">Biaya pengerjaan</Label>
                                    <Input
                                        id="budget"
                                        type="number"
                                        step="100000"
                                        value={data.budget}
                                        onChange={(e) =>
                                            setData("budget", e.target.value)
                                        }
                                    />
                                    {errors.budget && (
                                        <p className="text-sm text-red-500">
                                            {errors.budget}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Kategori </Label>
                                    <Input
                                        id="category"
                                        value={data.category}
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                    />
                                    {errors.category && (
                                        <p className="text-sm text-red-500">
                                            {errors.category}
                                        </p>
                                    )}
                                </div>

                                {/* <TagInput
                                    tags={data.tags}
                                    onTagsChange={handleTagsChange}
                                />
                                {errors.tags && (
                                    <p className="text-sm text-red-500">
                                        {errors.tags}
                                    </p>
                                )} */}

                                <div className="space-y-2">
    
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="is_template"
                                            checked={data.is_template}
                                            onChange={(e) =>
                                                setData(
                                                    "is_template",
                                                    e.target.checked
                                                )
                                            }
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label
                                            htmlFor="is_template"
                                            className="text-sm font-normal"
                                        >
                                            Simpan otomatis
                                        </Label>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end space-x-4">
                                <Button variant="outline" asChild>
                                    <Link href="/projects">Batal</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? "Creating..."
                                        : "Simpan projek"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}