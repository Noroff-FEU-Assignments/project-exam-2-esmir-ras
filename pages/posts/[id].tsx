import { Button, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { getPostById, saveComment } from 'api';
import {
  AddReaction,
  Form,
  RenderComment,
  RenderReaction,
  LightTooltip,
  ErrorTooltip,
  EditPost,
  DeletePost,
  Tags,
  Modal,
} from 'components';
import { AuthContext } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { Comment, Post } from 'types';
import { groupComments, GroupedComment, isoToLocaleDateString } from 'utils';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Link from 'next/link';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function PostDetail() {
  const [post, setPost] = useState<Post | null>();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [error, setError] = useState('');
  const { authHeader, user } = useContext(AuthContext);
  const router = useRouter();
  const postId = router.query.id;
  const isOwner = !!user && !!post && user.email === post.author.email;

  useEffect(() => {
    if (!postId || typeof postId !== 'string') return;
    if (!authHeader) {
      location.assign('/');
      return;
    }
    getPostById(postId, authHeader)
      .then((post) => setPost(post))
      .catch((err) => setError(err));
  }, [postId, authHeader]);

  if (error && error.length && error.length > 0) {
    return (
      <div className="h-96 flex flex-col justify-center items-center">
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="h-96 flex flex-col justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  const editModalHandler = () => {
    setEditOpen((prev) => !prev);
  };

  const deleteModalHandler = () => {
    setDeleteOpen((prev) => !prev);
  };

  const submitHandler = async (values: any) => {
    if (!postId || typeof postId !== 'string') return;
    if (!authHeader) return null;
    const reqBody = {
      body: values.comm,
    };
    await saveComment(reqBody, postId.toString(), authHeader);
    router.reload();
  };

  const renderGroupComm = (
    groupedComm: GroupedComment,
    level = 0
  ): ReactNode => {
    const baseComm = (
      <RenderComment
        key={groupedComm.comment.id + 'comment'}
        {...groupedComm.comment}
        level={level}
      />
    );
    const replies = groupedComm.replies.map((gcom) =>
      renderGroupComm(gcom, level + 1)
    );
    return <>{[baseComm, ...replies]}</>;
  };

  const renderComments = (comments: Comment[]) => {
    const groupedComments = groupComments(comments);
    return groupedComments.map((gcom) => renderGroupComm(gcom, 0));
  };

  return (
    <>
      <div>
        <div className='p-4' style={{background: '#1D1A27', borderRadius:'25px'}}>
          <div className="flex flex-col items-stretch">
            {isOwner && (
              <div className="w-full flex flex-row justify-end gap-2 items-center">
                <ErrorTooltip title="Delete post">
                  <Delete
                    color="error"
                    className="cursor-pointer"
                    onClick={deleteModalHandler}
                  />
                </ErrorTooltip>
                <IconButton title="Edit post"
                  color="primary"
                  className="cursor-pointer"
                  onClick={editModalHandler}>
                  <MoreVertIcon />
                </IconButton>
              </div>
            )}
            <Tags tags={post.tags} />
            <h1>{post.title}</h1>
            <p className="text-sm text-neutral-500" style={{color:'#fff'}}>
              Posted by{' '}
              <Link
                className="text-indigo-500 font-bold no-underline hover:underline" style={{color:'#BD4D75'}}
                href={`/profiles/${post.author.name}`}
              >
                {post.author.name}
              </Link>{' '}
              on {isoToLocaleDateString(post.created)}
            </p>
          </div>
          <p className="max-w-prose text-justify mx-auto" style={{marginBottom:'0.5rem', marginTop:'0.5rem'}}>{post.body}</p>
          {!!post.media && (
            <img
              src={post.media}
              alt="Post media"
              className="max-h-96 max-w-full object-contain"
              style={{width:'100%', margin:'1rem 0'}}
            />
          )}
          <div style={{borderTop:'1px solid', borderImage: 'linear-gradient(90deg, #BD4D75 0%, #6861DE 100%) 1'}}>
            <h2>Reactions</h2>
            <div className="flex flex-row items-center gap-4">
              {post.reactions?.map((reaction) => (
                <RenderReaction
                  key={`reaction${reaction.symbol}${reaction.count}`}
                  {...reaction}
                />
              ))}
              <AddReaction postId={postId as string} />
            </div>
          </div>
        </div>
        <div className='p-4 my-4' style={{background:'#1D1A27', borderRadius:'25px'}}>
          <h2 style={{margin:'0'}}>Comments</h2>
          <Form
            onSubmit={submitHandler}
            className="my-4 rounded-md"
          >
            <TextField
              name="comm"
              fullWidth
              rows={3}
              multiline
              className="bg-indigo-50 mb-4"
              placeholder='Type anything...'
              style={{border:'1px solid #fff', borderRadius:'15px', background:'#1D1A27', color:'#fff'}}
            />
            <Button variant="contained" type="submit" style={{width:'100%', background:'linear-gradient(90deg, #BD4D75 0%, #6861DE 100%)', color:'#fff'}}>
              Post a Comment
            </Button>
          </Form>
          <h2 style={{margin:'0'}}>Recent Comments</h2>
          {post.comments && (
            <div className="flex flex-col gap-4 my-4">
              {renderComments(post.comments)}
            </div>
          )}
        </div>
        <Modal open={editOpen} onClose={editModalHandler}>
          <EditPost {...post} />
        </Modal>
        <Modal open={deleteOpen} onClose={deleteModalHandler}>
          <DeletePost id={post.id} />
        </Modal>
      </div>
    </>
  );
}
