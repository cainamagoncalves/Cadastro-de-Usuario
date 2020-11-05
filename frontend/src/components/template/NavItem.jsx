import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <div>
        <Link to="/">
            <i className="fa fa-home"></i> Início
        </Link>
        <Link to="/users">
            <i className="fa fa-users"></i> Usuários
        </Link>
    </div>