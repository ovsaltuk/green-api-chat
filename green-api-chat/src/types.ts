export enum EMessageType {
    outgoing = "outgoing",
    incoming = "incoming"
}

export interface IMessage {
    type: EMessageType,
    idMessage: string,
    timestamp?: number,
    typeMessage?: string,
    chatId?: string,
    textMessage?: string,
    extendedTextMessage?: {
        text: string,
        description: string,
        title: string,
        previewType: string,
        jpegThumbnail: string,
        forwardingScore: number,
        isForwarded: boolean
    },
    statusMessage?: string,
    sendByApi?: boolean,
    deletedMessageId?: string,
    editedMessageId?: string,
    isEdited?: boolean,
    isDeleted?: boolean
}