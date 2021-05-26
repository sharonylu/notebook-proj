import React, {Component} from 'react';
import './App.css';

class NotebookForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      note: '',
      tag: '',
      notes: new Map(),
      printMap: new Map()
    }
    this.togglePrintMap = this.togglePrintMap.bind(this)
    this.togglePrintAll = this.togglePrintAll.bind(this)
    this.toggleReset = this.toggleReset.bind(this)
  }

  togglePrintMap(event) {
    const target = event.target
    const name = target.name
    this.setState({
      printMap: this.state.printMap.set(name, !this.state.printMap.get(name))
    })
    console.log(this.state.printMap)
  }

  togglePrintAll() {
    var inputs = document.getElementsByClassName('filterButton');
    for (var i=0; i<inputs.length; i++)
    {
      var inputName = inputs[i].name
      if (!this.state.printMap.get(inputName)) {inputs[i].click();}

    }
  }

  toggleReset() {
    var inputs = document.getElementsByClassName('filterButton');
    for (var i=0; i<inputs.length; i++)
    {
      var inputName = inputs[i].name
      if (this.state.printMap.get(inputName)) {inputs[i].click();}

    }
  }

  newNote = e =>
    this.setState({ note: e.target.value })

  newTag = e =>
    this.setState({ tag: e.target.value })

  onNewNote = () => {
    this.setState(state => {
      if (state.tag === '' || state.note === '') {
        return
      }
      if (!(state.notes.has(state.tag))) {
        state.notes.set(state.tag, [])
      }
      const list = state.notes.get(state.tag).concat(state.note)
      const notes = new Map(state.notes.set(state.tag, list))

      return{
        note: '',
        tag: '',
        notes
      }
    })
  }

  submit = e => {
    this.state.notes.forEach(function(value, key) {
      console.log(key + ' = ' + value)
    })
    e.preventDefault()
  }
  render() {
    return (
      <div class="flex-container">
        <div>
          <form onSubmit={this.submit}>
            <div class="tooltip">Tag
              <span class="tooltiptext">
                Tags let you add keywords to notes, making them easier to find and browse when you have a lot of them.
              </span>
            </div>
            <br />
            <input
              id="tag-box"
              value={this.state.tag}
              onChange={this.newTag} />
            <br />
            <br />
            <label>Write note here
              <br />
              <textarea
                id="submission-field"
                value={this.state.note}
                onChange={this.newNote} />
            </label>
            <br />
            <br />
            <button onClick={this.onNewNote} id="regular-button">Submit</button>
          </form>
        </div>
        <div class="right-column">
          <button onClick={this.togglePrintAll} id="regular-button">Print All</button>
          <button onClick={this.toggleReset} id="regular-button">Reset</button>
          <br />
          {this.state.notes.size ?
            <label>Click button to display note
              <br />
              {[...this.state.notes.keys()].map(key =>
                <button name={key} className="filterButton" id={this.state.printMap.get(key) ? "filter-button-clicked" : "filter-button-not-clicked"} onClick={this.togglePrintMap}>{key}</button>)}
            </label>
          : ''
          }
          <br />
          <br />
          {[...this.state.printMap.keys()].map(key => this.state.printMap.get(key) ?
            <div id="note">
              <h2>{key}</h2>
              {this.state.notes.get(key).map(k => <p>{k}</p>)}
            </div> : '')}
        </div>
      </div>
    )
  }
}
class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>My Notebook</h1>
        <p>App designed for note-taking
        </p>
        <NotebookForm />
      </div>
    );
  }
}

export default App;
