import { Link } from 'react-router-dom';
import { Post } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), { 
    addSuffix: true,
    locale: ru
  });
  
  return (
    <Link to={`/posts/${post.id}`}>
      <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{post.title}</CardTitle>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {post.content.substring(0, 150)}...
          </p>
        </CardContent>
        
        <CardFooter className="pt-2 flex justify-between items-center text-xs text-muted-foreground">
          <Badge variant="outline" className="font-normal">
            {post.category}
          </Badge>
          <time dateTime={new Date(post.createdAt).toISOString()}>
            {formattedDate}
          </time>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostCard;
