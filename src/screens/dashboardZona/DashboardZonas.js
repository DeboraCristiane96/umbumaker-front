/* eslint-disable react/no-direct-mutation-state */
import React from "react";

import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import { TabMenu } from 'primereact/tabmenu';
import MenuLeft from "../../components/Menu/MenuLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "primereact/dropdown";
import BasicDemo  from "../../components/Menu/MenuSecundario/TabMenu";
import ZonaService from "../../services/ZonaService";
import AgendaZonaService from "../../services/Zona/AgendaZonaService";
import CardDashboardZonas from "../../components/cardDashboardZona/CardDashboardZona";

//Utilizar o redirecionamento de Dashboard
export default class DashboardZonas extends React.Component {

  state = {
    moduloSelect: [
      { label: 'DISPOSITIVOS', value: 'DISPOSITIVOS' },
      { label: 'INSUMOS', value: 'INSUMOS' },
      { label: 'ZONAS', value: 'ZONAS' }
    ],
    modulo: "",
    moduloFiltro: "",
    agendamentosSelect: [
      { label: "APROVADOS", value: "APROVADOS" },
      { label: "NÃO APROVADOS", value: "NÃO APROVADOS" },
      { label: "TODOS", value: "TODOS" },
    ],
    agendamentos: "",
    agendamentosFiltro: "",
    zonas: [
      {
        codigo: 0,
        nome: "",
        status: false,
        qtdPessoas: ""
      },
    ],
    agendamantoZona: [{
      dataSolicitacao: "",
      dataAgendamento: "",
      tempoReservado: "",
      horaInicial: "",
      horaFinal: "",
      dataDeTermino: "",
      descricao: "",
      politicaDeAceite: false,
      diasDaSemana: [],
      zonas: [],
      tutores: []
    }],
    toast: "",
  };

  constructor() {
    super();
    this.service = new ZonaService();
    this.agendamentoZonaService = new AgendaZonaService();
  }

  async componentDidMount() {
    await this.agendamentoZonaService.findAll("")
      .then((response) => {
        const agendamantoZona = response.data;
        this.setState({ agendamantoZona });
        console.log(agendamantoZona);
      })
      .catch((error) => {
        console.log("erro!");
        console.log(error.response);
      });
  }
  //verifica qual modulo foi selecionado || não esta sendo usado
  filtroModulo = async () => {
    let lista = []
    this.state.modulo.forEach(element => {
      if (element.status === this.state.agendamentosFiltro) {
        lista.push(element);
      }
    });
    console.log("teste", this.state.zonas)

  }
  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  //ok
  validarTipo = () => {
    if (this.state.modulo === 'DISPOSITIVOS') {
      window.location.href = `/dashboardDispositivos`
    } else if (this.state.modulo === 'INSUMOS') {
      window.location.href = `/dashboardInsumos`
    } else {
      window.location.href = `/dashboardZonas`
    }
  }
  //retornar botoes das zonas
  listZonas = async () => {
    await this.service.findAll("")
      .then(response => {
        const zonas = response.data;
        this.setState({ zonas });
      }).catch(error => {
      });
  }
  //nao esta sendo usado 
  filtro = () => {
    let lista = []
    this.state.modulo.forEach(element => {
      if (element.modulo.nome === this.state.nomeParaFiltro) {
        lista.push(element);
      }
    });
    this.setState({ modulo: lista })
    console.log("teste", this.state.modulo)
  }

  dialogZonas(agenda) {
    <Dialog
      visible={true}
      header="Detalhes do Agenda"
    >
      <div>
        <FontAwesomeIcon className="icone" icon={faUsers} />
        <p>: {agenda.nome}</p>
      </div>
    </Dialog>
  }

  render() {
    return (
      <>
        <MenuLeft />
        <div className="container">
          <div className="header">
            <div className="i">
              <Dropdown
                value={this.state.modulo}
                options={this.state.moduloSelect}
                onChange={e => {
                  this.setState({ modulo: e.value });
                }}
                placeholder='ZONAS'
              />
              <Button className="bt-filtro" label="Selecionar Modulo"
                onClick={this.validarTipo}
                title="Selecionar Modulo" />
            </div>
            <div className="i">
              <Dropdown
                value={this.state.agendamentos}
                options={this.state.agendamentosSelect}
                onChange={e => {
                  this.setState({ agendamentos: e.value });
                }}
                placeholder='TODOS'
              />
              <Button className="bt-filtro" label="Filtrar"
                onClick={this.validarTipo}
                title="Filtrar" />

            </div>
          </div>
          <div className="menu-zonas1">
            <Button
              onClick={() => 0}
              className="p-button-outlined mb-5"
              label="M"
            />
            <Button
              onClick={() => 0}
              className="p-button-outlined mb-5"
              label="RA"
            />
            <Button
              onClick={() => 0}
              className="p-button-outlined mb-5"
              label="FD-CNC"
            />
            <Button
              onClick={(this.test)}
              className="p-button-outlined mb-5"
              label="FD-3D"
            />
          </div>
          <div className="zonas">
            <CardDashboardZonas
              agendamantoZona={this.state.agendamantoZona}
              dialogZonas={this.cardDetalhes}
            />
          </div>

        </div>
      </>
    );
  }
}
