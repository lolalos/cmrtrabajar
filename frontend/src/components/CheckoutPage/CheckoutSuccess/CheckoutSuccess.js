import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import QRCode from 'react-qr-code';
import { SuccessContent, Total } from './style';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy, FaCheckCircle } from 'react-icons/fa';
import { SocketContext } from "../../../context/Socket/SocketContext";
import { useDate } from "../../../hooks/useDate";
import { toast } from "react-toastify";

function CheckoutSuccess(props) {

  const { pix } = props;
  const [pixString,] = useState(pix.qrcode.qrcode);
  const [copied, setCopied] = useState(false);
  const history = useHistory();

  const { dateToClient } = useDate();

  const socketManager = useContext(SocketContext);

  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    const socket = socketManager.getSocket(companyId);
    
    socket.on(`company-${companyId}-payment`, (data) => {

      if (data.action === "CONCLUIDA") {
        toast.success(`¡Su licencia ha sido renovada hasta el ${dateToClient(data.company.dueDate)}!`);
        setTimeout(() => {
          history.push("/");
        }, 4000);
      }
    });
  }, [history, socketManager]);

  const handleCopyQR = () => {
    setTimeout(() => {
      setCopied(false);
    }, 1 * 1000);
    setCopied(true);
  };

  return (
    <React.Fragment>
      <Total>
        <span>TOTAL</span>
        <strong>${pix.valor.original.toLocaleString('es-ES', { minimumFractionDigits: 2 })} BRL</strong>
      </Total>
      <SuccessContent>
        <QRCode value={pixString} />
        <CopyToClipboard text={pixString} onCopy={handleCopyQR}>
          <button className="copy-button" type="button">
            {copied ? (
              <>
                <span>Copiado</span>
                <FaCheckCircle size={18} />
              </>
            ) : (
              <>
                <span>Copiar código QR</span>
                <FaCopy size={18} />
              </>
            )}
          </button>
        </CopyToClipboard>
        <span>
          Para finalizar, solo realice el pago escaneando o pegando el
          código de arriba :)
        </span>
      </SuccessContent>
    </React.Fragment>
  );
}

export default CheckoutSuccess;
