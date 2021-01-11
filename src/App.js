import React, { useEffect, useState } from "react";
import "./styles.css";

const App = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSeachQuery] = useState("react");

  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=react"
  );
  const [loading, setLoading] = useState(false);

  const showLoading = () => (loading ? <h2>Loading ... </h2> : "");

  const searchForm = () => (
    <form onSubmit={hadleSubmit}>
      <input type='text' value={searchQuery} onChange={searchFormInput} />
      <button>Search</button>
    </form>
  );
  // fetch news
  const fetchNews = (url) => {
    setLoading(true);
    fetch(url)
      // .then(data => data.json())
      // .then(data => console.log(data))
      .then((result) => result.json())
      .then((data) => {
        setNews(data.hits);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchNews(url);
  }, [url]);

  const searchFormInput = (e) => {
    setSeachQuery(e.target.value);
  };

  const hadleSubmit = (e) => {
    e.preventDefault();
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };

  const mapArray = () =>
    news.map((elem, index) => <p key={index}>{elem.title}</p>);

  return (
    <div>
      <h2>News</h2>
      {showLoading()}
      {searchForm()}
      {mapArray()}
    </div>
  );
};

// const App = () => {
//   const [count, setCount] = useState(0);

//   const increment = () => {
//     setCount(count + 1);
//   };

//   useEffect(() => {
//     document.title = `Clicked ${count} times`
//   })

//   return (
//     <div>
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//       <button onClick={increment}>Clicked {count} times</button>
//     </div>
//   );
// };

//  class App extends Component {
//   state ={
//     count :0
//   }

//   increment =() => {
//     this.setState({
//       count: this.state.count + 1
//     })
//   };

//   componentDidMount() {
//     document.title = `Clicked ${this.state.count} times`
//   }

//   componentDidUpdate() {
//     document.title = `Clicked ${this.state.count} times`
//   }
//   render() {
//   return (
//     <div>
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//       <button onClick={this.increment}>Clicked {this.state.count} times</button>
//     </div>
//   );
// }
// }
export default App;
