import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import Entry from './Entry'
import {BrowserRouter} from "react-router-dom"

ReactDOM.render(
  <BrowserRouter>
    <Entry />
  </BrowserRouter>,
  document.getElementById('root')
)
