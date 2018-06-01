export interface PostEntity {
  id: number,
  date: number,
  title: string
  author: string,
  text: string,
  tags: string,
  imgUrl: string,
  status: 'active' | 'inactive';
}