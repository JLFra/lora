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
        basic.pause(8000)
        basic.showIcon(IconNames.SmallSquare)
        let recept_data = ""
        serial.writeString("ok#")
        recept_data = serial.readUntil(serial.delimiters(Delimiters.Hash))
        basic.pause(1000)
        serial.writeString("ok#")
        recept_data = serial.readUntil(serial.delimiters(Delimiters.Hash))
        basic.showString(recept_data)
        if (recept_data == "ok") { 
            basic.showString("C")
        }
        else {
            basic.showIcon(IconNames.Square)
            basic.pause(500)
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
