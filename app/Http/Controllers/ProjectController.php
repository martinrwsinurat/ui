<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $user = Auth::user();
        
        if ($user->hasRole('Admin')) {
            $projects = Project::with(['creator', 'tasks'])->get();
        } elseif ($user->hasRole('Project Manager')) {
            $projects = Project::where('created_by', $user->id)
                ->orWhereHas('tasks', function ($query) use ($user) {
                    $query->where('assigned_to', $user->id);
                })
                ->with(['creator', 'tasks'])
                ->get();
        } else {
            $projects = Project::whereHas('tasks', function ($query) use ($user) {
                $query->where('assigned_to', $user->id);
            })->with(['creator', 'tasks'])->get();
        }

        return response()->json([
            'status' => 'success',
            'projects' => $projects
        ]);
    }

    public function store(Request $request)
    {
        if (!Auth::user()->can('create project')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        $project = Project::create([
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'created_by' => Auth::id(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Project created successfully',
            'project' => $project
        ], 201);
    }

    public function show(Project $project)
    {
        $project->load(['creator', 'tasks.assignee', 'tasks.comments.user']);
        
        return response()->json([
            'status' => 'success',
            'project' => $project
        ]);
    }

    public function update(Request $request, Project $project)
    {
        if (!Auth::user()->can('update project')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'required|in:not_started,in_progress,completed',
        ]);

        $project->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Project updated successfully',
            'project' => $project
        ]);
    }

    public function destroy(Project $project)
    {
        if (!Auth::user()->can('delete project')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $project->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Project deleted successfully'
        ]);
    }
} 