import './Nav.css'
import React from 'react'
import { Icon } from './NavItem'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <a href="#/">
                <Icon icon="home"/> Início
            </a>
            <a href="#/users">
                <Icon icon="users"/> Usuários
            </a>
        </nav>
    </aside> 