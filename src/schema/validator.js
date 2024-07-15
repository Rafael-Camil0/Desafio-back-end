
 
const schemas = {
  user:{
    type: "object",
    properties:{
      name:{type:"string",minLength:4},
    
      email:{type:"string",pattern:"^^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"},
  
      password:{type:"string",minLength:8}
    ,
      avatar:{type:"string"}
    }
    ,
    required: ["name","email","password"],

    additionalProperties:false,
    errorMessage: {
      required: {
        name: "Usuário é obrigatório.",
        email: "E-mail é obrigatório.",
        password: "Senha é obrigatória.",
      },
      properties:{

        name: "O nome tem que ter no mínimo 4 caracteres.",
        password: "O Password precisa ter 8 caracteres ou mais.",
        email: "Valor do e-mail inválido, por favor digite novamente.",


      },
      additionalProperties: "Não é permitido propriedades adicionais."
    }
  },
  MovieNotes :{
    type: "object",
    properties:{
      user_id:{type:"string"},
      title:{type:"string",minLength:4},
    
      description:{type:"string",minLength:3},
  
      rating:{type:"number",minimum:0,maximum:5}
    ,
    tags:{type:"array",minItems:1}
    }
    ,
    required: ["user_id","title","description","rating","tags"],

    additionalProperties:false,
    errorMessage: {
      required: {
        user_id:"Id do usuário é obrigatório",
        title: "Título é obrigatório.",
        description: "descrição é obrigatório.",
        rating: "Nota é obrigatória.",
        tags: "Tags é obrigatória.",
      },
      properties:{

        title: "O título tem que ter no mínimo 4 caracteres.",
        description: "A descrição precisa ter 3 caracteres ou mais.",
        rating: "O valor da nota tem que ser entre 0 e 5",
        tags:"É necessario anexar ao menos uma Tag"


      },
    additionalProperties: "should not have properties other than foo"
    }
  }
}
module.exports = schemas