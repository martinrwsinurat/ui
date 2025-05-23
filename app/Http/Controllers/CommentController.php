<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Task $task)
    {
        $comments = $task->comments()
            ->with('user')
            ->latest()
            ->get();

        return response()->json([
            'status' => 'success',
            'comments' => $comments
        ]);
    }

    public function store(Request $request, Task $task)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $comment = $task->comments()->create([
            'content' => $request->content,
            'user_id' => Auth::id(),
        ]);

        $comment->load('user');

        return response()->json([
            'status' => 'success',
            'message' => 'Comment created successfully',
            'comment' => $comment
        ], 201);
    }

    public function update(Request $request, Task $task, Comment $comment)
    {
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'content' => 'required|string',
        ]);

        $comment->update([
            'content' => $request->content,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Comment updated successfully',
            'comment' => $comment
        ]);
    }

    public function destroy(Task $task, Comment $comment)
    {
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Comment deleted successfully'
        ]);
    }
} 