/* eslint-disable no-undef */
import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import { Image } from 'primereact/image';

import { Dialog } from 'primereact/dialog';

import "./CardListDevices.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPenToSquare,
  faChevronRight,
  faCalendarDay
} from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

  const [visible, setVisible] = useState(false);

  const rows = props.devices.map((devices) => {

    console.log(devices.nome)
    return (
      <div className="cardDevice">
        <Card>
          <div className="left">
            <div className="divImg">
              <Image src={devices.Image}
                alt="Image" width="80" height="60" />
            </div>

            <div className="divModelo">
              <p>{devices.modelo}</p>
            </div>
          </div>

          <div className="card-butons">

            <div className="card-butons">

              <a href="/agendarDispositivo">
                <Button className="bt">
                  <FontAwesomeIcon
                    icon={faCalendarDay}
                    style={{ color: "#0b6429" }}
                  />
                </Button>
              </a>
              <Button className="bt"
                style={{ color: '#0c9213' }}
                title="Detalhes"
                aria-label="Detalhes" onClick={() => setVisible(true)} ><FontAwesomeIcon icon={faChevronRight} /> </Button>
              <Dialog header={devices.modelo} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <p className="m-0">
                  Última Manutenção
                  {devices.ultimaMnautencao}

                  Temperatura Máxima
                  <br />
                  {devices.temperaturaMaxima}

                  <div className="eixos">
                    Eixo X
                    <br />
                    {devices.eixoX}
                  </div>

                  <div className="eixos">
                    Eixo Y
                    <br />
                    {devices.eixoX}
                  </div>

                  <div className="eixos">
                    Eixo Z
                    <br />
                    {devices.eixoX}
                  </div>
                  <br />
                  Tipo de Dispositivo
                  <br />
                  {devices.tipo}
                </p>
              </Dialog>
            </div>

            <Button
              className="bt"
              onClick={(e) => props.editar(devices.id)}
              title="Editar"
              aria-label="Editar"
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ color: "#0b6429" }}
              />
            </Button>

            <Button
              className="bt"
              onClick={(e) => props.delete(devices.deviceId)}
              style={{ color: "#0b6429" }}
              title="Deletar"
              aria-label="Deletar"
            >
              <FontAwesomeIcon icon={faTrashAlt} style={{ color: "#1d8729" }} />
            </Button>
          </div>
        </Card>
      </div>
    );
  });

  return <div>{rows}</div>;
};
