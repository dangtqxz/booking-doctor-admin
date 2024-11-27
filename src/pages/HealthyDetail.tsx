import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Spin } from 'antd';
import { HealthArticle } from '../types';
import { dataHealthTips } from '../contains/data-fake';
import HelmetWrapper from '../components/HelmetWrapper';

const { Title, Paragraph } = Typography;

const HealthyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<HealthArticle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticle = () => {
      const foundArticle = dataHealthTips.find(item => item.id === id);
      setArticle(foundArticle || null);
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!article) {
    return <Title level={2}>Không tìm thấy bài viết</Title>;
  }

  return (
    <HelmetWrapper title="Thông tin bài viết">
    <div className="container mx-auto px-4 md:px-4 py-8">
      <Title level={1}>{article.title}</Title>
      <img src={article.imageUrl} alt={article.title} className="w-full h-64 object-cover mb-4" />
      <Paragraph>
        <strong>Tác giả:</strong> {article.author}
      </Paragraph>
      <Paragraph>
        <strong>Ngày xuất bản:</strong> {article.publishDate?.toLocaleDateString()}
      </Paragraph>
      <Paragraph>
        <strong>Danh mục:</strong> {article.category}
      </Paragraph>
      <Paragraph>{article.content}</Paragraph>
    </div>
    </HelmetWrapper>
  );
};

export default HealthyDetail;
