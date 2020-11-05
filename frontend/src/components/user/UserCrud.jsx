import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps ={
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
}

// Restaurar estado inicial

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: {name: '', email: ''},
    list: []
}


export default class UserCrud extends Component {

    state = {...initialState} // Estadp iniciar

    clear() {
        this.setState({ user: initialState.user })
    }

    save () {
        const user = this.state.user
        const method = user.id ? 'put' : 'post' // Se usuário tiver id será alterado, se não, será adicionado
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl // Caso usuário esteja setado, acrescente o ID na url
        axios[method](url, user)
            .then(resp => {
                const list = this.getUptadedList(resp.data) // Atualiza a lista
                this.setState({user: initialState.user, list}) // Retorna lista para estado inicial
            })
    }

    getUptadedList(user) {
        const list = this.state.list.filter(u => u.id !== user.id) // Passa lista sem o usuário adicionado e depois o adiciona na primeira posição
        list.unshift(user)
        return list
    }
    

    render() {
        return (
            <Main {...headerProps}>
                Cadastro de Usuário
            </Main>
        )
    }
}
