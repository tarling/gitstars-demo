import moment from 'moment';
import React from 'react';
import './ListItem.css';

export interface Props {
  created: Date;
  description: string;
  path: string;
  stars: number;
  url: string;
}

function formatDate(date: Date): string {
    return moment(date).format('MMMM Do YYYY');
}

export const ListItem: React.FC<Props> = props => {
  return (
    <li className='list-item'>
      <a className='list-item__link' href={props.url} target='_blank' rel='noopener noreferrer'>{props.path}</a>
      <div className='list-item__description'>{props.description}</div>
      <div className='list-item__meta'>
        <div className='list-item__date'>Created: {formatDate(props.created)}</div>
        <div className='list-item__stars'>{props.stars}</div>
      </div>
    </li>
  );
};
