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

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data }) // Requisitando dados e salvando na lista
        })
    }

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
    getUptadedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id) // Passa lista sem o usuário adicionado e depois o adiciona na primeira posição
        if(add) list.push(user)
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
                            name="email"
                            value={this.state.user.email}
                            onChange={e => this.uptadeField(e)}
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

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUptadedList(user, false)
            this.setState({list}) //Função delete, se for encontrado o user pelo url e id e a function getUptade for null, exclua usuário
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}> {/* mapeando lista pelo id*/} 
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={e => this.load(user)}>  {/*Carregar usuário para editá-lo */}
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={e => this.remove(user)}> {/* Remover usuário */}
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr> 
            )   
        })
    }
    

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
