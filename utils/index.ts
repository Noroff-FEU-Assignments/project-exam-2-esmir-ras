import { Comment } from 'types';

export const isoToLocaleDateString = (iso: string) => {
  const date = new Date(iso);
  if (date instanceof Date && !isNaN(date.valueOf()))
    return date.toLocaleDateString();
  return null;
};

export interface GroupedComment {
  comment: Comment;
  replies: GroupedComment[];
}

export const groupComments = (comments: Comment[]): GroupedComment[] => {
  const groupComment = (comment: Comment): GroupedComment => {
    const replies = comments.filter((comm) => comm.replyToId === comment.id);
    return {
      comment,
      replies: replies.map((reply) => groupComment(reply)),
    };
  };
  return comments.map(groupComment).filter((comm) => !comm.comment.replyToId);
};
