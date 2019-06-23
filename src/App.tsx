import React from 'react';
import './App.css'
import { GitRepoStarsList } from './GitRepoStarsList';

interface State {
  language: string;
  since: Date;
}

function getInputDateFormat(date: Date): string {
  try {
    return date.toISOString().split('T')[0];
  } catch (e) {
    return '';
  }
}

class App extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      language: 'javascript',
      since: new Date('2017-12-07'),
    };

    this.dateChanged = this.dateChanged.bind(this);
    this.languageChanged = this.languageChanged.bind(this);
  }

  private dateChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    this.setState({
      ...this.state,
      since: new Date(value),
    });
  }

  private languageChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    this.setState({
      ...this.state,
      language: value,
    });
  }

  public render() {
    const {
      language,
      since,
    } = this.state;

    return (
      <div className='app'>
        <div className='app__test-form'>
          <label>
            Language:
            <input
              type='language'
              value={language}
              onChange={this.languageChanged}
            />
          </label>
          <label>
            Repos since:
            <input
              type='date'
              value={getInputDateFormat(since)}
              onChange={this.dateChanged}
            />
          </label>
        </div>
        <GitRepoStarsList language={language} since={since} />
      </div>);
  }
}

export default App;
