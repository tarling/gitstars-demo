import * as React from 'react';
import { ListItem, ListItemProps } from './ListItem';
import './List.css';

interface ListProps {
  language:string;
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

export class List extends React.PureComponent<ListProps, ListState> {
  
  constructor(props:ListProps) {
    super(props);

    this.state = {
      data: [],
    };

    fetch(`https://api.github.com/search/repositories?q=language:${props.language}&sort=stars&order=desc`)
      .then(response => response.json())
      .then((response:Response) => {
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
          {this.state.data.map(item => <ListItem {...item}/>)}
        </div>
      );
  }
}
