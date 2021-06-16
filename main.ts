//% color="#037268" icon="\uf1eb"
namespace lora{
    //% block="Connexion au système Lora || RX $Rx TX $Tx"
    //% Rx.defl=SerialPin.P0 Tx.defl=SerialPin.P14
    //% expandableArgumentMode="toggle"
    export function connect_lora(Rx: SerialPin, Tx: SerialPin): void {
        basic.showIcon(IconNames.Asleep)
        basic.pause(3000)
        serial.setRxBufferSize(100)
        serial.redirect(
        Tx,
        Rx,
        BaudRate.BaudRate1200
        )
        basic.pause(500)
        basic.showIcon(IconNames.SmallSquare)
        let reception = ""
        while (reception == "") {
            serial.writeString("ok#")
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
