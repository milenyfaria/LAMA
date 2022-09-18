export interface Band {
    id: string,
    name: string,
    musicGenre: string,
    responsible: string   
}

export interface BandInputDTO {
    name: string,
    musicGenre: string,
    responsible: string
    token:string
}