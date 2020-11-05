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

    // Função para Salvar
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
    
    // Função para incluir
    getUptadedList(user) {
        const list = this.state.list.filter(u => u.id !== user.id) // Passa lista sem o usuário adicionado e depois o adiciona na primeira posição
        list.unshift(user)
        return list
    }   

    uptadeField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    } 

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.uptadeField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                            name="name"
                            value={this.state.user.email}
                            onChange={e => this.UptadeField(e)}
                            placeholder="Digite o e-mail..."/>
                        </div>
                    </div>
                </div>

                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.save(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}
