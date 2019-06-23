import moment from 'moment';
import * as React from 'react';
import 'ts-polyfill/lib/es2015-core';
import 'ts-polyfill/lib/es2015-promise';
import 'ts-polyfill/lib/es2016-array-include';
import 'whatwg-fetch';
import './GitRepoStarsList.css';
import { ListItem, ListItemProps } from './ListItem';

interface GitRepoStarsListProps {
  language: string;
  since: Date;
}

interface GitRepoStarsListState {
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

export class GitRepoStarsList extends React.PureComponent<GitRepoStarsListProps, GitRepoStarsListState> {

  constructor(props: GitRepoStarsListProps) {
    super(props);

    this.state = {
      data: [],
    };

    fetch(`https://api.github.com/search/repositories?q=language:${props.language}&sort=stars&order=desc&per_page=3`)
      .then(response => response.json())
      .then((response: GitHubSearchResponse) => {
        this.setState({
          data: response.items.map(record => ({
            created: new Date(record.created_at),
            description: record.description,
            path: record.full_name,
            stars: record.stargazers_count,
            url: record.html_url,
          })),
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
