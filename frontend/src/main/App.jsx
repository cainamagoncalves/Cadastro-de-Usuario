import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'

import Footer from '../components/template/Footer'
import Main from '../components/template/Main'
import Logo from '../components/template/Logo'
import Nav from'../components/template/Nav'


export default props => 
    <div className="app">
        <Logo />
        <Nav  icon="home"/>
        <Main icon="home" title="Início"
            subtitle="Segundo Projeto do capítulo de React."/>
        <Footer />
    </div>
