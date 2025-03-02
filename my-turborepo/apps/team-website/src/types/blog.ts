interface Author {
  name: string;
  image: string;
  designation: string;
}

export interface Blog {
  id: number;
  title: string;
  paragraph: string;
  image: string;
  author: Author;
  tags: string[];
  publishDate: string;
}
