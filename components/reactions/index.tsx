import { saveReaction } from 'api';
import { AuthContext } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Reaction } from 'types';

export * from './AddReaction';

export function RenderReaction({ count, postId, symbol }: Reaction) {
  const { authHeader } = useContext(AuthContext);
  const router = useRouter();

  const clickHandler = async () => {
    if (!authHeader) return;
    await saveReaction(postId.toString(), symbol, authHeader);
    router.reload();
  };

  return (
    <div
      className="flex flex-row items-center gap-2 text-sm cursor-pointer"
      onClick={clickHandler}
    >
      <span>{symbol}</span>
      <span>{count}</span>
    </div>
  );
}
