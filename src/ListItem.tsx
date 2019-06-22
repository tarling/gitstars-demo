import React from 'react';
import moment from 'moment';
import './ListItem.css';

export interface ListItemProps {
  created: Date;
  description: string;
  path: string;
  stars: number;
  url: string;
}

function formatDate(date:Date):string {
    return moment(date).format('MMMM Do YYYY');
}

export const ListItem:React.FC<ListItemProps> = props => {
  return (
    <li className='list-item'>
      <a className='list-item__link' href={props.url}>{props.path}</a>
      <div className='list-item__description'>{props.description}</div>
      <div className='list-item__meta'>
        <div className='list-item__date'>Created: {formatDate(props.created)}</div>
        <div className='list-item__stars'>{props.stars}</div>
      </div>
    </li>
  );
};
