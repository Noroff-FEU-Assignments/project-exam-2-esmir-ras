import { Chip } from '@mui/material';

export function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-row gap-2" style={{overflow:'hidden'}}>
      {tags
        .filter((tag) => !!tag)
        .map((tag) => (
          <Chip
            key={tag}
            label={tag}
            variant="outlined"
            size="small"
            color="primary"
            className="text-xs"
            style={{color:'#BD4D75', borderColor:'#BD4D75'}}
          />
        ))}
    </div>
  );
}
