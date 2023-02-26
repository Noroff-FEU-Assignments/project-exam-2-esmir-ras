import { Post } from 'types';
import CommentIcon from '@mui/icons-material/Comment';
import RecommendIcon from '@mui/icons-material/Recommend';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

export function Interactions({ comments, reactions }: Post['_count']) {
  return (
    <div className="flex flex-row gap-4 items-center" style={{borderTop:'3px solid #f7d613', paddingTop:'1rem', borderImage:'linear-gradient(90deg, #BD4D75 0%, #6861DE 100%) 1'}}>
      <div className="flex flex-row gap-1 items-center" style={{width:'50%'}}>
        <div style={{textAlign:'center', margin:'0 auto'}}>
          <ThumbUpIcon fontSize="medium" color="primary"  style={{color:'#FFFFFF'}} />
          <span style={{verticalAlign:'super', paddingLeft:'0.5rem'}}>{reactions}</span>
        </div>
      </div>
      <div className="flex flex-row gap-1 items-center" style={{width:'50%'}}>
        <div style={{textAlign:'center', margin:'0 auto'}}>
          <ChatBubbleIcon fontSize="medium" color="primary" style={{color:'#FFFFFF'}} />
          <span style={{verticalAlign:'super', paddingLeft:'0.5rem'}}>{comments}</span>
        </div>
      </div>
    </div>
  );
}
