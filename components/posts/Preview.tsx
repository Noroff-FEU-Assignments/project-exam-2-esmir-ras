import { useRouter } from 'next/router';
import { Post } from 'types';
import { isoToLocaleDateString } from 'utils';
import { Interactions } from './Interactions';
import { Tags } from './Tags';

const MAX_LENGTH = 100;

export function PostPreview({
  body,
  id,
  media,
  tags,
  title,
  _count,
  author,
  created,
}: Post) {
  const router = useRouter();
  const clickHandler = () => {
    router.push(`/posts/${id}`);
  };
  //const isLongText = body.length > MAX_LENGTH;
  return (
    <div
      onClick={clickHandler}
      className="rounded-md hover:scale-105 cursor-pointer transition-all duration-200 ease-out shadow-neutral-400 p-2 lg:p-4 flex flex-col gap-4" style={{background:'#1D1A27', borderRadius:'25px'}}
    >
      <Tags tags={tags} />
      <div style={{paddingBottom:'0.5rem'}}>
        <h2 style={{margin:'0'}}>{title}</h2>
        <p className="text-xs text-neutral-400" style={{color:'#FFFFFF'}}>
          Posted by <span style={{color:'#BD4D75'}}>{author.name}</span> on {isoToLocaleDateString(created)}
        </p>
      </div>
      {/* <p className={isLongText ? 'line-clamp-3' : ''}>
        {isLongText ? `${body.substring(0, MAX_LENGTH)}` : body}
        {isLongText && (
          <span className="text-blue-500 hover:text-blue-700 cursor-pointer" style={{color:'#BD4D75'}} onClick={clickHandler}>
            {' '}
            ...Show more
          </span>
        )}
      </p> */}
      <p className="line-clamp">{body}</p>
      {media && (
        <img
          src={media}
          alt="Post media"
          className="max-w-full max-h-96 w-auto h-auto object-contain" style={{}}
        />
      )}
      <Interactions {..._count} />
    </div>
  );
}
