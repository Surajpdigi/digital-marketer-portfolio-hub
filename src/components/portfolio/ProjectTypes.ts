
export type PostProject = {
  id: number;
  title: string;
  description?: string;
  image: string;
  category: string;
};

export type VideoProject = {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  category: string;
  isShort: boolean;
};

export type Project = PostProject | VideoProject;
