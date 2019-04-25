import React from 'react'

// import styled from 'styled-components'

import axios from 'axios'

class Display extends React.Component {
  constructor(){
    super()
    this.state = {
      users: [],
      posts: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/users')
    .then( res => { 
      

    })
  }

  render(){
    return(
      <div>
        {this.state.user.map( user => {
          return <p>{user.name}</p> &&
          this.state.posts.filter( post => {
            if(user.id === post.user_id){
              return <p> {post.post}</p>
            }
          })         
        })}
      </div>
    )
  }
}

export default Display