import React from 'react';
import { Card, Typography } from 'antd';
import { HealthArticle } from '../types';
import { Link } from 'react-router-dom';
import { PATH_HEALTHY_DETAIL, createPath } from '../ultis/path';

const { Text, Title } = Typography;

const PostCard: React.FC<HealthArticle> = ({ id, title, content, imageUrl, author, publishDate, category }: HealthArticle) => {
  return (
    <Link to={createPath(PATH_HEALTHY_DETAIL, { id })}>
      <Card
        hoverable
        cover={<img alt={title} src={imageUrl} className="h-48 w-full object-cover" />}
        className="w-full h-full flex flex-col"
        bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <div className="flex-1">
          <Title level={4} className="mb-2 line-clamp-2">{title}</Title>
          {content && <Text className="text-gray-600 mb-2 line-clamp-3">{content}</Text>}
        </div>
        <div className="mt-auto">
          {author && <Text className="block text-sm text-gray-500">Tác giả: {author}</Text>}
          {publishDate && <Text className="block text-sm text-gray-500">Ngày xuất bản: {publishDate.toLocaleDateString()}</Text>}
          {category && <Text className="block text-sm text-blue-500">#{category}</Text>}
        </div>
      </Card>
    </Link>
  );
};

export default PostCard;
