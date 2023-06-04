import React from 'react';
import Content from '@/components/Content';
import Header from '@/components/Header';
import styles from './index.less';

const Article: React.FC = () => {
  return (
    <div className={styles.ArticleContainer}>
      <Header needMenu />
      <Content containerClassName={styles.containerClassName}>
        <div className={styles.content}>react 18 子项目</div>
      </Content>
    </div>
  );
};

export default Article;
