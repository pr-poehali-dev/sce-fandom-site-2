import { Link } from 'react-router-dom';
import { SCEObject } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SCEObjectCardProps {
  object: SCEObject;
}

const getClassColor = (objectClass: SCEObject['objectClass']) => {
  switch (objectClass) {
    case 'безопасный':
      return 'bg-green-600 hover:bg-green-700';
    case 'евклид':
      return 'bg-yellow-600 hover:bg-yellow-700';
    case 'кетер':
      return 'bg-red-600 hover:bg-red-700';
    case 'таумиэль':
      return 'bg-purple-600 hover:bg-purple-700';
    case 'нейтрализованный':
      return 'bg-gray-600 hover:bg-gray-700';
    default:
      return 'bg-blue-600 hover:bg-blue-700';
  }
};

const SCEObjectCard = ({ object }: SCEObjectCardProps) => {
  const classColor = getClassColor(object.objectClass);
  
  return (
    <Link to={`/objects/${object.objectNumber}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">
              {object.objectNumber}: {object.title}
            </CardTitle>
            <Badge className={`${classColor} capitalize`}>
              {object.objectClass}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {object.description.substring(0, 150)}...
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SCEObjectCard;
