//% color="#037268" icon="\u10f519"
namespace lora{

    //% block="Connexion au système Lora"
    export function connect_lora(): void {
        basic.showIcon(IconNames.Asleep)
        basic.pause(500)
        serial.setRxBufferSize(100)
        serial.redirect(
        SerialPin.P14,
        SerialPin.P0,
        BaudRate.BaudRate1200
        )
        basic.pause(500)
        basic.showIcon(IconNames.SmallSquare)
        let reception = ""
        while (reception == "") {
            serial.writeString("?")
            reception = serial.readUntil(serial.delimiters(Delimiters.Hash))
            if (reception == "ok") { 
                basic.showString("C")
            }
            else {
                basic.showIcon(IconNames.Square)
                basic.pause(500)	
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
