export type ServiceTypes = {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
};

export interface ImageComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}
