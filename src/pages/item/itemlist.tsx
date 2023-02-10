import { type } from 'os';

type ListData = {
  id: number;
  name: string;
  description: string;
  price: number;
  deleted: boolean;
}[];

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  deleted: boolean;
};
export function getSortedPostsData() {
  const listData = [
    { id: 0, name: '', description: '', price: 0, deleted: false },
  ];
  fetch('/api/items')
    .then((res) => res.json())
    .then((data) => {
        for(const i of data){
            listData.push(i)
        }
    });

  return listData;
}
