<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Project $project)
    {
        $tasks = $project->tasks()
            ->with(['assigned_to', 'project'])
            ->get();

        return Inertia::render('Projects/Show', [
            'project' => $project->load('tasks'),
        ]);
    }

    public function store(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'assigned_to' => 'required|exists:users,id',
        ]);

        $task = $project->tasks()->create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'due_date' => $validated['due_date'],
            'assigned_to' => $validated['assigned_to'],
            'status' => 'todo',
        ]);

        return redirect()->back();
    }

    public function show(Task $task)
    {
        return Inertia::render('Tasks/Show', [
            'task' => $task->load(['assigned_to', 'project']),
        ]);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'status' => 'required|in:todo,in_progress,completed',
        ]);

        $task->update($validated);

        return back();
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return back();
    }

    public function updateStatus(Request $request, Project $project, Task $task)
    {
        $user = Auth::user();
        
        if (!$user->can('update tasks') && $task->assigned_to !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'status' => 'required|in:todo,in_progress,done',
        ]);

        $task->update(['status' => $request->status]);

        return response()->json([
            'status' => 'success',
            'message' => 'Task status updated successfully',
            'task' => $task
        ]);
    }
} 