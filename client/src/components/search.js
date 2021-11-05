import './Flight.css';
import axios from 'axios';
import { Component, useState,useEffect } from 'react';
<link rel="stylesheet" href="https://unpkg.com/purecss@2.0.6/build/pure-min.css" integrity="sha384-Uu6IeWbM+gzNVXJcM9XV3SohHtmWE+3VGi496jvgX1jyvDTXfdK+rfZc8C1Aehk5" crossorigin="anonymous"></link>

class Search extends Component {
    constructor(props){
        super (props);

    this.state = {
        id : 0,
        toAir:'',
        fromAir:'',
        noEconomySeats : 0,
        noBusinessSeats : 0,
        noFirstSeats : 0,
        depTime:'',
        arrTime:'',
        dateFlight: new Date(),
    }
    }
    
submit(e){
    e.preventDefault();
    axios.get('http://localhost:8000/Flight/get')
    .then(res=> {
      console.log(res.data);
    })
}
   
render(){
    var posts= [] ;
       
    axios.get('http://localhost:8000/Flight/get')
    .then(res=> {
      console.log(res.data);
      posts = res.data 
      console.log(posts);
    })



    const { search } = window.location;
const query = new URLSearchParams(search).get('s');
const filterPosts = (posts, query) => {
    if (!query) {
        return posts;
    }

    return posts.filter((post) => {
        const postName = post.name.toLowerCase();
        return postName.includes(query);
    });
};
const filteredPosts = filterPosts(posts, query);
    return(
       <div>
            <form onSubmit={this.submit}>
                <label htmlFor="header-search">
                    <span className="visually-hidden">Search blog posts</span>
                </label>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Search blog posts"
                    name="s" 
                />
                <button type="submit">Search</button>
            </form>

            <ul>
                {filteredPosts.map((post) => (
                    <li key={post.id}>{post.name}</li>
                ))}
            </ul>
            </div>
        );
        
        
    
}
    


}

export default Search ;