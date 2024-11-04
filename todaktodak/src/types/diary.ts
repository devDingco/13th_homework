export interface DiaryData {
  id: number;
  title: string;
  emotion: {
    type: string;
    emoji: string;
    label: string;
  };
  content: string;
  images: string[];
  tags: string[];
  createdAt: string;
  isPublic: boolean;
  likes: number;
}

export interface Comment {
  id: number;
  author: {
    name: string;
    image: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}
