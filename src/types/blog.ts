export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  comment: number;
}

export type CreateBlogPost = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateBlogPost = Partial<CreateBlogPost>;