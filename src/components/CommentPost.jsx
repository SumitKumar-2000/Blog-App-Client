export default function CommentPost({comment}) {
  return (
    <li key={comment.id} className="border rounded-sm p-2 shadow-sm bg-white">
      <p className="text-gray-700">{comment.content}</p>
      <div className="text-xs text-gray-500 mt-1 flex gap-2">
        <p>{new Date(comment.created_at).toLocaleString()}</p>
        <p>~{comment?.user.full_name}</p>
      </div>
    </li>
  );
}
