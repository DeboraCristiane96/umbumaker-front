/* eslint-disable react/no-direct-mutation-state */
import React from "react";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import './ListDevices.css';
import CardListDevices from "../../components/cardListDevices/CardListDevices";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';

import MenuLeft from "../../components/Menu/MenuLeft"
import { faPlus} from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DeviceService from "../../services/DeviceService";

export default class ListDevices extends React.Component{

    
    state = {
        items:[{ label: 'Dispositivos', url:"/devices" }],

        home: {icon: 'pi pi-home ', url: '/' },

       
       devices:[
            {
                deviceId:'',
                dataM:'',
                codigo:'',
                modelo:'',
                tempM:'',
                tipo:'',
                eixoX:'',
                eixoY:'',
                eixoZ:''
                
            }
        ],
        token:"",
        toast:'',
        
    }

    constructor(){
        super();
        this.service = new DeviceService();
    }

    componentDidMount(){          
        this.service.findAll('');
    }

   

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

    detalhes = ()=>{
        

      }
    delete = (devicesId) =>{
        this.service.delete(devicesId)
            .then(async (response) =>{
                this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro Excluido Com Sucesso' });
                await this.delay(2000);
               window.location.reload();
            }).catch(error =>{
                this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Excluir o Cadastro' });
            })
    }

    editar = (deviceId) => {
        window.location.href = `/updateDevices/${deviceId}`;    
        
    }

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Deletar Cadastro Confirmado', life: 3000 });
        this.delete(this.devicesId);
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Cadastro Mantido', life: 3000 });
    };


    
    confirm = async (deviceId) => {
        this.setState({deviceId: deviceId})
        //const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({
          
            message: 'Você Realmente quer deletar o cadastro do dispositivo?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            
            accept:this.accept,
            reject:this.reject,
            
        });
        await this.delay(10);
        
    };

    render(){
        return(
            <>
            <MenuLeft/>
            <div className="container">
                 <Toast ref={(el) => (this.state.toast = el)} />
                 <ConfirmDialog 
                  acceptClassName="p-button-success"
                  rejectClassName="p-button-danger"
                 acceptLabel="Sim"
                 rejectLabel="Não"/>
                <div className="header">
                    <div>
                        <BreadCrumb model={this.state.items} home={this.state.home} />
                       
                    </div>
    
                    <div className="divCreat">
                            <a href="/createDevice">
                            <Button className="btCreat" 
                            severity="warning" 
                            raised>
                            <FontAwesomeIcon icon={faPlus}
                          style={{color: "#0b6429",}} /></Button>
                            </a>
                        </div>  

                        <br/>
                    </div>

                <div className="devices">
                    <CardListDevices
                        devices ={this.state.devices}
                        delete = {this.confirm}
                        editar = {this.editar}
                        detalhes = {this.detalhes} 
                    />
                    
                </div>
            </div>
            
         </>

        )
    }

}