import moment from 'moment';
import * as React from 'react';
import { ListItem, ListItemProps } from './ListItem';
import './List.css';

interface ListProps {
  language:string;
  since: Date;
}

interface ListState {
  data:ListItemProps[];
}

interface Response {
  items: Record[];
}

interface Record {
  created_at: string;
  description: string;
  full_name: string;
  html_url: string;
  stargazers_count: number;
}

function formatDate(date:Date):string {
  return moment(date).format('Do MMMM YYYY');
}

export class List extends React.PureComponent<ListProps, ListState> {
  
  constructor(props:ListProps) {
    super(props);

    this.state = {
      data: [],
    };

    fetch(`https://api.github.com/search/repositories?q=language:${props.language}&sort=stars&order=desc&per_page=3`)
      .then(response => response.json())
      .then((response:Response) => {
        console.log('count', response.items.length);
        this.setState({
          data: response.items.map(record => ({
            created: new Date(record.created_at),
            description: record.description,
            path: record.full_name,
            stars: record.stargazers_count,
            url: record.html_url,
          })),
        });
      })
  }

  public render() {
    return (
        <div className='list'>
          <div className='list__header'>Most stars: "{this.props.language}"</div>
          <div className='list__sub-head'>Repos created since {formatDate(this.props.since)}</div>
          <ul className='list__list'>
            {this.state.data.map((item, index) => <ListItem key={index} {...item}/>)}
          </ul>
        </div>
      );
  }
}
