import { debounce } from 'debounce';
import moment from 'moment';
import queryString from 'query-string';
import * as React from 'react';
import 'ts-polyfill/lib/es2015-core';
import 'ts-polyfill/lib/es2015-promise';
import 'ts-polyfill/lib/es2016-array-include';
import 'whatwg-fetch';
import './GitRepoStarsList.css';
import { ListItem, Props as ListItemProps } from './ListItem';

interface Props {
  language: string;
  since: Date;
}

interface State {
  data: ListItemProps[];
}

interface GitHubSearchResponse {
  items: RepositoryRecord[];
}

interface RepositoryRecord {
  created_at: string;
  description: string;
  full_name: string;
  html_url: string;
  stargazers_count: number;
}

function formatDate(date: Date): string {
  return moment(date).format('Do MMMM YYYY');
}

export class GitRepoStarsList extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      data: [],
    };

    this.callApi = debounce(this.callApi, 250);

    this.callApi(props);
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.language !== this.props.language || 
      nextProps.since.getTime() !== this.props.since.getTime()
    ) {
      this.callApi(nextProps);
    }
  }

  private callApi(props: Props) {
    if (isNaN(props.since.getTime())) {
      return;
    }

    const params = {
      order: 'desc',
      per_page: 3,
      q: `created:>=${props.since.toISOString().split('T')[0]};language:${props.language}`,
      sort: 'stars',
    };

    fetch(`https://api.github.com/search/repositories?${queryString.stringify(params, {encode: false})}`)
    .then(response => response.json())
    .then((response: GitHubSearchResponse) => {
      let data: ListItemProps[] = [];
      if (Array.isArray(response.items)) {
        data = response.items.map(record => ({
          created: new Date(record.created_at),
          description: record.description,
          path: record.full_name,
          stars: record.stargazers_count,
          url: record.html_url,
        }));
      }

      this.setState({
        data,
      });
    });
  }

  public render() {
    return (
        <div className='git-repo-stars-list'>
          <div className='git-repo-stars-list__head'>Most stars: "{this.props.language}"</div>
          <div className='git-repo-stars-list__sub-head'>Repos created since {formatDate(this.props.since)}</div>
          <ul className='git-repo-stars-list__list'>
            {this.state.data.map((item, index) => <ListItem key={index} {...item}/>)}
          </ul>
        </div>
      );
  }
}
