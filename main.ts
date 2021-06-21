namespace lora{

    //% block="Connexion au système Lora || RX $Rx TX $Tx"
    //% expandableArgumentMode="toggle"
    //% Rx.defl=SerialPin.P0 Tx.defl=SerialPin.P14
    export function connect_lora(Rx: SerialPin, Tx: SerialPin): void {
        basic.showIcon(IconNames.Asleep)
        serial.setRxBufferSize(100)
        serial.setTxBufferSize(100)
        serial.redirect(
        Tx,
        Rx,
        BaudRate.BaudRate1200
        )
        basic.pause(10000)
        basic.showIcon(IconNames.SmallSquare)
        let reception = ""
        /*let reception2 =0*/
        while (reception == "") {
            serial.writeString("ok#")
            /*reception2 = serial.readBuffer(2)[0]
            basic.showNumber(reception2)*/
            reception = serial.readUntil(serial.delimiters(Delimiters.Hash))
            if (reception == "ok") { 
                basic.showString("C")
            }
            else {
                basic.showIcon(IconNames.Square)
                basic.pause(500)
                reception = ""
            }
        }
    }
    //% block="Envoi $donnee"
    //% donnee.defl='essai'
    export function envoi_donnee(donnee: string): void {
        serial.writeString(donnee+"#")
    }

    //% block="Donnee reçue"
    export function donnee_recue(): string {
        return serial.readUntil(serial.delimiters(Delimiters.Hash));
    }
}
