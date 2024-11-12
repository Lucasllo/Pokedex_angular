export type Pokemon = {
  id: string,
  name: string,
  types:[{
    type:{
      name:string
    }
  }],
  sprites:{
    front_default:string
  }
}
