export interface Itypes {
   _id: string
   title: string
   type: string
   date: string
   location: string
   image: string
   description: string
    userName: string,
   userEmail: string,
   eventCreationDate: string
   // Present on joined-event documents; absent on the source event documents.
   eventId?: string

}


