import AddCircle from '@mui/icons-material/AddCircle';
import EmojiPicker, { EmojiStyle, EmojiClickData } from 'emoji-picker-react';
import { useState, useRef, useContext } from 'react';
import Popover from '@mui/material/Popover';
import { saveReaction } from 'api';
import { AuthContext } from 'context/AuthContext';
import { useRouter } from 'next/router';

interface Props {
  postId: string;
}

export function AddReaction({ postId }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { authHeader } = useContext(AuthContext);
  const router = useRouter();

  const clickHandler = () => {
    setOpen((prev) => !prev);
  };

  const clickEmojiHandler = async (emoji: EmojiClickData) => {
    if (!authHeader) return;
    const symbol = emoji.emoji;
    await saveReaction(postId, symbol, authHeader);
    router.reload();
  };

  return (
    <>
      <div
        ref={ref}
        className="cursor-pointer flex items-center"
        onClick={clickHandler}
      >
        <AddCircle fontSize="small" color="primary" />
      </div>
      <Popover
        open={open}
        onClose={clickHandler}
        anchorEl={ref.current}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <EmojiPicker
          lazyLoadEmojis
          searchDisabled
          skinTonesDisabled
          emojiStyle={EmojiStyle.NATIVE}
          onEmojiClick={clickEmojiHandler}
          previewConfig={{ showPreview: false }}
        />
      </Popover>
    </>
  );
}
